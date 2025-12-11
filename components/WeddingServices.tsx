import React from 'react';
import { Language } from '../types';

interface WeddingServicesProps {
  language: Language;
}

const TEXTS: Record<Language, {
  title: string;
  subtitle: string;
  quote: string;
  visagismoTitle: string;
  visagismoDesc: string;
  premiumIncluded: string;
  galleryTitle: string;
  packagesTitle: string;
  ctaTitle: string;
  ctaDesc: string;
  ctaBtn: string;
  package1Title: string;
  package1Sub: string;
  package1Feat: string[];
  package1Price: string;
  package2Title: string;
  package2Sub: string;
  package2Feat: string[];
  package2Price: string;
  detailsBtn: string;
}> = {
  en: {
    title: "Bridal.",
    subtitle: "Specialists in making dreams come true.",
    quote: "\"Your beauty, translated into emotion at the altar.\"",
    visagismoTitle: "Bridal Visagismo",
    visagismoDesc: "We don't just do hair and makeup; we design your image. Our exclusive Visagismo analysis ensures your look harmonizes perfectly with your dress, face shape, and wedding essence.",
    premiumIncluded: "Premium Consultation Included",
    galleryTitle: "Our Brides",
    packagesTitle: "Packages",
    ctaTitle: "Book Your Date",
    ctaDesc: "Limited availability for the 2024/2025 season.",
    ctaBtn: "Chat on WhatsApp",
    package1Title: "Bride's Day",
    package1Sub: "The Complete Experience",
    package1Feat: ['Visagismo Consultation', 'Hair & Makeup Trial', 'Relaxing Massage', 'Exclusive Room', 'Breakfast/Lunch'],
    package1Price: 'From R$ 2.500',
    package2Title: "Bridesmaids",
    package2Sub: "For those who accompany you",
    package2Feat: ['Professional Hairstyle', 'High Fixation Makeup', 'Group Service', 'Sparkling Wine Toast'],
    package2Price: 'From R$ 450',
    detailsBtn: "View Details"
  },
  pt: {
    title: "Noivas.",
    subtitle: "Especialistas em realizar sonhos.",
    quote: "\"Sua beleza, traduzida em emoção no altar.\"",
    visagismoTitle: "Visagismo para Noivas",
    visagismoDesc: "Não fazemos apenas cabelo e maquiagem; projetamos sua imagem. Nossa análise exclusiva de Visagismo garante que seu visual harmonize perfeitamente com seu vestido, formato de rosto e a essência do seu casamento.",
    premiumIncluded: "Consultoria Premium Inclusa",
    galleryTitle: "Nossas Noivas",
    packagesTitle: "Pacotes",
    ctaTitle: "Agende sua Data",
    ctaDesc: "Disponibilidade limitada para a temporada 2024/2025.",
    ctaBtn: "Falar no WhatsApp",
    package1Title: 'Dia da Noiva',
    package1Sub: 'A Experiência Completa',
    package1Feat: ['Consultoria de Visagismo', 'Teste de Cabelo e Make', 'Massagem Relaxante', 'Sala Exclusiva', 'Café da Manhã/Almoço'],
    package1Price: 'A partir de R$ 2.500',
    package2Title: 'Madrinhas',
    package2Sub: 'Para quem te acompanha',
    package2Feat: ['Penteado Profissional', 'Maquiagem Alta Fixação', 'Atendimento em Grupo', 'Brinde com Espumante'],
    package2Price: 'A partir de R$ 450',
    detailsBtn: "Ver Detalhes"
  },
  es: {
    title: "Novias.",
    subtitle: "Especialistas en hacer sueños realidad.",
    quote: "\"Tu belleza, traducida en emoción en el altar.\"",
    visagismoTitle: "Visagismo para Novias",
    visagismoDesc: "No solo hacemos peinado y maquillaje; diseñamos tu imagen. Nuestro análisis exclusivo de Visagismo asegura que tu look armonice perfectamente con tu vestido.",
    premiumIncluded: "Consultoría Premium Incluida",
    galleryTitle: "Nuestras Novias",
    packagesTitle: "Paquetes",
    ctaTitle: "Reserva tu Fecha",
    ctaDesc: "Disponibilidad limitada para la temporada 2024/2025.",
    ctaBtn: "Hablar por WhatsApp",
    package1Title: 'Día de la Novia',
    package1Sub: 'La Experiencia Completa',
    package1Feat: ['Consultoría de Visagismo', 'Prueba de Peinado y Maquillaje', 'Masaje Relajante', 'Sala Exclusiva', 'Desayuno/Almuerzo'],
    package1Price: 'Desde R$ 2.500',
    package2Title: 'Damas de Honor',
    package2Sub: 'Para quienes te acompañan',
    package2Feat: ['Peinado Profesional', 'Maquillaje de Alta Fijación', 'Atención en Grupo', 'Brindis con Espumoso'],
    package2Price: 'Desde R$ 450',
    detailsBtn: "Ver Detalles"
  },
  de: {
    title: "Bräute.",
    subtitle: "Spezialisten für Traumhochzeiten.",
    quote: "\"Ihre Schönheit, übersetzt in Emotionen am Altar.\"",
    visagismoTitle: "Braut-Visagismus",
    visagismoDesc: "Wir machen nicht nur Haare und Make-up; wir entwerfen Ihr Image. Unsere exklusive Visagismus-Analyse garantiert, dass Ihr Look perfekt mit Ihrem Kleid harmoniert.",
    premiumIncluded: "Premium-Beratung Inbegriffen",
    galleryTitle: "Unsere Bräute",
    packagesTitle: "Pakete",
    ctaTitle: "Reservieren Sie Ihr Datum",
    ctaDesc: "Begrenzte Verfügbarkeit für die Saison 2024/2025.",
    ctaBtn: "Chat auf WhatsApp",
    package1Title: 'Tag der Braut',
    package1Sub: 'Das komplette Erlebnis',
    package1Feat: ['Visagismus-Beratung', 'Haar & Make-up Probe', 'Entspannungsmassage', 'Exklusiver Raum', 'Frühstück/Mittagessen'],
    package1Price: 'Ab R$ 2.500',
    package2Title: 'Brautjungfern',
    package2Sub: 'Für Ihre Begleitung',
    package2Feat: ['Professionelle Frisur', 'High Fixation Make-up', 'Gruppenservice', 'Sektanstoß'],
    package2Price: 'Ab R$ 450',
    detailsBtn: "Details Ansehen"
  },
  fr: {
    title: "Mariées.",
    subtitle: "Spécialistes pour réaliser vos rêves.",
    quote: "\"Votre beauté, traduite en émotion à l'autel.\"",
    visagismoTitle: "Visagisme pour Mariées",
    visagismoDesc: "Nous ne faisons pas que la coiffure et le maquillage ; nous concevons votre image. Notre analyse exclusive de Visagisme assure que votre look s'harmonise parfaitement avec votre robe.",
    premiumIncluded: "Consultation Premium Incluse",
    galleryTitle: "Nos Mariées",
    packagesTitle: "Forfaits",
    ctaTitle: "Réservez Votre Date",
    ctaDesc: "Disponibilité limitée pour la saison 2024/2025.",
    ctaBtn: "Discuter sur WhatsApp",
    package1Title: 'Jour de la Mariée',
    package1Sub: 'L\'Expérience Complète',
    package1Feat: ['Consultation Visagisme', 'Essai Coiffure & Maquillage', 'Massage Relaxant', 'Salle Exclusive', 'Petit-déjeuner/Déjeuner'],
    package1Price: 'À partir de R$ 2.500',
    package2Title: 'Demoiselles d\'honneur',
    package2Sub: 'Pour celles qui vous accompagnent',
    package2Feat: ['Coiffure Professionnelle', 'Maquillage Haute Tenue', 'Service de Groupe', 'Toast au Pétillant'],
    package2Price: 'À partir de R$ 450',
    detailsBtn: "Voir Détails"
  },
  it: {
    title: "Spose.",
    subtitle: "Specialisti nel realizzare sogni.",
    quote: "\"La tua bellezza, tradotta in emozione all'altare.\"",
    visagismoTitle: "Visagismo per Spose",
    visagismoDesc: "Non facciamo solo trucco e parrucco; progettiamo la tua immagine. La nostra analisi esclusiva di Visagismo assicura che il tuo look si armonizzi perfettamente con il tuo abito.",
    premiumIncluded: "Consulenza Premium Inclusa",
    galleryTitle: "Le Nostre Spose",
    packagesTitle: "Pacchetti",
    ctaTitle: "Prenota la Tua Data",
    ctaDesc: "Disponibilità limitata per la stagione 2024/2025.",
    ctaBtn: "Chatta su WhatsApp",
    package1Title: 'Giorno della Sposa',
    package1Sub: 'L\'Esperienza Completa',
    package1Feat: ['Consulenza Visagismo', 'Prova Trucco e Parrucco', 'Massaggio Rilassante', 'Sala Esclusiva', 'Colazione/Pranzo'],
    package1Price: 'Da R$ 2.500',
    package2Title: 'Damigelle',
    package2Sub: 'Per chi ti accompagna',
    package2Feat: ['Acconciatura Professionale', 'Trucco Alta Tenuta', 'Servizio di Gruppo', 'Brindisi'],
    package2Price: 'Da R$ 450',
    detailsBtn: "Vedi Dettagli"
  }
};

