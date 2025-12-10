import React from 'react';

export const Logo: React.FC<{ size?: 'sm' | 'lg' }> = ({ size = 'lg' }) => {
  return (
    <div className="flex flex-col items-center justify-center text-white select-none">
      {size === 'lg' ? (
        <>
          <div className="mb-6 text-center tracking-[0.4em] text-[10px] font-medium uppercase opacity-60">
            Visagismo & Color
          </div>
          <div className="text-3xl md:text-4xl leading-tight flex flex-col items-center uppercase tracking-widest">
             <span className="font-light tracking-[0.2em] mb-2">Beatriz</span>
             <span className="font-bold tracking-[0.2em]">Bittencourt</span>
          </div>
        </>
      ) : (
        <div className="text-xs leading-none flex items-center uppercase tracking-[0.15em] gap-1.5">
          <span className="font-light">Beatriz</span>
          <span className="font-bold">Bittencourt</span>
        </div>
      )}
    </div>
  );
};