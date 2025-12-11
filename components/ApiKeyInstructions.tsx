import React from 'react';
import { Language } from '../types';

interface ApiKeyInstructionsProps {
  isOpen: boolean;
  onClose: () => void;
  language: Language;
}

const TEXTS: Record<Language, {
  title: string;
  close: string;
  openai: { title: string; steps: string[] };
  openrouter: { title: string; steps: string[] };
  silicon: { title: string; steps: string[] };
  visit: string;
}> = {
  en: {
    title: "How to Generate API Keys",
    close: "Close Guide",
    visit: "Go to",
    openai: {
      title: "OpenAI (DALL·E 3)",
      steps: [
        "Go to platform.openai.com and sign up.",
        "Add a payment method (Credit Card) in Billing settings.",
        "Navigate to 'API Keys' in the sidebar.",
        "Click 'Create new secret key'.",
        "Copy the key starting with 'sk-...' and paste it here."
      ]
    },
    openrouter: {
      title: "OpenRouter (Gemini, Llama)",
      steps: [
        "Go to openrouter.ai and sign in.",
        "Navigate to 'Keys' in the user menu.",
        "Click 'Create Key'.",
        "Name your key and create it.",
        "Copy the key starting with 'sk-or-...' and paste it here."
      ]
    },
    silicon: {
      title: "SiliconFlow (Flux, DeepSeek)",
      steps: [
        "Go to cloud.siliconflow.cn and register.",
        "Navigate to 'API Keys' in the dashboard.",
        "Create a new API Key.",
        "Copy the key and paste it here."
      ]
    }
  },
  pt: {
    title: "Como Gerar Chaves de API",
    close: "Fechar Guia",
    visit: "Ir para",
    openai: {
      title: "OpenAI (DALL·E 3)",
      steps: [
        "Acesse platform.openai.com e cadastre-se.",
        "Adicione um método de pagamento em Billing.",
        "Vá para 'API Keys' no menu lateral.",
        "Clique em 'Create new secret key'.",
        "Copie a chave começando com 'sk-...' e cole aqui."
      ]
    },
    openrouter: {
      title: "OpenRouter (Gemini, Llama)",
      steps: [
        "Acesse openrouter.ai e faça login.",
        "Vá para 'Keys' no menu do usuário.",
        "Clique em 'Create Key'.",
        "Nomeie sua chave e crie.",
        "Copie a chave começando com 'sk-or-...' e cole aqui."
      ]
    },
    silicon: {
      title: "SiliconFlow (Flux, DeepSeek)",
      steps: [
        "Acesse cloud.siliconflow.cn e registre-se.",
        "Vá para 'API Keys' no painel.",
        "Crie uma nova API Key.",
        "Copie a chave e cole aqui."
      ]
    }
  },
  es: {
    title: "Cómo Generar Claves API",
    close: "Cerrar Guía",
    visit: "Ir a",
    openai: {
      title: "OpenAI (DALL·E 3)",
      steps: [
        "Ve a platform.openai.com y regístrate.",
        "Añade un método de pago en Facturación.",
        "Ve a 'API Keys' en el menú lateral.",
        "Haz clic en 'Create new secret key'.",
        "Copia la clave que empieza por 'sk-...' y pégala aquí."
      ]
    },
    openrouter: {
      title: "OpenRouter (Gemini, Llama)",
      steps: [
        "Ve a openrouter.ai e inicia sesión.",
        "Ve a 'Keys' en el menú de usuario.",
        "Haz clic en 'Create Key'.",
        "Nombra tu clave y créala.",
        "Copia la clave que empieza por 'sk-or-...' y pégala aquí."
      ]
    },
    silicon: {
      title: "SiliconFlow (Flux, DeepSeek)",
      steps: [
        "Ve a cloud.siliconflow.cn y regístrate.",
        "Ve a 'API Keys' en el panel.",
        "Crea una nueva API Key.",
        "Copia la clave y pégala aquí."
      ]
    }
  },
  de: {
    title: "Wie man API-Schlüssel generiert",
    close: "Anleitung Schließen",
    visit: "Gehe zu",
    openai: {
      title: "OpenAI (DALL·E 3)",
      steps: [
        "Gehen Sie zu platform.openai.com und melden Sie sich an.",
        "Fügen Sie eine Zahlungsmethode hinzu.",
        "Navigieren Sie zu 'API Keys'.",
        "Klicken Sie auf 'Create new secret key'.",
        "Kopieren Sie den Schlüssel ('sk-...') und fügen Sie ihn hier ein."
      ]
    },
    openrouter: {
      title: "OpenRouter (Gemini, Llama)",
      steps: [
        "Gehen Sie zu openrouter.ai und melden Sie sich an.",
        "Navigieren Sie zu 'Keys'.",
        "Klicken Sie auf 'Create Key'.",
        "Erstellen Sie den Schlüssel.",
        "Kopieren Sie den Schlüssel ('sk-or-...') und fügen Sie ihn hier ein."
      ]
    },
    silicon: {
      title: "SiliconFlow (Flux, DeepSeek)",
      steps: [
        "Gehen Sie zu cloud.siliconflow.cn und registrieren Sie sich.",
        "Navigieren Sie zu 'API Keys'.",
        "Erstellen Sie einen neuen Schlüssel.",
        "Kopieren Sie den Schlüssel und fügen Sie ihn hier ein."
      ]
    }
  },
  fr: {
    title: "Comment Générer des Clés API",
    close: "Fermer le Guide",
    visit: "Aller à",
    openai: {
      title: "OpenAI (DALL·E 3)",
      steps: [
        "Allez sur platform.openai.com et inscrivez-vous.",
        "Ajoutez un mode de paiement dans Billing.",
        "Allez dans 'API Keys'.",
        "Cliquez sur 'Create new secret key'.",
        "Copiez la clé commençant par 'sk-...' et collez-la ici."
      ]
    },
    openrouter: {
      title: "OpenRouter (Gemini, Llama)",
      steps: [
        "Allez sur openrouter.ai et connectez-vous.",
        "Allez dans 'Keys' dans le menu.",
        "Cliquez sur 'Create Key'.",
        "Créez votre clé.",
        "Copiez la clé commençant par 'sk-or-...' et collez-la ici."
      ]
    },
    silicon: {
      title: "SiliconFlow (Flux, DeepSeek)",
      steps: [
        "Allez sur cloud.siliconflow.cn et inscrivez-vous.",
        "Allez dans 'API Keys'.",
        "Créez une nouvelle clé.",
        "Copiez la clé et collez-la ici."
      ]
    }
  },
  it: {
    title: "Come Generare Chiavi API",
    close: "Chiudi Guida",
    visit: "Vai a",
    openai: {
      title: "OpenAI (DALL·E 3)",
      steps: [
        "Vai su platform.openai.com e registrati.",
        "Aggiungi un metodo di pagamento.",
        "Vai su 'API Keys' nel menu.",
        "Clicca su 'Create new secret key'.",
        "Copia la chiave che inizia con 'sk-...' e incollala qui."
      ]
    },
    openrouter: {
      title: "OpenRouter (Gemini, Llama)",
      steps: [
        "Vai su openrouter.ai e accedi.",
        "Vai su 'Keys' nel menu utente.",
        "Clicca su 'Create Key'.",
        "Crea la tua chiave.",
        "Copia la chiave che inizia con 'sk-or-...' e incollala qui."
      ]
    },
    silicon: {
      title: "SiliconFlow (Flux, DeepSeek)",
      steps: [
        "Vai su cloud.siliconflow.cn e registrati.",
        "Vai su 'API Keys'.",
        "Crea una nuova chiave.",
        "Copia la chiave e incollala qui."
      ]
    }
  }
};

