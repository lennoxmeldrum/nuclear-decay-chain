import { Isotope, DecayType, getIsotope, formatIsotope } from './decayData';

export interface PredictionOption {
  id: string;
  isotope: Isotope;
  isCorrect: boolean;
}

/**
 * Generates a list of plausible multiple-choice options for the next isotope.
 */
export function generateOptions(current: Isotope, correctNext: Isotope, decayType: DecayType): PredictionOption[] {
  const options: PredictionOption[] = [
    { id: 'correct', isotope: correctNext, isCorrect: true },
  ];

  const addOption = (z: number, a: number) => {
    // Avoid duplicates
    if (!options.some(opt => opt.isotope.z === z && opt.isotope.a === a)) {
      options.push({
        id: `wrong-${z}-${a}`,
        isotope: getIsotope(z, a),
        isCorrect: false,
      });
    }
  };

  if (decayType === 'Alpha') {
    // Correct: Z-2, A-4
    // Distractor 1: Beta mistake (Z+1, A)
    addOption(current.z + 1, current.a);
    // Distractor 2: Wrong math (Z-1, A-4)
    addOption(current.z - 1, current.a - 4);
    // Distractor 3: Wrong math (Z-2, A-2)
    addOption(current.z - 2, current.a - 2);
  } else if (decayType === 'Beta') {
    // Correct: Z+1, A
    // Distractor 1: Alpha mistake (Z-2, A-4)
    addOption(current.z - 2, current.a - 4);
    // Distractor 2: Wrong direction (Z-1, A)
    addOption(current.z - 1, current.a);
    // Distractor 3: Wrong math (Z+1, A-1)
    addOption(current.z + 1, current.a - 1);
  }

  // Shuffle options
  return options.sort(() => Math.random() - 0.5);
}
