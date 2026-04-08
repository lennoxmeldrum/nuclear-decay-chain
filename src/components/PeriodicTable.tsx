import React from 'react';
import { X } from 'lucide-react';

interface Element {
  z: number;
  symbol: string;
  row: number;
  col: number;
  category: string;
}

const elements: Element[] = [
  // Row 1
  { z: 1, symbol: 'H', row: 1, col: 1, category: 'nonmetal' },
  { z: 2, symbol: 'He', row: 1, col: 18, category: 'noble-gas' },
  // Row 2
  { z: 3, symbol: 'Li', row: 2, col: 1, category: 'alkali' },
  { z: 4, symbol: 'Be', row: 2, col: 2, category: 'alkaline' },
  { z: 5, symbol: 'B', row: 2, col: 13, category: 'metalloid' },
  { z: 6, symbol: 'C', row: 2, col: 14, category: 'nonmetal' },
  { z: 7, symbol: 'N', row: 2, col: 15, category: 'nonmetal' },
  { z: 8, symbol: 'O', row: 2, col: 16, category: 'nonmetal' },
  { z: 9, symbol: 'F', row: 2, col: 17, category: 'halogen' },
  { z: 10, symbol: 'Ne', row: 2, col: 18, category: 'noble-gas' },
  // Row 3
  { z: 11, symbol: 'Na', row: 3, col: 1, category: 'alkali' },
  { z: 12, symbol: 'Mg', row: 3, col: 2, category: 'alkaline' },
  { z: 13, symbol: 'Al', row: 3, col: 13, category: 'post-transition' },
  { z: 14, symbol: 'Si', row: 3, col: 14, category: 'metalloid' },
  { z: 15, symbol: 'P', row: 3, col: 15, category: 'nonmetal' },
  { z: 16, symbol: 'S', row: 3, col: 16, category: 'nonmetal' },
  { z: 17, symbol: 'Cl', row: 3, col: 17, category: 'halogen' },
  { z: 18, symbol: 'Ar', row: 3, col: 18, category: 'noble-gas' },
  // Row 4
  { z: 19, symbol: 'K', row: 4, col: 1, category: 'alkali' },
  { z: 20, symbol: 'Ca', row: 4, col: 2, category: 'alkaline' },
  { z: 21, symbol: 'Sc', row: 4, col: 3, category: 'transition' },
  { z: 22, symbol: 'Ti', row: 4, col: 4, category: 'transition' },
  { z: 23, symbol: 'V', row: 4, col: 5, category: 'transition' },
  { z: 24, symbol: 'Cr', row: 4, col: 6, category: 'transition' },
  { z: 25, symbol: 'Mn', row: 4, col: 7, category: 'transition' },
  { z: 26, symbol: 'Fe', row: 4, col: 8, category: 'transition' },
  { z: 27, symbol: 'Co', row: 4, col: 9, category: 'transition' },
  { z: 28, symbol: 'Ni', row: 4, col: 10, category: 'transition' },
  { z: 29, symbol: 'Cu', row: 4, col: 11, category: 'transition' },
  { z: 30, symbol: 'Zn', row: 4, col: 12, category: 'transition' },
  { z: 31, symbol: 'Ga', row: 4, col: 13, category: 'post-transition' },
  { z: 32, symbol: 'Ge', row: 4, col: 14, category: 'metalloid' },
  { z: 33, symbol: 'As', row: 4, col: 15, category: 'metalloid' },
  { z: 34, symbol: 'Se', row: 4, col: 16, category: 'nonmetal' },
  { z: 35, symbol: 'Br', row: 4, col: 17, category: 'halogen' },
  { z: 36, symbol: 'Kr', row: 4, col: 18, category: 'noble-gas' },
  // Row 5
  { z: 37, symbol: 'Rb', row: 5, col: 1, category: 'alkali' },
  { z: 38, symbol: 'Sr', row: 5, col: 2, category: 'alkaline' },
  { z: 39, symbol: 'Y', row: 5, col: 3, category: 'transition' },
  { z: 40, symbol: 'Zr', row: 5, col: 4, category: 'transition' },
  { z: 41, symbol: 'Nb', row: 5, col: 5, category: 'transition' },
  { z: 42, symbol: 'Mo', row: 5, col: 6, category: 'transition' },
  { z: 43, symbol: 'Tc', row: 5, col: 7, category: 'transition' },
  { z: 44, symbol: 'Ru', row: 5, col: 8, category: 'transition' },
  { z: 45, symbol: 'Rh', row: 5, col: 9, category: 'transition' },
  { z: 46, symbol: 'Pd', row: 5, col: 10, category: 'transition' },
  { z: 47, symbol: 'Ag', row: 5, col: 11, category: 'transition' },
  { z: 48, symbol: 'Cd', row: 5, col: 12, category: 'transition' },
  { z: 49, symbol: 'In', row: 5, col: 13, category: 'post-transition' },
  { z: 50, symbol: 'Sn', row: 5, col: 14, category: 'post-transition' },
  { z: 51, symbol: 'Sb', row: 5, col: 15, category: 'metalloid' },
  { z: 52, symbol: 'Te', row: 5, col: 16, category: 'metalloid' },
  { z: 53, symbol: 'I', row: 5, col: 17, category: 'halogen' },
  { z: 54, symbol: 'Xe', row: 5, col: 18, category: 'noble-gas' },
  // Row 6
  { z: 55, symbol: 'Cs', row: 6, col: 1, category: 'alkali' },
  { z: 56, symbol: 'Ba', row: 6, col: 2, category: 'alkaline' },
  { z: 72, symbol: 'Hf', row: 6, col: 4, category: 'transition' },
  { z: 73, symbol: 'Ta', row: 6, col: 5, category: 'transition' },
  { z: 74, symbol: 'W', row: 6, col: 6, category: 'transition' },
  { z: 75, symbol: 'Re', row: 6, col: 7, category: 'transition' },
  { z: 76, symbol: 'Os', row: 6, col: 8, category: 'transition' },
  { z: 77, symbol: 'Ir', row: 6, col: 9, category: 'transition' },
  { z: 78, symbol: 'Pt', row: 6, col: 10, category: 'transition' },
  { z: 79, symbol: 'Au', row: 6, col: 11, category: 'transition' },
  { z: 80, symbol: 'Hg', row: 6, col: 12, category: 'transition' },
  { z: 81, symbol: 'Tl', row: 6, col: 13, category: 'post-transition' },
  { z: 82, symbol: 'Pb', row: 6, col: 14, category: 'post-transition' },
  { z: 83, symbol: 'Bi', row: 6, col: 15, category: 'post-transition' },
  { z: 84, symbol: 'Po', row: 6, col: 16, category: 'post-transition' },
  { z: 85, symbol: 'At', row: 6, col: 17, category: 'halogen' },
  { z: 86, symbol: 'Rn', row: 6, col: 18, category: 'noble-gas' },
  // Row 7
  { z: 87, symbol: 'Fr', row: 7, col: 1, category: 'alkali' },
  { z: 88, symbol: 'Ra', row: 7, col: 2, category: 'alkaline' },
  { z: 104, symbol: 'Rf', row: 7, col: 4, category: 'transition' },
  { z: 105, symbol: 'Db', row: 7, col: 5, category: 'transition' },
  { z: 106, symbol: 'Sg', row: 7, col: 6, category: 'transition' },
  { z: 107, symbol: 'Bh', row: 7, col: 7, category: 'transition' },
  { z: 108, symbol: 'Hs', row: 7, col: 8, category: 'transition' },
  { z: 109, symbol: 'Mt', row: 7, col: 9, category: 'transition' },
  { z: 110, symbol: 'Ds', row: 7, col: 10, category: 'transition' },
  { z: 111, symbol: 'Rg', row: 7, col: 11, category: 'transition' },
  { z: 112, symbol: 'Cn', row: 7, col: 12, category: 'transition' },
  { z: 113, symbol: 'Nh', row: 7, col: 13, category: 'post-transition' },
  { z: 114, symbol: 'Fl', row: 7, col: 14, category: 'post-transition' },
  { z: 115, symbol: 'Mc', row: 7, col: 15, category: 'post-transition' },
  { z: 116, symbol: 'Lv', row: 7, col: 16, category: 'post-transition' },
  { z: 117, symbol: 'Ts', row: 7, col: 17, category: 'halogen' },
  { z: 118, symbol: 'Og', row: 7, col: 18, category: 'noble-gas' },
  // Lanthanides (row 9)
  { z: 57, symbol: 'La', row: 9, col: 4, category: 'lanthanide' },
  { z: 58, symbol: 'Ce', row: 9, col: 5, category: 'lanthanide' },
  { z: 59, symbol: 'Pr', row: 9, col: 6, category: 'lanthanide' },
  { z: 60, symbol: 'Nd', row: 9, col: 7, category: 'lanthanide' },
  { z: 61, symbol: 'Pm', row: 9, col: 8, category: 'lanthanide' },
  { z: 62, symbol: 'Sm', row: 9, col: 9, category: 'lanthanide' },
  { z: 63, symbol: 'Eu', row: 9, col: 10, category: 'lanthanide' },
  { z: 64, symbol: 'Gd', row: 9, col: 11, category: 'lanthanide' },
  { z: 65, symbol: 'Tb', row: 9, col: 12, category: 'lanthanide' },
  { z: 66, symbol: 'Dy', row: 9, col: 13, category: 'lanthanide' },
  { z: 67, symbol: 'Ho', row: 9, col: 14, category: 'lanthanide' },
  { z: 68, symbol: 'Er', row: 9, col: 15, category: 'lanthanide' },
  { z: 69, symbol: 'Tm', row: 9, col: 16, category: 'lanthanide' },
  { z: 70, symbol: 'Yb', row: 9, col: 17, category: 'lanthanide' },
  { z: 71, symbol: 'Lu', row: 9, col: 18, category: 'lanthanide' },
  // Actinides (row 10)
  { z: 89, symbol: 'Ac', row: 10, col: 4, category: 'actinide' },
  { z: 90, symbol: 'Th', row: 10, col: 5, category: 'actinide' },
  { z: 91, symbol: 'Pa', row: 10, col: 6, category: 'actinide' },
  { z: 92, symbol: 'U', row: 10, col: 7, category: 'actinide' },
  { z: 93, symbol: 'Np', row: 10, col: 8, category: 'actinide' },
  { z: 94, symbol: 'Pu', row: 10, col: 9, category: 'actinide' },
  { z: 95, symbol: 'Am', row: 10, col: 10, category: 'actinide' },
  { z: 96, symbol: 'Cm', row: 10, col: 11, category: 'actinide' },
  { z: 97, symbol: 'Bk', row: 10, col: 12, category: 'actinide' },
  { z: 98, symbol: 'Cf', row: 10, col: 13, category: 'actinide' },
  { z: 99, symbol: 'Es', row: 10, col: 14, category: 'actinide' },
  { z: 100, symbol: 'Fm', row: 10, col: 15, category: 'actinide' },
  { z: 101, symbol: 'Md', row: 10, col: 16, category: 'actinide' },
  { z: 102, symbol: 'No', row: 10, col: 17, category: 'actinide' },
  { z: 103, symbol: 'Lr', row: 10, col: 18, category: 'actinide' },
];