export const ApiKeyInstructions: React.FC<ApiKeyInstructionsProps> = ({ isOpen, onClose, language }) => {
  if (!isOpen) return null;
  const t = TEXTS[language];

  return (
    <div className="fixed inset-0 z-[70] bg-black/90 backdrop-blur-sm flex items-center justify-center p-4 animate-fade-in">
      <div className="bg-[#111] border border-gray-800 w-full max-w-lg max-h-[80vh] overflow-y-auto rounded-lg shadow-2xl relative flex flex-col animate-slide-up">
        {/* Header */}
        <div className="p-4 border-b border-gray-800 flex justify-between items-center sticky top-0 bg-[#111] z-10">
          <h2 className="text-lg font-bold uppercase tracking-widest text-white">{t.title}</h2>
          <button onClick={onClose} className="text-gray-400 hover:text-white text-2xl leading-none">&times;</button>
        </div>

        {/* Content */}
        <div className="p-6 space-y-8">
          <Section 
            title={t.openai.title} 
            steps={t.openai.steps} 
            link="https://platform.openai.com/api-keys" 
            linkText={`OpenAI Platform`}
            visitText={t.visit}
          />
          <Section 
            title={t.openrouter.title} 
            steps={t.openrouter.steps} 
            link="https://openrouter.ai/keys" 
            linkText={`OpenRouter`}
            visitText={t.visit}
          />
          <Section 
            title={t.silicon.title} 
            steps={t.silicon.steps} 
            link="https://cloud.siliconflow.cn/account/ak" 
            linkText={`SiliconFlow Cloud`}
            visitText={t.visit}
          />
        </div>

        <div className="p-4 border-t border-gray-800 sticky bottom-0 bg-[#111]">
          <button 
            onClick={onClose} 
            className="w-full bg-white text-black font-bold uppercase py-3 text-xs tracking-widest hover:bg-gray-200 transition-colors"
          >
            {t.close}
          </button>
        </div>
      </div>
    </div>
  );
};

const Section = ({ title, steps, link, linkText, visitText }: { title: string, steps: string[], link: string, linkText: string, visitText: string }) => (
  <div className="border border-gray-800 p-4 rounded bg-[#1a1a1a]">
    <h3 className="text-white font-bold mb-3 flex items-center gap-2">
      <div className="w-1.5 h-1.5 bg-blue-500 rounded-full"></div>
      {title}
    </h3>
    <ol className="list-decimal list-inside space-y-2 text-gray-400 text-xs mb-4 pl-1 leading-relaxed">
      {steps.map((step, i) => <li key={i}>{step}</li>)}
    </ol>
    <a 
      href={link} 
      target="_blank" 
      rel="noreferrer" 
      className="inline-flex items-center gap-1 text-[10px] font-bold uppercase text-blue-400 hover:text-white border border-blue-400/30 hover:border-white px-3 py-2 rounded transition-colors"
    >
      {visitText} {linkText} &rarr;
    </a>
  </div>
);