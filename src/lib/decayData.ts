export const ELEMENTS: Record<number, { symbol: string; name: string }> = {
  81: { symbol: 'Tl', name: 'Thallium' },
  82: { symbol: 'Pb', name: 'Lead' },
  83: { symbol: 'Bi', name: 'Bismuth' },
  84: { symbol: 'Po', name: 'Polonium' },
  85: { symbol: 'At', name: 'Astatine' },
  86: { symbol: 'Rn', name: 'Radon' },
  87: { symbol: 'Fr', name: 'Francium' },
  88: { symbol: 'Ra', name: 'Radium' },
  89: { symbol: 'Ac', name: 'Actinium' },
  90: { symbol: 'Th', name: 'Thorium' },
  91: { symbol: 'Pa', name: 'Protactinium' },
  92: { symbol: 'U', name: 'Uranium' },
  93: { symbol: 'Np', name: 'Neptunium' },
  94: { symbol: 'Pu', name: 'Plutonium' },
};

export interface Isotope {
  z: number; // Protons (Atomic Number)
  n: number; // Neutrons
  a: number; // Mass Number (Z + N)
  symbol: string;
}

export function getIsotope(z: number, a: number): Isotope {
  const element = ELEMENTS[z];
  return {
    z,
    n: a - z,
    a,
    symbol: element ? element.symbol : '?',
  };
}

export function formatIsotope(isotope: Isotope): string {
  return `${isotope.symbol}-${isotope.a}`;
}

export type DecayType = 'Alpha' | 'Beta' | 'Stable';

export interface DecayStep {
  from: Isotope;
  to: Isotope;
  type: DecayType;
}

export interface DecayChain {
  id: string;
  name: string;
  description: string;
  steps: DecayStep[];
}

// Helper to build a chain easily
function buildChain(id: string, name: string, description: string, sequence: { z: number; a: number; type: DecayType }[]): DecayChain {
  const steps: DecayStep[] = [];
  for (let i = 0; i < sequence.length - 1; i++) {
    steps.push({
      from: getIsotope(sequence[i].z, sequence[i].a),
      to: getIsotope(sequence[i + 1].z, sequence[i + 1].a),
      type: sequence[i].type,
    });
  }
  // Add the final stable state as a dummy step if needed, or just let the last 'to' be stable.
  return { id, name, description, steps };
}

export const DECAY_CHAINS: DecayChain[] = [
  buildChain(
    'thorium',
    'Thorium Series (4n)',
    'Starts with Thorium-232 and ends with Lead-208. Mass numbers are multiples of 4.',
    [
      { z: 90, a: 232, type: 'Alpha' },
      { z: 88, a: 228, type: 'Beta' },
      { z: 89, a: 228, type: 'Beta' },
      { z: 90, a: 228, type: 'Alpha' },
      { z: 88, a: 224, type: 'Alpha' },
      { z: 86, a: 220, type: 'Alpha' },
      { z: 84, a: 216, type: 'Alpha' },
      { z: 82, a: 212, type: 'Beta' },
      { z: 83, a: 212, type: 'Beta' },
      { z: 84, a: 212, type: 'Alpha' },
      { z: 82, a: 208, type: 'Stable' },
    ]
  ),
  buildChain(
    'radium',
    'Uranium-Radium Series (4n+2)',
    'Starts with Uranium-238 and ends with Lead-206. The most common decay series.',
    [
      { z: 92, a: 238, type: 'Alpha' },
      { z: 90, a: 234, type: 'Beta' },
      { z: 91, a: 234, type: 'Beta' },
      { z: 92, a: 234, type: 'Alpha' },
      { z: 90, a: 230, type: 'Alpha' },
      { z: 88, a: 226, type: 'Alpha' },
      { z: 86, a: 222, type: 'Alpha' },
      { z: 84, a: 218, type: 'Alpha' },
      { z: 82, a: 214, type: 'Beta' },
      { z: 83, a: 214, type: 'Beta' },
      { z: 84, a: 214, type: 'Alpha' },
      { z: 82, a: 210, type: 'Beta' },
      { z: 83, a: 210, type: 'Beta' },
      { z: 84, a: 210, type: 'Alpha' },
      { z: 82, a: 206, type: 'Stable' },
    ]
  ),
  buildChain(
    'actinium',
    'Uranium-Actinium Series (4n+3)',
    'Starts with Uranium-235 and ends with Lead-207.',
    [
      { z: 92, a: 235, type: 'Alpha' },
      { z: 90, a: 231, type: 'Beta' },
      { z: 91, a: 231, type: 'Alpha' },
      { z: 89, a: 227, type: 'Beta' },
      { z: 90, a: 227, type: 'Alpha' },
      { z: 88, a: 223, type: 'Alpha' },
      { z: 86, a: 219, type: 'Alpha' },
      { z: 84, a: 215, type: 'Alpha' },
      { z: 82, a: 211, type: 'Beta' },
      { z: 83, a: 211, type: 'Alpha' },
      { z: 81, a: 207, type: 'Beta' },
      { z: 82, a: 207, type: 'Stable' },
    ]
  ),
  buildChain(
    'neptunium',
    'Neptunium Series (4n+1)',
    'Starts with Neptunium-237 and ends with Bismuth-209. Mostly synthetic nuclides.',
    [
      { z: 93, a: 237, type: 'Alpha' },
      { z: 91, a: 233, type: 'Beta' },
      { z: 92, a: 233, type: 'Alpha' },
      { z: 90, a: 229, type: 'Alpha' },
      { z: 88, a: 225, type: 'Beta' },
      { z: 89, a: 225, type: 'Alpha' },
      { z: 87, a: 221, type: 'Alpha' },
      { z: 85, a: 217, type: 'Alpha' },
      { z: 83, a: 213, type: 'Beta' },
      { z: 84, a: 213, type: 'Alpha' },
      { z: 82, a: 209, type: 'Beta' },
      { z: 83, a: 209, type: 'Stable' },
    ]
  ),
];