const categoryColors: Record<string, string> = {
  'alkali': 'bg-rose-500/30 border-rose-500/40',
  'alkaline': 'bg-orange-500/30 border-orange-500/40',
  'transition': 'bg-amber-500/25 border-amber-500/35',
  'post-transition': 'bg-emerald-500/25 border-emerald-500/35',
  'metalloid': 'bg-teal-500/25 border-teal-500/35',
  'nonmetal': 'bg-sky-500/30 border-sky-500/40',
  'halogen': 'bg-cyan-500/25 border-cyan-500/35',
  'noble-gas': 'bg-violet-500/25 border-violet-500/35',
  'lanthanide': 'bg-pink-500/20 border-pink-500/30',
  'actinide': 'bg-fuchsia-500/20 border-fuchsia-500/30',
};

interface PeriodicTableProps {
  onClose: () => void;
}

export const PeriodicTable: React.FC<PeriodicTableProps> = ({ onClose }) => {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4" onClick={onClose}>
      <div className="absolute inset-0 bg-black/70 backdrop-blur-sm" />
      <div
        className="relative bg-slate-900 border border-slate-700 rounded-2xl shadow-2xl max-w-5xl w-full max-h-[90vh] overflow-auto p-4 sm:p-6"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-bold text-white">Periodic Table of Elements</h2>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg hover:bg-slate-700 text-slate-400 hover:text-white transition-colors"
          >
            <X size={20} />
          </button>
        </div>

        <div
          className="grid gap-[3px]"
          style={{
            gridTemplateColumns: 'repeat(18, minmax(0, 1fr))',
            gridTemplateRows: 'repeat(10, auto)',
          }}
        >
          {elements.map((el) => (
            <div
              key={el.z}
              className={`border rounded px-0.5 py-1 text-center select-none ${categoryColors[el.category]}`}
              style={{
                gridColumn: el.col,
                gridRow: el.row,
              }}
            >
              <div className="text-[9px] sm:text-[10px] leading-none text-slate-400">{el.z}</div>
              <div className="text-xs sm:text-sm font-bold leading-tight text-white">{el.symbol}</div>
            </div>
          ))}

          {/* Lanthanide / Actinide indicator arrows */}
          <div
            className="flex items-center justify-center text-[10px] text-pink-400 font-medium"
            style={{ gridColumn: 3, gridRow: 6 }}
          >
            *
          </div>
          <div
            className="flex items-center justify-center text-[10px] text-fuchsia-400 font-medium"
            style={{ gridColumn: 3, gridRow: 7 }}
          >
            **
          </div>
          <div
            className="flex items-center justify-center text-[10px] text-pink-400 font-medium"
            style={{ gridColumn: 3, gridRow: 9 }}
          >
            *
          </div>
          <div
            className="flex items-center justify-center text-[10px] text-fuchsia-400 font-medium"
            style={{ gridColumn: 3, gridRow: 10 }}
          >
            **
          </div>
        </div>
      </div>
    </div>
  );
};
