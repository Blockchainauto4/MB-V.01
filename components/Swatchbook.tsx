import React from 'react';
import { Swatch, Language } from '../types';

interface SwatchbookProps {
  language: Language;
}

const SWATCHES: Swatch[] = [
  { id: '1', code: '1.0', name: 'Black', color: '#1a1a1a', family: 'Natural' },
  { id: '2', code: '3.0', name: 'Dark Brown', color: '#3b2f2f', family: 'Natural' },
  { id: '3', code: '4.15', name: 'Ash Mahogany', color: '#4a3b32', family: 'Ash' },
  { id: '4', code: '5.3', name: 'Light Golden', color: '#6d5a42', family: 'Gold' },
  { id: '5', code: '6.34', name: 'Dark Copper', color: '#8a5e3a', family: 'Copper' },
  { id: '6', code: '7.43', name: 'Copper Blonde', color: '#b57b4c', family: 'Copper' },
  { id: '7', code: '8.1', name: 'Light Ash', color: '#c2b2a0', family: 'Ash' },
  { id: '8', code: '9.0', name: 'Very Light', color: '#e6d8c3', family: 'Natural' },
  { id: '9', code: '10.21', name: 'Platinium', color: '#f0e6d6', family: 'Iridescent' },
  { id: '10', code: '5.62', name: 'Iridescent Red', color: '#5e2a2a', family: 'Red' },
  { id: '11', code: '6.66', name: 'Deep Red', color: '#8c2626', family: 'Red' },
  { id: '12', code: '4.20', name: 'Violine', color: '#3d2636', family: 'Violet' },
];

const TEXTS: Record<Language, {
  title: string;
  subtitle: string;
  exploreBtn: string;
  tryOn: string;
}> = {
  en: {
    title: "Swatchbook.",
    subtitle: "Find the perfect shade among all franchises.",
    exploreBtn: "Explore Shades",
    tryOn: "Virtual Try-On"
  },
  pt: {
    title: "Catálogo de Cores.",
    subtitle: "Encontre o tom perfeito entre todas as franquias.",
    exploreBtn: "Explorar Tons",
    tryOn: "Provador Virtual"
  },
  es: {
    title: "Muestrario.",
    subtitle: "Encuentra el tono perfecto entre todas las franquicias.",
    exploreBtn: "Explorar Tonos",
    tryOn: "Pruébatelo"
  },
  de: {
    title: "Farbmusterbuch.",
    subtitle: "Finden Sie den perfekten Farbton.",
    exploreBtn: "Farbtöne Entdecken",
    tryOn: "Virtuelle Anprobe"
  },
  fr: {
    title: "Nuancier.",
    subtitle: "Trouvez la nuance parfaite parmi toutes les franchises.",
    exploreBtn: "Explorer les Nuances",
    tryOn: "Essai Virtuel"
  },
  it: {
    title: "Campionario.",
    subtitle: "Trova la tonalità perfetta tra tutte le serie.",
    exploreBtn: "Esplora Tonalità",
    tryOn: "Prova Virtuale"
  }
};

export const Swatchbook: React.FC<SwatchbookProps> = ({ language }) => {
  const t = TEXTS[language];

  return (
    <div className="pb-24 pt-8 px-4">
      <div className="mb-8 animate-slide-up">
        <h1 className="text-4xl font-bold mb-2">{t.title}</h1>
        <p className="text-gray-400 text-lg">{t.subtitle}</p>
      </div>

      <div className="relative mb-12 animate-slide-up delay-100">
        <button className="bg-white text-black font-bold uppercase py-4 px-8 text-sm tracking-wider hover:bg-gray-200 transition-colors">
          {t.exploreBtn}
        </button>
      </div>

      <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 gap-1 relative animate-blur-in">
        {SWATCHES.map((swatch, index) => (
          <div 
            key={swatch.id} 
            className="relative group cursor-pointer aspect-square animate-slide-up"
            style={{ animationDelay: `${index * 50}ms`, animationFillMode: 'both' }}
          >
            <div 
              className="w-full h-full shadow-inner transition-transform duration-500 group-hover:scale-95"
              style={{ backgroundColor: swatch.color }}
            />
            <div className="absolute bottom-1 left-1 text-[10px] font-mono text-white/80 bg-black/20 px-1 backdrop-blur-sm opacity-0 group-hover:opacity-100 transition-opacity duration-300">
              {swatch.code}
            </div>
          </div>
        ))}

        {/* Floating Virtual Try On Badge */}
        <div className="absolute right-4 bottom-10 md:right-10 md:bottom-20 z-10 animate-slide-up delay-500">
          <div className="relative w-32 h-32 animate-spin-slow">
            <svg viewBox="0 0 100 100" className="w-full h-full">
              <defs>
                <path id="circlePath" d="M 50, 50 m -37, 0 a 37,37 0 1,1 74,0 a 37,37 0 1,1 -74,0" />
              </defs>
              <circle cx="50" cy="50" r="38" fill="white" />
              <text fontSize="11" fontWeight="bold" letterSpacing="2">
                <textPath href="#circlePath" className="uppercase fill-black">
                  • {t.tryOn} • {t.tryOn}
                </textPath>
              </text>
            </svg>
            <div className="absolute inset-0 flex items-center justify-center">
               <div className="w-8 h-8 border border-black flex">
                 <div className="w-1/2 h-full border-r border-black"></div>
               </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};