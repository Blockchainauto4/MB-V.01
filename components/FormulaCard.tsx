import React from 'react';
import { TechnicalFormula } from '../types';

interface FormulaCardProps {
  formula: TechnicalFormula;
}

export const FormulaCard: React.FC<FormulaCardProps> = ({ formula }) => {
  return (
    <div className="w-full max-w-[85%] bg-[#0f0f0f] border border-gray-800 rounded-sm overflow-hidden animate-slide-up my-2 shadow-2xl">
      {/* Header */}
      <div className="bg-white text-black p-3 flex justify-between items-center">
        <h3 className="font-bold uppercase tracking-widest text-[10px]">Technical Prescription</h3>
        <div className="flex gap-2 text-[9px] font-mono">
           <span>Base: {formula.startingLevel}</span>
           <span>&rarr;</span>
           <span>Target: {formula.targetLevel}</span>
        </div>
      </div>

      {/* Steps */}
      <div className="p-4 space-y-4 relative">
        {/* Decorative line */}
        <div className="absolute left-6 top-6 bottom-6 w-px bg-gray-800"></div>

        {formula.process.map((step, idx) => (
          <div key={idx} className="relative pl-8">
             {/* Bullet */}
             <div className="absolute left-0 top-1 w-4 h-4 bg-gray-900 border border-gray-600 rounded-full flex items-center justify-center z-10">
                <span className="text-[9px] text-white font-bold">{step.step}</span>
             </div>

             <div className="mb-1 flex justify-between items-baseline">
                <h4 className="text-white text-xs font-bold uppercase">{step.title}</h4>
                <span className="text-gray-500 text-[9px] font-mono border border-gray-800 px-1 rounded">{step.time}</span>
             </div>
             
             <p className="text-gray-400 text-[10px] leading-relaxed mb-2">{step.description}</p>
             
             {/* Products Grid */}
             <div className="flex flex-wrap gap-1">
                {step.products.map((prod, pIdx) => (
                    <span key={pIdx} className="bg-gray-800 text-gray-200 text-[9px] px-2 py-1 rounded border border-gray-700">
                        {prod}
                    </span>
                ))}
             </div>
          </div>
        ))}
      </div>

      {/* Footer */}
      <div className="bg-[#0a0a0a] border-t border-gray-800 p-3 grid grid-cols-2 gap-4">
        <div>
            <span className="block text-[8px] uppercase text-gray-500 tracking-widest mb-1">Home Care</span>
            <p className="text-[9px] text-gray-300 leading-tight">{formula.maintenance}</p>
        </div>
        <div className="text-right flex flex-col justify-center">
            <span className="text-[8px] uppercase text-gray-500 tracking-widest">Complexity</span>
            <span className="text-yellow-500 text-xs tracking-widest">{formula.estimatedCost}</span>
        </div>
      </div>
    </div>
  );
};
