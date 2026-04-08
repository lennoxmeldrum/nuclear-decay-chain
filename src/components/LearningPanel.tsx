import React, { useState, useEffect } from 'react';
import { DecayChain, DecayStep, formatIsotope } from '../lib/decayData';
import { generateOptions, PredictionOption } from '../lib/quizLogic';
import { motion, AnimatePresence } from 'motion/react';
import { ArrowRight, CheckCircle2, XCircle, RefreshCcw, Info } from 'lucide-react';
import { cn } from '../lib/utils';

interface LearningPanelProps {
  chain: DecayChain;
  currentStepIndex: number;
  onAdvance: () => void;
  onReset: () => void;
}

export const LearningPanel: React.FC<LearningPanelProps> = ({ chain, currentStepIndex, onAdvance, onReset }) => {
  const [options, setOptions] = useState<PredictionOption[]>([]);
  const [selectedOption, setSelectedOption] = useState<PredictionOption | null>(null);
  const [hasGuessed, setHasGuessed] = useState(false);

  const isFinished = currentStepIndex >= chain.steps.length;
  const currentStep = isFinished ? null : chain.steps[currentStepIndex];

  useEffect(() => {
    if (currentStep && !hasGuessed) {
      setOptions(generateOptions(currentStep.from, currentStep.to, currentStep.type));
    }
  }, [currentStep, hasGuessed]);

  // Reset local state when chain or step changes (unless we just guessed)
  useEffect(() => {
    setSelectedOption(null);
    setHasGuessed(false);
  }, [currentStepIndex, chain.id]);

  const handleGuess = (option: PredictionOption) => {
    if (hasGuessed) return;
    setSelectedOption(option);
    setHasGuessed(true);
  };

  if (isFinished) {
    return (
      <div className="flex flex-col h-full bg-slate-800 rounded-xl border border-slate-700 p-6 shadow-xl text-slate-200 justify-center items-center text-center">
        <div className="w-16 h-16 bg-emerald-500/20 text-emerald-400 rounded-full flex items-center justify-center mb-4">
          <CheckCircle2 size={32} />
        </div>
        <h2 className="text-2xl font-bold text-white mb-2">Stable Isotope Reached!</h2>
        <p className="text-slate-400 mb-8">
          You have successfully navigated the {chain.name}. The final isotope, {formatIsotope(chain.steps[chain.steps.length - 1].to)}, is stable and will no longer decay.
        </p>
        <button
          onClick={onReset}
          className="flex items-center gap-2 px-6 py-3 bg-indigo-600 hover:bg-indigo-500 text-white rounded-lg font-medium transition-colors"
        >
          <RefreshCcw size={18} />
          Restart Chain
        </button>
      </div>
    );
  }

  if (!currentStep) return null;

  const isAlpha = currentStep.type === 'Alpha';

  return (
    <div className="flex flex-col h-full bg-slate-800 rounded-xl border border-slate-700 shadow-xl overflow-hidden">
      {/* Header */}
      <div className="p-6 border-b border-slate-700 bg-slate-800/50">
        <div className="text-sm font-medium text-slate-400 mb-1">Step {currentStepIndex + 1} of {chain.steps.length}</div>
        <h2 className="text-2xl font-bold text-white flex items-center gap-3">
          Current: <span className="text-indigo-400 font-mono">{formatIsotope(currentStep.from)}</span>
        </h2>
        <div className="mt-4 flex items-start gap-3 p-4 rounded-lg bg-slate-900/50 border border-slate-700">
          <Info className="text-slate-400 shrink-0 mt-0.5" size={18} />
          <div>
            <div className="font-medium text-slate-200 mb-1">
              Undergoes <span className={isAlpha ? "text-yellow-400" : "text-blue-400"}>{currentStep.type} Decay</span>
            </div>
            <p className="text-sm text-slate-400">
              {isAlpha 
                ? "Emits an alpha particle (2 protons, 2 neutrons). Mass decreases by 4, atomic number decreases by 2."
                : "Emits a beta particle (electron). A neutron turns into a proton. Mass remains the same, atomic number increases by 1."}
            </p>
          </div>
        </div>
      </div>

      {/* Interactive Area */}
      <div className="p-6 flex-grow flex flex-col">
        <h3 className="text-lg font-medium text-slate-200 mb-4">Predict the next isotope:</h3>
        
        <div className="grid grid-cols-1 gap-3 mb-6">
          {options.map((option) => {
            const isSelected = selectedOption?.id === option.id;
            const showCorrect = hasGuessed && option.isCorrect;
            const showIncorrect = hasGuessed && isSelected && !option.isCorrect;

            return (
              <button
                key={option.id}
                onClick={() => handleGuess(option)}
                disabled={hasGuessed}
                className={cn(
                  "relative flex items-center justify-between p-4 rounded-lg border-2 text-left font-mono text-lg transition-all",
                  !hasGuessed && "border-slate-600 bg-slate-700/50 hover:bg-slate-700 hover:border-indigo-500 text-slate-200 cursor-pointer",
                  showCorrect && "border-emerald-500 bg-emerald-500/10 text-emerald-400",
                  showIncorrect && "border-rose-500 bg-rose-500/10 text-rose-400",
                  hasGuessed && !showCorrect && !showIncorrect && "border-slate-700 bg-slate-800/50 text-slate-500 opacity-50 cursor-not-allowed"
                )}
              >
                <span>{formatIsotope(option.isotope)}</span>
                {showCorrect && <CheckCircle2 className="text-emerald-500" size={20} />}
                {showIncorrect && <XCircle className="text-rose-500" size={20} />}
              </button>
            );
          })}
        </div>

        {/* Feedback Area */}
        <AnimatePresence mode="wait">
          {hasGuessed && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="mt-auto"
            >
              <div className={cn(
                "p-4 rounded-lg mb-4 border",
                selectedOption?.isCorrect 
                  ? "bg-emerald-500/10 border-emerald-500/20 text-emerald-200" 
                  : "bg-rose-500/10 border-rose-500/20 text-rose-200"
              )}>
                <div className="font-bold mb-1">
                  {selectedOption?.isCorrect ? "Correct!" : "Not quite."}
                </div>
                <div className="text-sm opacity-90">
                  {isAlpha ? (
                    <>
                      {formatIsotope(currentStep.from)} ({currentStep.from.z} protons, {currentStep.from.n} neutrons) loses 2 protons and 2 neutrons to become <strong>{formatIsotope(currentStep.to)}</strong> ({currentStep.to.z} protons, {currentStep.to.n} neutrons).
                    </>
                  ) : (
                    <>
                      In {formatIsotope(currentStep.from)} ({currentStep.from.z} protons, {currentStep.from.n} neutrons), a neutron turns into a proton. It becomes <strong>{formatIsotope(currentStep.to)}</strong> ({currentStep.to.z} protons, {currentStep.to.n} neutrons).
                    </>
                  )}
                </div>
              </div>

              <button
                onClick={onAdvance}
                className="w-full flex items-center justify-center gap-2 py-4 bg-indigo-600 hover:bg-indigo-500 text-white rounded-lg font-bold text-lg transition-colors shadow-lg shadow-indigo-900/20"
              >
                Reveal Next Decay
                <ArrowRight size={20} />
              </button>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};
