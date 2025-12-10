import React from 'react';
import { Language } from '../types';

interface WeddingServicesProps {
  language: Language;
}

const PACKAGES = [
  {
    title: 'Dia da Noiva',
    subtitle: 'A Experiência Completa',
    features: ['Consultoria de Visagismo', 'Teste de Cabelo e Make', 'Massagem Relaxante', 'Sala Exclusiva', 'Café da Manhã/Almoço'],
    price: 'A partir de R$ 2.500'
  },
  {
    title: 'Madrinhas',
    subtitle: 'Para quem te acompanha',
    features: ['Penteado Profissional', 'Maquiagem Alta Fixação', 'Atendimento em Grupo', 'Brinde com Espumante'],
    price: 'A partir de R$ 450'
  }
];

const GALLERY_IMAGES = [
  "https://images.unsplash.com/photo-1606800052052-a08af7148866?q=80&w=500&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1595475207225-428b62bda831?q=80&w=500&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1522673607200-1645062cd958?q=80&w=500&auto=format&fit=crop"
];

export const WeddingServices: React.FC<WeddingServicesProps> = ({ language }) => {
  return (
    <div className="pb-24 pt-8 px-4 animate-fade-in">
      <div className="mb-8">
        <h1 className="text-4xl font-bold mb-2">Noivas.</h1>
        <p className="text-gray-400 text-lg">Especialistas em realizar sonhos.</p>
      </div>

      {/* Hero Visual */}
      <div className="relative w-full aspect-[4/5] bg-[#111] mb-12 overflow-hidden group rounded-sm shadow-2xl">
        <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent z-10 opacity-70"></div>
        <div className="w-full h-full opacity-70 bg-[url('https://images.unsplash.com/photo-1549482199-bc1ca6f58502?q=80&w=1000&auto=format&fit=crop')] bg-cover bg-center grayscale transition-transform duration-1000 group-hover:scale-105"></div>
        
        <div className="absolute bottom-8 left-6 right-6 z-20">
          <div className="text-[10px] uppercase tracking-[0.3em] text-white mb-2 font-bold">Beatriz Bittencourt</div>
          <h2 className="text-3xl font-light italic text-white leading-tight">
            "Sua beleza, traduzida em emoção no altar."
          </h2>
        </div>
      </div>

      {/* Visagismo Section */}
      <div className="mb-16 border-l-2 border-white pl-6 py-2">
        <h3 className="text-xl font-bold uppercase tracking-widest mb-4">Visagismo para Noivas</h3>
        <p className="text-gray-400 text-sm leading-relaxed mb-4">
          Não fazemos apenas cabelo e maquiagem; projetamos sua imagem. Nossa análise exclusiva de Visagismo garante que seu visual harmonize perfeitamente com seu vestido, formato de rosto e a essência do seu casamento.
        </p>
        <span className="text-xs uppercase border-b border-gray-600 pb-1 text-gray-300">Consultoria Premium Inclusa</span>
      </div>

      {/* Gallery Preview */}
      <div className="mb-12">
        <h3 className="text-lg font-bold uppercase tracking-widest mb-6">Nossas Noivas</h3>
        <div className="grid grid-cols-3 gap-2">
           {GALLERY_IMAGES.map((src, i) => (
             <div key={i} className="aspect-square bg-gray-800 overflow-hidden relative group">
                <img src={src} alt="Noiva" className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-700" />
                <div className="absolute inset-0 bg-black/20 group-hover:bg-transparent transition-colors"></div>
             </div>
           ))}
        </div>
      </div>

      {/* Packages */}
      <div className="space-y-6 mb-12">
        <h3 className="text-lg font-bold uppercase tracking-widest mb-2">Pacotes</h3>
        {PACKAGES.map((pkg, idx) => (
          <div key={idx} className="bg-[#1a1a1a] p-6 border border-gray-800 hover:border-gray-600 transition-colors relative overflow-hidden group">
            <div className="absolute top-0 right-0 w-24 h-24 bg-gradient-to-bl from-white/5 to-transparent rounded-bl-full transition-opacity opacity-50 group-hover:opacity-100"></div>
            
            <div className="flex justify-between items-start mb-4 relative z-10">
              <div>
                <h4 className="text-xl font-bold">{pkg.title}</h4>
                <p className="text-xs uppercase tracking-wider text-gray-500">{pkg.subtitle}</p>
              </div>
              <div className="text-right">
                <span className="block text-sm text-gray-300 font-mono">{pkg.price}</span>
              </div>
            </div>
            
            <ul className="space-y-3 mb-8 relative z-10">
              {pkg.features.map((feature, i) => (
                <li key={i} className="text-sm text-gray-400 flex items-center gap-3">
                  <div className="w-1 h-1 bg-white rounded-full"></div>
                  {feature}
                </li>
              ))}
            </ul>

            <button className="w-full bg-white text-black font-bold uppercase py-3 text-xs tracking-widest hover:bg-gray-200 transition-colors relative z-10">
              Ver Detalhes
            </button>
          </div>
        ))}
      </div>

      {/* CTA */}
      <div className="text-center bg-[#111] py-12 px-4 border border-gray-900">
        <h2 className="text-xl font-bold mb-2">Agende sua Data</h2>
        <p className="text-gray-500 mb-8 text-sm max-w-xs mx-auto">Disponibilidade limitada para a temporada 2024/2025.</p>
        <a 
            href="https://wa.me/5511992279655?text=Ol%C3%A1%2C%20gostaria%20de%20um%20or%C3%A7amento%20para%20Dia%20da%20Noiva"
            target="_blank" 
            rel="noopener noreferrer"
            className="inline-block border border-white text-white font-bold uppercase py-4 px-8 text-xs tracking-[0.2em] hover:bg-white hover:text-black transition-colors"
        >
          Falar no WhatsApp
        </a>
      </div>
    </div>
  );
};