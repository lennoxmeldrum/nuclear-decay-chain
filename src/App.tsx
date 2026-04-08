import React, { useState } from 'react';
import { DECAY_CHAINS } from './lib/decayData';
import { DecayChart } from './components/DecayChart';
import { LearningPanel } from './components/LearningPanel';
import { Atom } from 'lucide-react';

export default function App() {
  const [selectedChainId, setSelectedChainId] = useState<string>(DECAY_CHAINS[0].id);
  const [revealedSteps, setRevealedSteps] = useState<number>(0);

  const currentChain = DECAY_CHAINS.find(c => c.id === selectedChainId) || DECAY_CHAINS[0];

  const handleChainChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedChainId(e.target.value);
    setRevealedSteps(0);
  };

  const handleAdvance = () => {
    setRevealedSteps(prev => Math.min(prev + 1, currentChain.steps.length));
  };

  const handleReset = () => {
    setRevealedSteps(0);
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-200 font-sans selection:bg-indigo-500/30">
      {/* Header */}
      <header className="bg-slate-900 border-b border-slate-800 sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-4 h-16 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-indigo-600 flex items-center justify-center text-white shadow-lg shadow-indigo-900/20">
              <Atom size={20} />
            </div>
            <h1 className="text-xl font-bold tracking-tight text-white">Nuclear Decay Visualizer</h1>
          </div>
          
          <div className="flex items-center gap-4">
            <label htmlFor="chain-select" className="text-sm font-medium text-slate-400">
              Decay Series:
            </label>
            <select
              id="chain-select"
              value={selectedChainId}
              onChange={handleChainChange}
              className="bg-slate-800 border border-slate-700 text-white text-sm rounded-lg focus:ring-indigo-500 focus:border-indigo-500 block w-64 p-2.5 outline-none transition-colors"
            >
              {DECAY_CHAINS.map(chain => (
                <option key={chain.id} value={chain.id}>
                  {chain.name}
                </option>
              ))}
            </select>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 py-8">
        <div className="mb-6">
          <p className="text-slate-400 max-w-3xl">
            {currentChain.description} Follow the chain by predicting the next isotope based on the type of decay.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 h-[700px]">
          {/* Left Column: Visualizer */}
          <div className="lg:col-span-2 h-full">
            <DecayChart chain={currentChain} revealedSteps={revealedSteps} />
          </div>

          {/* Right Column: Interactive Panel */}
          <div className="h-full">
            <LearningPanel 
              chain={currentChain} 
              currentStepIndex={revealedSteps} 
              onAdvance={handleAdvance}
              onReset={handleReset}
            />
          </div>
        </div>
      </main>
    </div>
  );
}
