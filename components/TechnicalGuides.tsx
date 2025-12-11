import React, { useState } from 'react';
import { Language } from '../types';

interface TechnicalGuidesProps {
  language: Language;
}

const GUIDES = [
  { id: '1', title: 'Inoa', color: 'border-green-500' },
  { id: '2', title: 'Dia Light', color: 'border-blue-500' },
  { id: '3', title: 'Majirel', color: 'border-gray-500' },
  { id: '4', title: 'Dia color', color: 'border-pink-300' },
  { id: '5', title: 'Blond studio', color: 'border-teal-400' },
];

const TEXTS: Record<Language, {
  title: string;
  neonTitle: string;
  neonDesc: string;
  testBtn: string;
  checking: string;
  missingTitle: string;
  missingDesc: string;
  buyBtn: string;
  whatsapp: string;
}> = {
  en: {
    title: "Technical guides.",
    neonTitle: "Neon Database Integration",
    neonDesc: "Test the connection to the serverless Postgres database deployed on Vercel.",
    testBtn: "Test Connection",
    checking: "Checking...",
    missingTitle: "Missing products?",
    missingDesc: "Find them all.",
    buyBtn: "Buy Online",
    whatsapp: "Order via WhatsApp: (11) 99227-9655"
  },
  pt: {
    title: "Guias Técnicos.",
    neonTitle: "Integração Neon Database",
    neonDesc: "Teste a conexão com o banco de dados Postgres serverless.",
    testBtn: "Testar Conexão",
    checking: "Verificando...",
    missingTitle: "Produtos faltando?",
    missingDesc: "Encontre todos eles.",
    buyBtn: "Comprar Online",
    whatsapp: "Peça via WhatsApp: (11) 99227-9655"
  },
  es: {
    title: "Guías Técnicas.",
    neonTitle: "Integración Neon Database",
    neonDesc: "Prueba la conexión a la base de datos Postgres sin servidor.",
    testBtn: "Probar Conexión",
    checking: "Comprobando...",
    missingTitle: "¿Faltan productos?",
    missingDesc: "Encuéntralos todos.",
    buyBtn: "Comprar en Línea",
    whatsapp: "Pedir por WhatsApp: (11) 99227-9655"
  },
  de: {
    title: "Technische Anleitungen.",
    neonTitle: "Neon Datenbank Integration",
    neonDesc: "Testen Sie die Verbindung zur serverlosen Postgres-Datenbank.",
    testBtn: "Verbindung Testen",
    checking: "Prüfung...",
    missingTitle: "Fehlende Produkte?",
    missingDesc: "Finden Sie alle.",
    buyBtn: "Online Kaufen",
    whatsapp: "Bestellung per WhatsApp: (11) 99227-9655"
  },
  fr: {
    title: "Guides Techniques.",
    neonTitle: "Intégration Base de Données Neon",
    neonDesc: "Testez la connexion à la base de données Postgres sans serveur.",
    testBtn: "Tester la Connexion",
    checking: "Vérification...",
    missingTitle: "Produits manquants?",
    missingDesc: "Retrouvez-les tous.",
    buyBtn: "Acheter en Ligne",
    whatsapp: "Commander via WhatsApp: (11) 99227-9655"
  },
  it: {
    title: "Guide Tecniche.",
    neonTitle: "Integrazione Database Neon",
    neonDesc: "Testa la connessione al database Postgres serverless.",
    testBtn: "Test Connessione",
    checking: "Verifica...",
    missingTitle: "Prodotti mancanti?",
    missingDesc: "Trovali tutti.",
    buyBtn: "Acquista Online",
    whatsapp: "Ordina via WhatsApp: (11) 99227-9655"
  }
};

