import React, { useState, useEffect } from 'react';
import { Language, Tab } from '../types';
import { logger } from '../services/logger';

interface TechnicalGuidesProps {
  language: Language;
  onNavigate?: (tab: Tab) => void;
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
  openaiTitle: string;
  openaiDesc: string;
  openRouterTitle: string;
  openRouterDesc: string;
  siliconFlowTitle: string;
  siliconFlowDesc: string;
  apiKeyPlaceholder: string;
  openRouterPlaceholder: string;
  siliconFlowPlaceholder: string;
  saveKey: string;
  clearKey: string;
  keySaved: string;
  keyCleared: string;
  logsTitle: string;
  logsDesc: string;
  logsBtn: string;
  adminNote: string;
  getKey: string;
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
    whatsapp: "Order via WhatsApp: (11) 99227-9655",
    openaiTitle: "OpenAI DALL·E 2 Integration",
    openaiDesc: "Save your OpenAI API key to generate high-quality final images.",
    openRouterTitle: "OpenRouter Integration",
    openRouterDesc: "Use OpenRouter to access various models (Gemini, Llama, Flux) avoiding direct quota limits.",
    siliconFlowTitle: "SiliconFlow Integration",
    siliconFlowDesc: "High-performance inference for DeepSeek, Qwen, and Flux models.",
    apiKeyPlaceholder: "Enter your OpenAI API Key...",
    openRouterPlaceholder: "Enter your OpenRouter API Key...",
    siliconFlowPlaceholder: "Enter your SiliconFlow API Key...",
    saveKey: "Save Key",
    clearKey: "Clear Key",
    keySaved: "API Key saved!",
    keyCleared: "API Key cleared.",
    logsTitle: "System Logs",
    logsDesc: "View client-side application logs, errors, and API activity.",
    logsBtn: "Open Logs Dashboard",
    adminNote: "Admin Tip: Add 'ADMIN_OPENAI_KEY', 'ADMIN_OPENROUTER_KEY', or 'ADMIN_SILICONFLOW_KEY' to Vercel Env Vars.",
    getKey: "Get your key here",
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
    whatsapp: "Peça via WhatsApp: (11) 99227-9655",
    openaiTitle: "Integração OpenAI DALL·E 2",
    openaiDesc: "Salve sua chave de API da OpenAI para gerar imagens finais de alta qualidade.",
    openRouterTitle: "Integração OpenRouter",
    openRouterDesc: "Use OpenRouter para acessar vários modelos (Gemini, Llama, Flux) evitando limites de cota.",
    siliconFlowTitle: "Integração SiliconFlow",
    siliconFlowDesc: "Inferência de alta performance para modelos DeepSeek, Qwen e Flux.",
    apiKeyPlaceholder: "Insira sua chave de API da OpenAI...",
    openRouterPlaceholder: "Insira sua chave OpenRouter...",
    siliconFlowPlaceholder: "Insira sua chave SiliconFlow...",
    saveKey: "Salvar Chave",
    clearKey: "Limpar Chave",
    keySaved: "Chave de API salva!",
    keyCleared: "Chave de API removida.",
    logsTitle: "Logs do Sistema",
    logsDesc: "Visualize logs da aplicação, erros e atividade da API.",
    logsBtn: "Abrir Painel de Logs",
    adminNote: "Dica Admin: Adicione chaves no Vercel para acesso global.",
    getKey: "Obtenha sua chave aqui",
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
    whatsapp: "Pedir por WhatsApp: (11) 99227-9655",
    openaiTitle: "Integración con OpenAI DALL·E 2",
    openaiDesc: "Guarda tu clave de API de OpenAI para generar imágenes finales de alta calidad.",
    openRouterTitle: "Integración OpenRouter",
    openRouterDesc: "Usa OpenRouter para acceder a varios modelos (Gemini, Llama, Flux) evitando límites de cuota.",
    siliconFlowTitle: "Integración SiliconFlow",
    siliconFlowDesc: "Inferencia de alto rendimiento para modelos DeepSeek, Qwen y Flux.",
    apiKeyPlaceholder: "Introduce tu clave de API de OpenAI...",
    openRouterPlaceholder: "Introduce tu clave de OpenRouter...",
    siliconFlowPlaceholder: "Introduce tu clave de SiliconFlow...",
    saveKey: "Guardar Clave",
    clearKey: "Borrar Clave",
    keySaved: "¡Clave de API guardada!",
    keyCleared: "Clave de API eliminada.",
    logsTitle: "Registros del Sistema",
    logsDesc: "Ver registros de la aplicación, errores y actividad de API.",
    logsBtn: "Abrir Panel de Registros",
    adminNote: "Tip Admin: Añade chaves en Vercel para acceso global.",
    getKey: "Obtén tu clave aquí",
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
    whatsapp: "Bestellung per WhatsApp: (11) 99227-9655",
    openaiTitle: "OpenAI DALL·E 2 Integration",
    openaiDesc: "Speichern Sie Ihren OpenAI API-Schlüssel, um hochwertige endgültige Bilder zu generieren.",
    openRouterTitle: "OpenRouter Integration",
    openRouterDesc: "Nutzen Sie OpenRouter für verschiedene Modelle (Gemini, Llama, Flux) um Quotenlimits zu umgehen.",
    siliconFlowTitle: "SiliconFlow Integration",
    siliconFlowDesc: "Hochleistungsinferenz für DeepSeek, Qwen und Flux Modelle.",
    apiKeyPlaceholder: "Geben Sie Ihren OpenAI API-Schlüssel ein...",
    openRouterPlaceholder: "Geben Sie Ihren OpenRouter Schlüssel ein...",
    siliconFlowPlaceholder: "Geben Sie Ihren SiliconFlow Schlüssel ein...",
    saveKey: "Schlüssel Speichern",
    clearKey: "Schlüssel Löschen",
    keySaved: "API-Schlüssel gespeichert!",
    keyCleared: "API-Schlüssel gelöscht.",
    logsTitle: "Systemprotokolle",
    logsDesc: "Anwendungsprotokolle, Fehler und API-Aktivitäten anzeigen.",
    logsBtn: "Protokolle Öffnen",
    adminNote: "Admin-Tipp: Fügen Sie Schlüssel in Vercel hinzu.",
    getKey: "Holen Sie sich Ihren Schlüssel hier",
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
    whatsapp: "Commander via WhatsApp: (11) 99227-9655",
    openaiTitle: "Intégration OpenAI DALL·E 2",
    openaiDesc: "Enregistrez votre clé API OpenAI pour générer des images finales de haute qualité.",
    openRouterTitle: "Intégration OpenRouter",
    openRouterDesc: "Utilisez OpenRouter pour accéder à divers modèles (Gemini, Llama, Flux) en évitant les quotas.",
    siliconFlowTitle: "Intégration SiliconFlow",
    siliconFlowDesc: "Inférence haute performance pour les modèles DeepSeek, Qwen et Flux.",
    apiKeyPlaceholder: "Entrez votre clé API OpenAI...",
    openRouterPlaceholder: "Entrez votre clé OpenRouter...",
    siliconFlowPlaceholder: "Entrez votre clé SiliconFlow...",
    saveKey: "Enregistrer la Clé",
    clearKey: "Effacer la Clé",
    keySaved: "Clé API enregistrée !",
    keyCleared: "Clé API effacée.",
    logsTitle: "Journaux Système",
    logsDesc: "Voir les journaux d'application, erreurs et activité API.",
    logsBtn: "Ouvrir le Tableau de Bord",
    adminNote: "Astuce Admin : Ajoutez des clés dans Vercel.",
    getKey: "Obtenez votre clé ici",
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
    whatsapp: "Ordina via WhatsApp: (11) 99227-9655",
    openaiTitle: "Integrazione OpenAI DALL·E 2",
    openaiDesc: "Salva la tua chiave API OpenAI per generare immagini finali di alta qualità.",
    openRouterTitle: "Integrazione OpenRouter",
    openRouterDesc: "Usa OpenRouter per accedere a vari modelli (Gemini, Llama, Flux) evitando limiti di quota.",
    siliconFlowTitle: "Integrazione SiliconFlow",
    siliconFlowDesc: "Inferenza ad alte prestazioni per modelli DeepSeek, Qwen e Flux.",
    apiKeyPlaceholder: "Inserisci la tua chiave API OpenAI...",
    openRouterPlaceholder: "Inserisci la tua chiave OpenRouter...",
    siliconFlowPlaceholder: "Inserisci la tua chiave SiliconFlow...",
    saveKey: "Salva Chiave",
    clearKey: "Cancella Chiave",
    keySaved: "Chiave API salvata!",
    keyCleared: "Chiave API cancellata.",
    logsTitle: "Log di Sistema",
    logsDesc: "Visualizza log applicazione, errori e attività API.",
    logsBtn: "Apri Dashboard Log",
    adminNote: "Suggerimento Admin: Aggiungi le chiavi su Vercel.",
    getKey: "Ottieni la tua chiave qui",
  }
};

