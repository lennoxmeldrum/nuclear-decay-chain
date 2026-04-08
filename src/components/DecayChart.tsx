import React from 'react';
import { DecayChain, DecayStep } from '../lib/decayData';
import { motion } from 'motion/react';

interface DecayChartProps {
  chain: DecayChain;
  revealedSteps: number; // Number of steps currently revealed
}

export const DecayChart: React.FC<DecayChartProps> = ({ chain, revealedSteps }) => {
  // Determine bounds for the chart based on the current chain
  const allIsotopes = [chain.steps[0].from, ...chain.steps.map(s => s.to)];
  const minZ = Math.min(...allIsotopes.map(i => i.z)) - 1;
  const maxZ = Math.max(...allIsotopes.map(i => i.z)) + 1;
  const minN = Math.min(...allIsotopes.map(i => i.n)) - 2;
  const maxN = Math.max(...allIsotopes.map(i => i.n)) + 2;

  const width = 800;
  const height = 600;
  const padding = 60;

  const getX = (n: number) => padding + ((n - minN) / (maxN - minN)) * (width - padding * 2);
  const getY = (z: number) => height - padding - ((z - minZ) / (maxZ - minZ)) * (height - padding * 2);

  // Generate grid lines
  const zTicks = Array.from({ length: maxZ - minZ + 1 }, (_, i) => minZ + i);
  const nTicks = Array.from({ length: maxN - minN + 1 }, (_, i) => minN + i);

  return (
    <div className="w-full h-full bg-slate-900 rounded-xl border border-slate-800 shadow-2xl overflow-hidden relative font-mono">
      <svg viewBox={`0 0 ${width} ${height}`} className="w-full h-full">
        {/* Grid and Axes */}
        <g className="text-slate-700">
          {zTicks.map(z => (
            <line key={`z-${z}`} x1={padding} y1={getY(z)} x2={width - padding} y2={getY(z)} stroke="currentColor" strokeWidth="1" strokeDasharray="4 4" opacity={0.3} />
          ))}
          {nTicks.map(n => (
            <line key={`n-${n}`} x1={getX(n)} y1={padding} x2={getX(n)} y2={height - padding} stroke="currentColor" strokeWidth="1" strokeDasharray="4 4" opacity={0.3} />
          ))}
        </g>

        {/* Axis Labels */}
        <g className="text-slate-400 text-xs fill-current">
          {zTicks.map(z => (
            <text key={`z-label-${z}`} x={padding - 15} y={getY(z)} textAnchor="end" alignmentBaseline="middle">
              {z}
            </text>
          ))}
          {nTicks.map(n => (
            <text key={`n-label-${n}`} x={getX(n)} y={height - padding + 20} textAnchor="middle">
              {n}
            </text>
          ))}
          {/* Neutrons (N) label */}
          <text x={width / 2} y={height - padding + 40} textAnchor="middle" className="text-sm font-semibold text-slate-300">
            Neutrons (N)
          </text>
          {/* Protons (Z) label */}
          <text transform={`translate(${padding - 40}, ${height / 2}) rotate(-90)`} textAnchor="middle" className="text-sm font-semibold text-slate-300">
            Protons (Z)
          </text>
        </g>

        {/* Edges (Arrows) */}
        {chain.steps.slice(0, revealedSteps).map((step, i) => {
          const x1 = getX(step.from.n);
          const y1 = getY(step.from.z);
          const x2 = getX(step.to.n);
          const y2 = getY(step.to.z);
          const color = step.type === 'Alpha' ? '#eab308' : '#3b82f6'; // Yellow for Alpha, Blue for Beta

          return (
            <motion.g key={`edge-${i}`} initial={{ opacity: 0, pathLength: 0 }} animate={{ opacity: 1, pathLength: 1 }} transition={{ duration: 0.5 }}>
              <line
                x1={x1}
                y1={y1}
                x2={x2}
                y2={y2}
                stroke={color}
                strokeWidth="3"
                markerEnd={`url(#arrow-${step.type})`}
              />
            </motion.g>
          );
        })}

        {/* Nodes (Isotopes) */}
        {allIsotopes.slice(0, revealedSteps + 1).map((iso, i) => {
          const isLatest = i === revealedSteps;
          return (
            <g key={`node-wrapper-${i}-${iso.symbol}-${iso.a}`} transform={`translate(${getX(iso.n)}, ${getY(iso.z)})`}>
              <motion.g
                initial={{ scale: 0, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ type: 'spring', stiffness: 300, damping: 20, delay: i === 0 ? 0 : 0.4 }}
              >
                <circle
                r={isLatest ? 16 : 12}
                className={isLatest ? "fill-slate-800 stroke-white" : "fill-slate-800 stroke-slate-500"}
                strokeWidth={isLatest ? 3 : 2}
              />
              {/* Red dot at each revealed isotope location */}
              {isLatest && <circle r={10} className="fill-red-500/30" />}
              <circle r={isLatest ? 5 : 4} className="fill-red-500" />
              
              <text
                y={isLatest ? -22 : -18}
                textAnchor="middle"
                className={isLatest ? "fill-white text-xs font-bold" : "fill-slate-400 text-[10px]"}
              >
                {iso.symbol}
              </text>
              {isLatest && (
                <text y={26} textAnchor="middle" className="fill-slate-300 text-[10px] font-sans">
                  {iso.symbol}-{iso.a}
                </text>
              )}
              </motion.g>
            </g>
          );
        })}

        {/* Arrow Definitions */}
        <defs>
          <marker id="arrow-Alpha" viewBox="0 0 10 10" refX="20" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
            <path d="M 0 0 L 10 5 L 0 10 z" fill="#eab308" />
          </marker>
          <marker id="arrow-Beta" viewBox="0 0 10 10" refX="20" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
            <path d="M 0 0 L 10 5 L 0 10 z" fill="#3b82f6" />
          </marker>
        </defs>
      </svg>
      
      {/* Legend */}
      <div className="absolute top-4 right-4 bg-slate-900/80 backdrop-blur border border-slate-700 p-3 rounded-lg text-xs flex flex-col gap-2">
        <div className="flex items-center gap-2">
          <div className="w-4 h-1 bg-yellow-500 rounded-full"></div>
          <span className="text-slate-300">Alpha Decay (α)</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-4 h-1 bg-blue-500 rounded-full"></div>
          <span className="text-slate-300">Beta Decay (β⁻)</span>
        </div>
      </div>
    </div>
  );
};