export const TechnicalGuides: React.FC<TechnicalGuidesProps> = ({ language }) => {
    const t = TEXTS[language];
    const [dbStatus, setDbStatus] = useState<string | null>(null);
    const [isCheckingDb, setIsCheckingDb] = useState(false);

    const checkDbConnection = async () => {
        setIsCheckingDb(true);
        setDbStatus(language === 'pt' ? 'Conectando...' : 'Connecting to database...');
        try {
            const response = await fetch('/api/db-status');
            const data = await response.json();
            if (response.ok) {
                const date = new Date(data.dbTime).toLocaleString();
                setDbStatus(`Connection successful.\nDatabase time: ${date}`);
            } else {
                throw new Error(data.error || 'An unknown error occurred.');
            }
        } catch (error: any) {
            setDbStatus(`Connection failed:\n${error.message}`);
        }
        setIsCheckingDb(false);
    };

  return (
    <div className="pb-24 pt-8 px-4 animate-fade-in">
      <div className="mb-12">
        <h1 className="text-4xl font-bold mb-8">{t.title}</h1>
        
        <div className="grid grid-cols-2 gap-4">
            {GUIDES.map((guide) => (
                <div 
                    key={guide.id} 
                    className={`bg-[#1a1a1a] h-32 flex items-center justify-center relative hover:bg-[#252525] transition-colors cursor-pointer group`}
                >
                    <span className="text-white text-lg font-medium">{guide.title}</span>
                    <div className={`absolute bottom-0 left-0 w-full h-1 ${guide.color.replace('border', 'bg')} transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left`}></div>
                    <div className={`absolute bottom-0 left-0 w-full h-1 ${guide.color.replace('border', 'bg')} opacity-40`}></div>
                </div>
            ))}
        </div>
      </div>
      
      <div className="mb-12">
        <h2 className="text-2xl font-bold mb-2">{t.neonTitle}</h2>
        <p className="text-gray-400 mb-6">{t.neonDesc}</p>
        <button
            onClick={checkDbConnection}
            disabled={isCheckingDb}
            className="border-2 border-white text-white font-bold uppercase py-3 px-8 text-sm hover:bg-white hover:text-black transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
        >
            {isCheckingDb ? t.checking : t.testBtn}
        </button>
        {dbStatus && (
            <pre className="mt-4 p-4 bg-[#1a1a1a] border border-gray-800 text-xs text-white whitespace-pre-wrap font-mono rounded-sm">
                {dbStatus}
            </pre>
        )}
      </div>

      <div className="mb-12">
        <h2 className="text-2xl font-bold mb-2">{t.missingTitle}</h2>
        <p className="text-gray-400 mb-6">{t.missingDesc}</p>
        <button className="border-2 border-white text-white font-bold uppercase py-3 px-8 text-sm hover:bg-white hover:text-black transition-colors">
          {t.buyBtn}
        </button>
        <a 
            href="https://wa.me/5511992279655?text=Gostaria%20de%20agendar,%20vim%20atrav%C3%A9s%20do%20site"
            target="_blank" 
            rel="noopener noreferrer"
            className="block mt-6 text-[10px] text-gray-500 uppercase tracking-[0.2em] hover:text-white transition-colors"
        >
            {t.whatsapp}
        </a>
      </div>

      <div className="flex gap-4 overflow-x-auto pb-4 no-scrollbar">
          {[1, 2, 3].map((i) => (
             <div key={i} className="flex-shrink-0 w-32 flex flex-col items-center">
                 <div className="h-48 w-16 bg-gradient-to-b from-gray-800 to-black border border-gray-700 rounded-t-lg relative flex flex-col items-center justify-end pb-4">
                     <div className="absolute -top-4 w-10 h-6 bg-black border border-gray-700"></div>
                     <div className="text-[8px] text-center text-white font-mono leading-tight uppercase -rotate-90 whitespace-nowrap mb-8">
                        L'Oreal Professionnel
                     </div>
                     <div className="text-xs text-white font-bold -rotate-90 whitespace-nowrap">
                        {i === 1 ? 'INOA' : i === 2 ? 'Dia Light' : 'Majirel'}
                     </div>
                 </div>
             </div> 
          ))}
      </div>
    </div>
  );
};