export const TechnicalGuides: React.FC<TechnicalGuidesProps> = ({ language, onNavigate }) => {
    const t = TEXTS[language];
    const [dbStatus, setDbStatus] = useState<string | null>(null);
    const [isCheckingDb, setIsCheckingDb] = useState(false);
    
    // API Keys State
    const [openAIKey, setOpenAIKey] = useState('');
    const [openAIStatus, setOpenAIStatus] = useState('');
    const [openRouterKey, setOpenRouterKey] = useState('');
    const [openRouterStatus, setOpenRouterStatus] = useState('');
    const [siliconFlowKey, setSiliconFlowKey] = useState('');
    const [siliconFlowStatus, setSiliconFlowStatus] = useState('');

    useEffect(() => {
        const savedOpenAI = localStorage.getItem('openai_api_key');
        if (savedOpenAI) setOpenAIKey(savedOpenAI);

        const savedOpenRouter = localStorage.getItem('openrouter_api_key');
        if (savedOpenRouter) setOpenRouterKey(savedOpenRouter);

        const savedSiliconFlow = localStorage.getItem('siliconflow_api_key');
        if (savedSiliconFlow) setSiliconFlowKey(savedSiliconFlow);
    }, []);

    // OpenAI Handlers
    const handleSaveOpenAI = () => {
        localStorage.setItem('openai_api_key', openAIKey);
        setOpenAIStatus(t.keySaved);
        logger.success('auth', 'User updated OpenAI API Key manually.');
        setTimeout(() => setOpenAIStatus(''), 2000);
    };

    const handleClearOpenAI = () => {
        localStorage.removeItem('openai_api_key');
        setOpenAIKey('');
        setOpenAIStatus(t.keyCleared);
        logger.warn('auth', 'User cleared OpenAI API Key.');
        setTimeout(() => setOpenAIStatus(''), 2000);
    };

    // OpenRouter Handlers
    const handleSaveOpenRouter = () => {
        localStorage.setItem('openrouter_api_key', openRouterKey);
        setOpenRouterStatus(t.keySaved);
        logger.success('auth', 'User updated OpenRouter API Key manually.');
        setTimeout(() => setOpenRouterStatus(''), 2000);
    };

    const handleClearOpenRouter = () => {
        localStorage.removeItem('openrouter_api_key');
        setOpenRouterKey('');
        setOpenRouterStatus(t.keyCleared);
        logger.warn('auth', 'User cleared OpenRouter API Key.');
        setTimeout(() => setOpenRouterStatus(''), 2000);
    };

    // SiliconFlow Handlers
    const handleSaveSiliconFlow = () => {
        localStorage.setItem('siliconflow_api_key', siliconFlowKey);
        setSiliconFlowStatus(t.keySaved);
        logger.success('auth', 'User updated SiliconFlow API Key manually.');
        setTimeout(() => setSiliconFlowStatus(''), 2000);
    };

    const handleClearSiliconFlow = () => {
        localStorage.removeItem('siliconflow_api_key');
        setSiliconFlowKey('');
        setSiliconFlowStatus(t.keyCleared);
        logger.warn('auth', 'User cleared SiliconFlow API Key.');
        setTimeout(() => setSiliconFlowStatus(''), 2000);
    };

    const checkDbConnection = async () => {
        setIsCheckingDb(true);
        setDbStatus(t.checking);
        logger.info('system', 'Checking Database Connection...');
        try {
            const response = await fetch('/api/db-status');
            const data = await response.json();
            if (response.ok) {
                const date = new Date(data.dbTime).toLocaleString();
                setDbStatus(`Connection successful.\nDatabase time: ${date}`);
                logger.success('system', 'Database connection successful', data);
            } else {
                throw new Error(data.error || 'An unknown error occurred.');
            }
        } catch (error: any) {
            setDbStatus(`Connection failed:\n${error.message}`);
            logger.error('system', 'Database connection failed', error.message);
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
        <h2 className="text-2xl font-bold mb-2">{t.logsTitle}</h2>
        <p className="text-gray-400 mb-6 text-sm">{t.logsDesc}</p>
        <button
            onClick={() => onNavigate && onNavigate(Tab.LOGS)}
            className="w-full bg-[#1a1a1a] border border-gray-800 text-white font-bold uppercase py-4 px-8 text-xs tracking-wider hover:bg-gray-800 hover:border-white transition-colors"
        >
            {t.logsBtn}
        </button>
      </div>
      
      {/* OpenAI Section */}
      <div className="mb-8">
        <h2 className="text-2xl font-bold mb-2">{t.openaiTitle}</h2>
        <p className="text-gray-400 mb-2 text-sm">{t.openaiDesc}</p>
        <a 
          href="https://platform.openai.com/api-keys" 
          target="_blank" 
          rel="noopener noreferrer" 
          className="inline-block text-[10px] text-gray-500 hover:text-white underline mb-4 transition-colors"
        >
          {t.getKey} &rarr;
        </a>
        <div className="flex flex-col gap-2">
            <input 
                type="password"
                value={openAIKey}
                onChange={(e) => setOpenAIKey(e.target.value)}
                placeholder={t.apiKeyPlaceholder}
                className="bg-[#1a1a1a] border border-gray-800 text-white p-3 text-sm focus:outline-none focus:border-white transition-colors w-full"
            />
            <div className="flex gap-2">
                <button
                    onClick={handleSaveOpenAI}
                    className="flex-1 bg-white text-black font-bold uppercase py-3 px-6 text-xs tracking-wider hover:bg-gray-200 transition-colors"
                >
                    {t.saveKey}
                </button>
                <button
                    onClick={handleClearOpenAI}
                    className="flex-1 border border-gray-800 text-gray-400 font-bold uppercase py-3 px-6 text-xs tracking-wider hover:bg-gray-800 hover:text-white transition-colors"
                >
                    {t.clearKey}
                </button>
            </div>
            {openAIStatus && <p className="text-green-500 text-xs mt-2">{openAIStatus}</p>}
        </div>
      </div>

      {/* OpenRouter Section */}
      <div className="mb-8 border-t border-gray-800 pt-8">
        <h2 className="text-2xl font-bold mb-2">{t.openRouterTitle}</h2>
        <p className="text-gray-400 mb-2 text-sm">{t.openRouterDesc}</p>
        <a 
          href="https://openrouter.ai/keys" 
          target="_blank" 
          rel="noopener noreferrer" 
          className="inline-block text-[10px] text-gray-500 hover:text-white underline mb-4 transition-colors"
        >
          {t.getKey} &rarr;
        </a>
        <div className="flex flex-col gap-2">
            <input 
                type="password"
                value={openRouterKey}
                onChange={(e) => setOpenRouterKey(e.target.value)}
                placeholder={t.openRouterPlaceholder}
                className="bg-[#1a1a1a] border border-gray-800 text-white p-3 text-sm focus:outline-none focus:border-white transition-colors w-full"
            />
            <div className="flex gap-2">
                <button
                    onClick={handleSaveOpenRouter}
                    className="flex-1 bg-white text-black font-bold uppercase py-3 px-6 text-xs tracking-wider hover:bg-gray-200 transition-colors"
                >
                    {t.saveKey}
                </button>
                <button
                    onClick={handleClearOpenRouter}
                    className="flex-1 border border-gray-800 text-gray-400 font-bold uppercase py-3 px-6 text-xs tracking-wider hover:bg-gray-800 hover:text-white transition-colors"
                >
                    {t.clearKey}
                </button>
            </div>
            {openRouterStatus && <p className="text-green-500 text-xs mt-2">{openRouterStatus}</p>}
        </div>
      </div>

      {/* SiliconFlow Section */}
      <div className="mb-12 border-t border-gray-800 pt-8">
        <h2 className="text-2xl font-bold mb-2">{t.siliconFlowTitle}</h2>
        <p className="text-gray-400 mb-2 text-sm">{t.siliconFlowDesc}</p>
        <a 
          href="https://cloud.siliconflow.cn/account/ak" 
          target="_blank" 
          rel="noopener noreferrer" 
          className="inline-block text-[10px] text-gray-500 hover:text-white underline mb-4 transition-colors"
        >
          {t.getKey} &rarr;
        </a>
        <div className="flex flex-col gap-2">
            <input 
                type="password"
                value={siliconFlowKey}
                onChange={(e) => setSiliconFlowKey(e.target.value)}
                placeholder={t.siliconFlowPlaceholder}
                className="bg-[#1a1a1a] border border-gray-800 text-white p-3 text-sm focus:outline-none focus:border-white transition-colors w-full"
            />
            <div className="flex gap-2">
                <button
                    onClick={handleSaveSiliconFlow}
                    className="flex-1 bg-white text-black font-bold uppercase py-3 px-6 text-xs tracking-wider hover:bg-gray-200 transition-colors"
                >
                    {t.saveKey}
                </button>
                <button
                    onClick={handleClearSiliconFlow}
                    className="flex-1 border border-gray-800 text-gray-400 font-bold uppercase py-3 px-6 text-xs tracking-wider hover:bg-gray-800 hover:text-white transition-colors"
                >
                    {t.clearKey}
                </button>
            </div>
            {siliconFlowStatus && <p className="text-green-500 text-xs mt-2">{siliconFlowStatus}</p>}
            <p className="text-gray-600 text-[10px] mt-2 italic">{t.adminNote}</p>
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