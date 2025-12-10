import React, { useState } from 'react';
import { Logo } from './Logo';
import { Language } from '../types';

interface LanguageScreenProps {
  onSelect: (lang: Language) => void;
}

const LANGUAGES: { code: Language; label: string; native: string }[] = [
  { code: 'en', label: 'English', native: 'English' },
  { code: 'pt', label: 'Portuguese', native: 'Português' },
  { code: 'es', label: 'Spanish', native: 'Español' },
  { code: 'de', label: 'German', native: 'Deutsch' },
  { code: 'fr', label: 'French', native: 'Français' },
  { code: 'it', label: 'Italian', native: 'Italiano' },
];

export const LanguageScreen: React.FC<LanguageScreenProps> = ({ onSelect }) => {
  const [fading, setFading] = useState(false);

  const handleSelect = (code: Language) => {
    setFading(true);
    setTimeout(() => {
      onSelect(code);
    }, 500); // Wait for transition
  };

  return (
    <div 
      className={`fixed inset-0 z-[60] bg-black flex flex-col items-center justify-center transition-opacity duration-500 ${fading ? 'opacity-0' : 'opacity-100'}`}
    >
      <div className="mb-12 opacity-80 scale-90">
        <Logo size="sm" />
      </div>

      <h2 className="text-gray-600 text-[10px] uppercase tracking-[0.3em] mb-8 font-medium">
        Select Language
      </h2>

      <div className="flex flex-col items-center space-y-6 w-full max-w-xs px-8">
        {LANGUAGES.map((lang) => (
          <button
            key={lang.code}
            onClick={() => handleSelect(lang.code)}
            className="w-full group flex flex-col items-center justify-center space-y-1 py-2 transition-all duration-300 hover:scale-105"
          >
            <span className="text-white text-lg font-light tracking-widest uppercase group-hover:font-bold transition-all">
              {lang.native}
            </span>
            <span className="text-[9px] text-gray-600 uppercase tracking-widest opacity-0 group-hover:opacity-100 transition-opacity duration-300">
              {lang.label}
            </span>
          </button>
        ))}
      </div>

      <div className="absolute bottom-8 text-gray-800 text-[9px] uppercase tracking-widest">
        Beatriz Bittencourt Professional
      </div>
    </div>
  );
};