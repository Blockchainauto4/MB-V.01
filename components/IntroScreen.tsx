import React, { useEffect, useState } from 'react';
import { Logo } from './Logo';

interface IntroScreenProps {
  onComplete: () => void;
}

export const IntroScreen: React.FC<IntroScreenProps> = ({ onComplete }) => {
  const [exiting, setExiting] = useState(false);

  useEffect(() => {
    // Start exit animation earlier
    const exitTimer = setTimeout(() => {
      setExiting(true);
    }, 2000);

    // Complete after animation finishes
    const completeTimer = setTimeout(() => {
      onComplete();
    }, 3000);

    return () => {
      clearTimeout(exitTimer);
      clearTimeout(completeTimer);
    };
  }, [onComplete]);

  return (
    <div 
      className={`fixed inset-0 z-50 flex items-center justify-center bg-black transition-all duration-1000 ease-[cubic-bezier(0.7,0,0.3,1)] ${
        exiting ? 'opacity-0 scale-110 filter blur-xl' : 'opacity-100 scale-100 blur-0'
      }`}
    >
      <div className={`transition-transform duration-1000 ${exiting ? 'scale-90' : 'scale-100'}`}>
        <Logo size="lg" />
      </div>
    </div>
  );
};