const GALLERY_IMAGES = [
  "https://images.unsplash.com/photo-1606800052052-a08af7148866?q=80&w=500&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1595475207225-428b62bda831?q=80&w=500&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1522673607200-1645062cd958?q=80&w=500&auto=format&fit=crop"
];

export const WeddingServices: React.FC<WeddingServicesProps> = ({ language }) => {
  const t = TEXTS[language];

  const packages = [
    {
      title: t.package1Title,
      subtitle: t.package1Sub,
      features: t.package1Feat,
      price: t.package1Price
    },
    {
      title: t.package2Title,
      subtitle: t.package2Sub,
      features: t.package2Feat,
      price: t.package2Price
    }
  ];

  return (
    <div className="pb-24 pt-8 px-4">
      <div className="mb-8 animate-slide-up">
        <h1 className="text-4xl font-bold mb-2">{t.title}</h1>
        <p className="text-gray-400 text-lg">{t.subtitle}</p>
      </div>

      {/* Hero Visual */}
      <div className="relative w-full aspect-[4/5] bg-[#111] mb-12 overflow-hidden group rounded-sm shadow-2xl animate-blur-in">
        <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent z-10 opacity-70"></div>
        <div className="w-full h-full opacity-70 bg-[url('https://images.unsplash.com/photo-1549482199-bc1ca6f58502?q=80&w=1000&auto=format&fit=crop')] bg-cover bg-center grayscale animate-slow-zoom"></div>
        
        <div className="absolute bottom-8 left-6 right-6 z-20 animate-slide-up delay-300">
          <div className="text-[10px] uppercase tracking-[0.3em] text-white mb-2 font-bold">Beatriz Bittencourt</div>
          <h2 className="text-3xl font-light italic text-white leading-tight">
            {t.quote}
          </h2>
        </div>
      </div>

      {/* Visagismo Section */}
      <div className="mb-16 border-l-2 border-white pl-6 py-2 animate-slide-up delay-200">
        <h3 className="text-xl font-bold uppercase tracking-widest mb-4">{t.visagismoTitle}</h3>
        <p className="text-gray-400 text-sm leading-relaxed mb-4">
          {t.visagismoDesc}
        </p>
        <span className="text-xs uppercase border-b border-gray-600 pb-1 text-gray-300 shimmer-effect bg-clip-text text-transparent bg-white">{t.premiumIncluded}</span>
      </div>

      {/* Gallery Preview */}
      <div className="mb-12 animate-slide-up delay-300">
        <h3 className="text-lg font-bold uppercase tracking-widest mb-6">{t.galleryTitle}</h3>
        <div className="grid grid-cols-3 gap-2">
           {GALLERY_IMAGES.map((src, i) => (
             <div key={i} className="aspect-square bg-gray-800 overflow-hidden relative group">
                <img src={src} alt="Noiva" className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-700 hover:scale-110" />
                <div className="absolute inset-0 bg-black/20 group-hover:bg-transparent transition-colors"></div>
             </div>
           ))}
        </div>
      </div>

      {/* Packages */}
      <div className="space-y-6 mb-12 animate-slide-up delay-500">
        <h3 className="text-lg font-bold uppercase tracking-widest mb-2">{t.packagesTitle}</h3>
        {packages.map((pkg, idx) => (
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
              {t.detailsBtn}
            </button>
          </div>
        ))}
      </div>

      {/* CTA */}
      <div className="text-center bg-[#111] py-12 px-4 border border-gray-900 animate-slide-up delay-500">
        <h2 className="text-xl font-bold mb-2">{t.ctaTitle}</h2>
        <p className="text-gray-500 mb-8 text-sm max-w-xs mx-auto">{t.ctaDesc}</p>
        <a 
            href="https://wa.me/5511992279655?text=Ol%C3%A1%2C%20gostaria%20de%20um%20or%C3%A7amento%20para%20Dia%20da%20Noiva"
            target="_blank" 
            rel="noopener noreferrer"
            className="inline-block border border-white text-white font-bold uppercase py-4 px-8 text-xs tracking-[0.2em] hover:bg-white hover:text-black transition-colors"
        >
          {t.ctaBtn}
        </a>
      </div>
    </div>
  );
};