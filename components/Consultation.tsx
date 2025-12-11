import React, { useState, useRef, useEffect } from 'react';
import { ChatMessage, Language } from '../types';
import { Logo } from './Logo';
import { PreviewGallery } from './PreviewGallery';
import { logger } from '../services/logger';

interface ConsultationProps {
  language: Language;
}

const TEXTS: Record<Language, {
  welcome: string;
  title: string;
  subtitle: string;
  description: string;
  videoBtn: string;
  textBtn: string;
  bookBtn: string;
  consultationTitle: string;
  newScan: string;
  exit: string;
  send: string;
  placeholder: string;
  analyzing: string;
  analyzeCommand: string;
  errorChat: string;
  errorAnalysis: string;
  faceShape: string;
  skinTone: string;
  palette: string;
  expert: string;
  projection: string;
  alignFace: string;
  regenerate: string;
  variations: string;
  lighter: string;
  darker: string;
  shorter: string;
  longer: string;
  refine: string;
  finalize: string;
  finalizeStandard: string;
  finalImage: string;
  generatingFinal: string;
  errorFinal: string;
  noApiKey: string;
}> = {
  en: {
    welcome: "Welcome to Beatriz Bittencourt Professional. I am your Visagismo expert. Start a video analysis to find your perfect match, or chat with me directly.",
    title: "Professional Visagismo",
    subtitle: "powered by AI analysis.",
    description: "Experience a personalized diagnosis to find your perfect shade and technical routine based on your unique features.",
    videoBtn: "Video Analysis",
    textBtn: "Text Consultation",
    bookBtn: "Book via WhatsApp",
    consultationTitle: "Visagismo Consultation",
    newScan: "New Scan",
    exit: "Exit",
    send: "Send",
    placeholder: "Type your response...",
    analyzing: "Analyzing facial features...",
    analyzeCommand: "Analyze my look.",
    errorChat: "Sorry, the consultation service is currently unavailable.",
    errorAnalysis: "I encountered an error analyzing your image. Please try again.",
    faceShape: "Face Shape",
    skinTone: "Skin Tone",
    palette: "Best Color Palette",
    expert: "Virtual Expert",
    projection: "AI Projection",
    alignFace: "ALIGN YOUR FACE",
    regenerate: "Regenerate",
    variations: "Variations",
    lighter: "Lighter",
    darker: "Darker",
    shorter: "Shorter",
    longer: "Longer",
    refine: "Refine Look",
    finalize: "Finalize (DALL·E 2)",
    finalizeStandard: "Finalize (Standard)",
    finalImage: "Final Image",
    generatingFinal: "Generating final image...",
    errorFinal: "Failed to generate the final image.",
    noApiKey: "To use DALL·E 2, please save your OpenAI API key in the 'Guides' tab.",
  },
  pt: {
    welcome: "Bem-vindo à Beatriz Bittencourt Professional. Sou sua especialista em Visagismo. Comece uma análise de vídeo para encontrar sua combinação perfeita ou converse comigo diretamente.",
    title: "Visagismo Profissional",
    subtitle: "powered by AI analysis.",
    description: "Experimente um diagnóstico personalizado para encontrar sua tonalidade perfeita e rotina técnica com base em seus traços únicos.",
    videoBtn: "Análise de Vídeo",
    textBtn: "Consultoria por Texto",
    bookBtn: "Agendar via WhatsApp",
    consultationTitle: "Consultoria Visagismo",
    newScan: "Nova Análise",
    exit: "Sair",
    send: "Enviar",
    placeholder: "Digite sua resposta...",
    analyzing: "Analisando traços faciais...",
    analyzeCommand: "Analise meu visual.",
    errorChat: "Desculpe, o serviço de consultoria está temporariamente indisponível.",
    errorAnalysis: "Encontrei um erro ao analisar sua imagem. Por favor, tente novamente.",
    faceShape: "Formato do Rosto",
    skinTone: "Tom de Pele",
    palette: "Melhor Paleta de Cores",
    expert: "Especialista Virtual",
    projection: "Projeção IA",
    alignFace: "ALINHE SEU ROSTO",
    regenerate: "Regenerar",
    variations: "Variações",
    lighter: "Mais Claro",
    darker: "Mais Escuro",
    shorter: "Mais Curto",
    longer: "Mais Longo",
    refine: "Refinar Visual",
    finalize: "Finalizar (DALL·E 2)",
    finalizeStandard: "Finalizar (Padrão)",
    finalImage: "Imagem Final",
    generatingFinal: "Gerando imagem final...",
    errorFinal: "Falha ao gerar a imagem final.",
    noApiKey: "Para usar DALL·E 2, salve sua chave de API na aba 'Guias'.",
  },
  es: {
    welcome: "Bienvenido a Beatriz Bittencourt Professional. Soy tu experta en Visagismo. Inicia un análisis de video para encontrar tu tono perfecto o chatea conmigo.",
    title: "Visagismo Profesional",
    subtitle: "impulsado por análisis IA.",
    description: "Experimenta un diagnóstico personalizado para encontrar tu tono perfecto basado en tus rasgos únicos.",
    videoBtn: "Análisis de Video",
    textBtn: "Consulta de Texto",
    bookBtn: "Reservar vía WhatsApp",
    consultationTitle: "Consulta de Visagismo",
    newScan: "Nuevo Escaneo",
    exit: "Salir",
    send: "Enviar",
    placeholder: "Escribe tu respuesta...",
    analyzing: "Analizando rasgos faciales...",
    analyzeCommand: "Analiza mi imagen.",
    errorChat: "Lo siento, el servicio de consulta no está disponible.",
    errorAnalysis: "Error al analizar tu imagen. Intenta de nuevo.",
    faceShape: "Forma del Rostro",
    skinTone: "Tono de Piel",
    palette: "Mejor Paleta de Colores",
    expert: "Experto Virtual",
    projection: "Proyección IA",
    alignFace: "ALINEA TU ROSTRO",
    regenerate: "Regenerar",
    variations: "Variaciones",
    lighter: "Más Claro",
    darker: "Más Oscuro",
    shorter: "Más Corto",
    longer: "Más Largo",
    refine: "Refinar Look",
    finalize: "Finalizar (DALL·E 2)",
    finalizeStandard: "Finalizar (Estándar)",
    finalImage: "Imagen Final",
    generatingFinal: "Generando imagen final...",
    errorFinal: "Error al generar la imagen final.",
    noApiKey: "Para usar DALL·E 2, guarda tu clave de API en la pestaña 'Guías'.",
  },
  de: {
    welcome: "Willkommen bei Beatriz Bittencourt Professional. Ich bin Ihr Visagismus-Experte. Starten Sie eine Videoanalyse oder chatten Sie direkt mit mir.",
    title: "Professioneller Visagismus",
    subtitle: "powered by AI analysis.",
    description: "Erleben Sie eine personalisierte Diagnose, um Ihren perfekten Farbton basierend auf Ihren einzigartigen Merkmalen zu finden.",
    videoBtn: "Videoanalyse",
    textBtn: "Textberatung",
    bookBtn: "Buchen via WhatsApp",
    consultationTitle: "Visagismus Beratung",
    newScan: "Neuer Scan",
    exit: "Beenden",
    send: "Senden",
    placeholder: "Geben Sie Ihre Antwort ein...",
    analyzing: "Gesichtszüge analysieren...",
    analyzeCommand: "Analysiere meinen Look.",
    errorChat: "Entschuldigung, der Beratungsdienst ist derzeit nicht verfügbar.",
    errorAnalysis: "Fehler bei der Bildanalyse. Bitte versuchen Sie es erneut.",
    faceShape: "Gesichtsform",
    skinTone: "Hautton",
    palette: "Beste Farbpalette",
    expert: "Virtueller Experte",
    projection: "KI-Projektion",
    alignFace: "GESICHT AUSRICHTEN",
    regenerate: "Regenerieren",
    variations: "Variationen",
    lighter: "Heller",
    darker: "Dunkler",
    shorter: "Kürzer",
    longer: "Länger",
    refine: "Verfeinern",
    finalize: "Fertigstellen (DALL·E 2)",
    finalizeStandard: "Fertigstellen (Standard)",
    finalImage: "Endgültiges Bild",
    generatingFinal: "Endgültiges Bild wird generiert...",
    errorFinal: "Fehler beim Generieren des endgültigen Bildes.",
    noApiKey: "Für DALL·E 2 speichern Sie bitte Ihren API-Schlüssel im Reiter 'Guides'.",
  },
  fr: {
    welcome: "Bienvenue chez Beatriz Bittencourt Professional. Je suis votre expert en Visagisme. Commencez une analyse vidéo ou discutez avec moi.",
    title: "Visagisme Professionnel",
    subtitle: "propulsé par l'IA.",
    description: "Vivez un diagnostic personnalisé pour trouver votre nuance parfaite basée sur vos traits uniques.",
    videoBtn: "Analyse Vidéo",
    textBtn: "Consultation Texte",
    bookBtn: "Réserver via WhatsApp",
    consultationTitle: "Consultation Visagisme",
    newScan: "Nouveau Scan",
    exit: "Quitter",
    send: "Envoyer",
    placeholder: "Tapez votre réponse...",
    analyzing: "Analyse des traits...",
    analyzeCommand: "Analysez mon look.",
    errorChat: "Désolé, le service de consultation est indisponible.",
    errorAnalysis: "Erreur lors de l'analyse. Veuillez réessayer.",
    faceShape: "Forme du Visage",
    skinTone: "Teint de Peau",
    palette: "Meilleure Palette",
    expert: "Expert Virtuel",
    projection: "Projection IA",
    alignFace: "ALIGNEZ VOTRE VISAGE",
    regenerate: "Régénérer",
    variations: "Variations",
    lighter: "Plus Clair",
    darker: "Plus Foncé",
    shorter: "Plus Court",
    longer: "Plus Long",
    refine: "Affiner",
    finalize: "Finaliser (DALL·E 2)",
    finalizeStandard: "Finaliser (Standard)",
    finalImage: "Image Finale",
    generatingFinal: "Génération de l'image finale...",
    errorFinal: "Échec de la génération de l'image finale.",
    noApiKey: "Pour utiliser DALL·E 2, enregistrez votre clé API dans l'onglet 'Guides'.",
  },
  it: {
    welcome: "Benvenuto in Beatriz Bittencourt Professional. Sono il tuo esperto di Visagismo. Inizia un'analisi video o chatta con me.",
    title: "Visagismo Professionale",
    subtitle: "powered by AI analysis.",
    description: "Prova una diagnosi personalizzata per trovare la tua tonalità perfetta basata sui tuoi tratti unici.",
    videoBtn: "Analisi Video",
    textBtn: "Consultazione Testuale",
    bookBtn: "Prenota via WhatsApp",
    consultationTitle: "Consultazione Visagismo",
    newScan: "Nuova Scansione",
    exit: "Esci",
    send: "Invia",
    placeholder: "Scrivi la tua risposta...",
    analyzing: "Analisi dei tratti...",
    analyzeCommand: "Analizza il mio look.",
    errorChat: "Spiacente, il servizio non è disponibile.",
    errorAnalysis: "Errore durante l'analisi. Riprova.",
    faceShape: "Forma del Viso",
    skinTone: "Tono della Pelle",
    palette: "Migliore Palette",
    expert: "Esperto Virtuale",
    projection: "Proiezione IA",
    alignFace: "ALLINEA IL VISO",
    regenerate: "Rigenera",
    variations: "Variazioni",
    lighter: "Più Chiaro",
    darker: "Più Scuro",
    shorter: "Più Corto",
    longer: "Più Lungo",
    refine: "Raffina",
    finalize: "Finalizza (DALL·E 2)",
    finalizeStandard: "Finalizza (Standard)",
    finalImage: "Immagine Finale",
    generatingFinal: "Generazione immagine finale...",
    errorFinal: "Impossibile generare l'immagine finale.",
    noApiKey: "Per DALL·E 2, salva la tua chiave API nella scheda 'Guide'.",
  }
};

export const Consultation: React.FC<ConsultationProps> = ({ language }) => {
  const t = TEXTS[language];
  const [started, setStarted] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [loadingText, setLoadingText] = useState('');
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  
  // Track the active prompt and active generated image for refinement
  const [activePrompt, setActivePrompt] = useState<string | null>(null);
  const [activeGeneratedImageSrc, setActiveGeneratedImageSrc] = useState<string | null>(null);
  
  // Camera States
  const [isCameraOpen, setIsCameraOpen] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Initialize welcome message when language changes
  useEffect(() => {
    setMessages(prev => {
        if (prev.length === 0) return [{ role: 'model', text: t.welcome }];
        return prev;
    });
  }, [language, t.welcome]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, selectedImage]);

  // Extract all generated images from history for the gallery
  const generatedHistory = messages
    .filter(m => m.generatedImage && m.originalPrompt && !m.isFinalImage)
    .map(m => ({ src: m.generatedImage!, prompt: m.originalPrompt! }));

  const handleGallerySelect = (prompt: string, src: string) => {
      setActivePrompt(prompt);
      setActiveGeneratedImageSrc(src);
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const base64String = reader.result as string;
        setSelectedImage(base64String);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSend = async () => {
    if ((!input.trim() && !selectedImage) || loading) return;

    const userMsg: ChatMessage = { role: 'user', text: input, image: selectedImage || undefined };
    const currentMessages = [...messages, userMsg];
    setMessages(currentMessages);
    
    // Clear inputs immediately
    setInput('');
    setSelectedImage(null);
    if (fileInputRef.current) fileInputRef.current.value = '';

    setLoading(true);
    setLoadingText('');
    
    logger.info('ui', 'User sent a message', { hasImage: !!userMsg.image });

    try {
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ 
          message: input,
          image: userMsg.image,
          history: currentMessages.filter(m => m.role !== 'model' || m.text),
          language: language
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to get response from the server.');
      }

      const data = await response.json();
      setMessages(prev => [...prev, { role: 'model', text: data.responseText }]);
      logger.success('api', 'Received chat response', { length: data.responseText.length });
    } catch (error: any) {
      console.error("Chat API Error:", error);
      logger.error('api', 'Chat API failed', error.message);
      setMessages(prev => [...prev, { role: 'model', text: t.errorChat }]);
    } finally {
      setLoading(false);
    }
  };

  // --- Camera Logic ---
  const startCamera = async () => {
    setIsCameraOpen(true);
    logger.info('ui', 'Starting camera');
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ 
        video: { facingMode: 'user' } 
      });
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
      }
    } catch (err: any) {
      console.error("Error accessing camera:", err);
      logger.error('system', 'Camera access failed', err.message);
      alert("Unable to access camera. Please allow permissions in your browser settings.");
      setIsCameraOpen(false);
    }
  };

  const stopCamera = () => {
    if (videoRef.current && videoRef.current.srcObject) {
      const stream = videoRef.current.srcObject as MediaStream;
      stream.getTracks().forEach(track => track.stop());
    }
    setIsCameraOpen(false);
  };

  const captureImage = async () => {
    if (!videoRef.current || !canvasRef.current) return;

    const context = canvasRef.current.getContext('2d');
    if (!context) return;

    canvasRef.current.width = videoRef.current.videoWidth;
    canvasRef.current.height = videoRef.current.videoHeight;
    context.drawImage(videoRef.current, 0, 0);

    // Resize to max 1024px to avoid payload issues
    const MAX_WIDTH = 1024;
    const MAX_HEIGHT = 1024;
    let width = canvasRef.current.width;
    let height = canvasRef.current.height;

    if (width > height) {
      if (width > MAX_WIDTH) {
        height *= MAX_WIDTH / width;
        width = MAX_WIDTH;
      }
    } else {
      if (height > MAX_HEIGHT) {
        width *= MAX_HEIGHT / height;
        height = MAX_HEIGHT;
      }
    }

    const resizedCanvas = document.createElement('canvas');
    resizedCanvas.width = width;
    resizedCanvas.height = height;
    const ctx = resizedCanvas.getContext('2d');
    if(ctx) {
      ctx.drawImage(canvasRef.current, 0, 0, width, height);
      const imageBase64 = resizedCanvas.toDataURL('image/jpeg', 0.8);
      
      stopCamera();
      logger.info('ui', 'Image captured and resized', { width, height });
      
      // Add prompt immediately
      const userMsg: ChatMessage = { role: 'user', text: t.analyzeCommand, image: imageBase64 };
      setMessages(prev => [...prev, userMsg]);
      
      setLoading(true);
      setLoadingText(t.analyzing);

      try {
        // 1. Analyze
        logger.info('api', 'Starting face analysis');
        const response = await fetch('/api/analyze', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ imageBase64, language }), 
        });

        if (!response.ok) {
          const errorData = await response.json();
          throw new Error(errorData.details || 'Failed to analyze image.');
        }

        const { analysis } = await response.json();
        logger.success('api', 'Face analysis completed', { faceShape: analysis.faceShape });
        
        const analysisMessage: ChatMessage = {
          role: 'model',
          text: analysis.reasoning,
          analysis: analysis
        };
        setMessages(prev => [...prev, analysisMessage]);
        
        // Set the initial prompt for this session
        setActivePrompt(analysis.imageGenerationPrompt);

        // 2. Generate Style separately
        // Use the helper to handle the request and state
        await requestImageGeneration(analysis.imageGenerationPrompt);

      } catch (error: any) {
        console.error("Analysis API Error:", error);
        logger.error('api', 'Face analysis failed', error.message);
        setMessages(prev => [...prev, { role: 'model', text: t.errorAnalysis }]);
        setLoading(false); 
      }
    }
  };

  const requestImageGeneration = async (prompt: string) => {
    try {
        setLoading(true);
        setLoadingText(t.projection + '...');
        logger.info('api', 'Requesting image generation');
        const genResponse = await fetch('/api/generate-style', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ prompt: prompt }),
        });

        if(genResponse.ok) {
            const { generatedImage } = await genResponse.json();
            logger.success('api', 'Image generation successful');
            
            // Add new image to chat
            setMessages(prev => [...prev, {
                role: 'model',
                text: "", 
                generatedImage: generatedImage,
                originalPrompt: prompt
            }]);

            // Automatically select the new image as active
            setActivePrompt(prompt);
            setActiveGeneratedImageSrc(generatedImage);
        } else {
             throw new Error("Generation failed");
        }
    } catch (genError: any) {
        console.error("Generation Error:", genError);
        logger.error('api', 'Image generation failed', genError.message);
        // Display visible error in chat so user knows regeneration is needed
        setMessages(prev => [...prev, { 
            role: 'model', 
            text: "Could not generate preview image. Please use 'Regenerate' to try again." 
        }]);
    } finally {
        setLoading(false);
        setLoadingText('');
    }
  };

  const handleFinalize = async () => {
    const apiKey = localStorage.getItem('openai_api_key');
    if (!apiKey) {
      alert(t.noApiKey);
      return;
    }
    if (!activePrompt) return;

    setLoading(true);
    setLoadingText(t.generatingFinal);
    logger.info('api', 'Starting DALL-E 2 finalization');

    try {
      const response = await fetch('/api/generate-final-image', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ prompt: activePrompt, apiKey }),
      });

      if (!response.ok) throw new Error('Failed to generate final image.');
      
      const { finalImage } = await response.json();
      logger.success('api', 'DALL-E 2 image generated');
      setMessages(prev => [...prev, {
        role: 'model',
        text: '',
        generatedImage: finalImage,
        isFinalImage: true
      }]);

    } catch (error: any) {
      console.error("DALL-E 2 Error:", error);
      logger.error('api', 'DALL-E 2 generation failed', error.message);
      setMessages(prev => [...prev, { role: 'model', text: t.errorFinal }]);
    } finally {
      setLoading(false);
      setLoadingText('');
    }
  };

  const handleFinalizeEconomy = async () => {
    if (!activePrompt) return;

    setLoading(true);
    setLoadingText(t.generatingFinal);
    logger.info('api', 'Starting Standard finalization');

    try {
      // Use standard generation endpoint for economy mode
      const response = await fetch('/api/generate-style', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ prompt: activePrompt }), 
      });

      if (!response.ok) throw new Error('Failed to generate standard final image.');

      const { generatedImage } = await response.json();
      logger.success('api', 'Standard finalization successful');
      setMessages(prev => [...prev, {
        role: 'model',
        text: '',
        generatedImage: generatedImage,
        isFinalImage: true // Treat as final
      }]);

    } catch (error: any) {
      console.error("Standard Finalize Error:", error);
      logger.error('api', 'Standard finalization failed', error.message);
      setMessages(prev => [...prev, { role: 'model', text: t.errorFinal }]);
    } finally {
      setLoading(false);
      setLoadingText('');
    }
  };

  const handleRefine = (modifier: string) => {
      if (!activePrompt) return;
      logger.info('ui', `Refining look: ${modifier}`);
      
      // Map basic modifiers to technical prompt additions
      let modification = "";
      switch(modifier) {
          case 'regenerate': modification = "slight variation, consistent lighting"; break;
          case 'lighter': modification = "lighter hair color shade, soft highlights"; break;
          case 'darker': modification = "darker hair color depth, richer tone"; break;
          case 'shorter': modification = "slightly shorter hair length, modern cut"; break;
          case 'longer': modification = "slightly longer hair length, extensions look"; break;
          default: modification = "";
      }

      const newPrompt = `${activePrompt}, ${modification}`;
      // We do NOT update activePrompt here immediately; we wait for the generation to succeed
      requestImageGeneration(newPrompt);
  };

  if (isCameraOpen) {
    return (
      <div className="fixed inset-0 z-50 bg-black flex flex-col">
        <div className="relative flex-1 bg-black overflow-hidden">
           <video 
             ref={videoRef} 
             autoPlay 
             playsInline 
             muted 
             className="absolute inset-0 w-full h-full object-cover transform scale-x-[-1]"
           />
           <canvas ref={canvasRef} className="hidden" />
           
           <div className="absolute inset-0 pointer-events-none flex items-center justify-center">
             <div className="w-64 h-80 border-2 border-white/50 rounded-[50%] box-content shadow-[0_0_0_9999px_rgba(0,0,0,0.7)]"></div>
             <div className="absolute text-white/80 font-medium tracking-widest text-xs bottom-1/4">{t.alignFace}</div>
           </div>

           <button 
             onClick={stopCamera}
             className="absolute top-6 right-6 text-white p-2 z-50"
           >
             <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-8 h-8">
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
              </svg>
           </button>
        </div>
        
        <div className="h-32 bg-black flex items-center justify-center gap-8">
           <button 
             onClick={captureImage}
             className="w-20 h-20 rounded-full border-4 border-white flex items-center justify-center hover:bg-white/10 transition-colors"
           >
             <div className="w-16 h-16 bg-white rounded-full"></div>
           </button>
        </div>
      </div>
    );
  }

  if (!started) {
    return (
      <div className="flex flex-col h-full items-center justify-center px-6 text-center animate-fade-in pb-24">
        <div className="mb-12 animate-slide-up">
            <Logo size="lg" />
        </div>
        
        <h1 className="text-3xl font-bold mb-4 animate-slide-up delay-100">
          {t.title}
          <br />
          <span className="text-gray-400 font-normal text-2xl">{t.subtitle}</span>
        </h1>
        
        <p className="text-gray-500 mb-12 max-w-md mx-auto animate-slide-up delay-200">
          {t.description}
        </p>

        <button 
          onClick={() => { setStarted(true); startCamera(); }}
          className="bg-white text-black font-bold uppercase py-4 px-12 text-sm tracking-widest hover:bg-gray-200 transition-colors w-full max-w-xs mb-4 flex items-center justify-center gap-2 animate-slide-up delay-300"
        >
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
            <path strokeLinecap="round" strokeLinejoin="round" d="M6.827 6.175A2.31 2.31 0 015.186 7.23c-.38.054-.757.112-1.134.175C2.999 7.58 2.25 8.507 2.25 9.574V18a2.25 2.25 0 002.25 2.25h15A2.25 2.25 0 0021.75 18V9.574c0-1.067-.75-1.994-1.802-2.169a47.865 47.865 0 00-1.134-.175 2.31 2.31 0 01-1.64-1.055l-.822-1.316a2.192 2.192 0 00-1.736-1.039 48.774 48.774 0 00-5.232 0 2.192 2.192 0 00-1.736 1.039l-.821 1.316z" />
            <path strokeLinecap="round" strokeLinejoin="round" d="M16.5 12.75a4.5 4.5 0 11-9 0 4.5 4.5 0 019 0zM18.75 10.5h.008v.008h-.008V10.5z" />
          </svg>
          {t.videoBtn}
        </button>

        <button 
          onClick={() => { setStarted(true); logger.info('ui', 'Started text consultation'); }}
          className="border border-gray-800 text-gray-300 font-bold uppercase py-4 px-12 text-sm tracking-widest hover:border-white transition-colors w-full max-w-xs mb-4 animate-slide-up delay-300"
        >
          {t.textBtn}
        </button>

        <a 
          href="https://wa.me/5511992279655?text=Gostaria%20de%20agendar,%20vim%20atrav%C3%A9s%20do%20site"
          target="_blank"
          rel="noopener noreferrer"
          className="text-gray-600 font-medium uppercase py-3 px-8 text-[10px] tracking-[0.2em] hover:text-white transition-colors w-full max-w-xs animate-slide-up delay-500"
        >
           {t.bookBtn}
        </a>
      </div>
    );
  }

  return (
    <div className="flex flex-col h-[calc(100vh-80px)] pb-4 pt-4">
        {/* Top Bar for Consultation */}
        <div className="px-4 mb-4 border-b border-gray-800 pb-4 flex justify-between items-center bg-black z-10 animate-slide-up">
            <h2 className="text-lg font-bold">{t.consultationTitle}</h2>
            <div className="flex gap-4">
              <button onClick={startCamera} className="text-xs uppercase text-white border border-white px-3 py-1 hover:bg-white hover:text-black transition-colors">
                {t.newScan}
              </button>
              <button onClick={() => setStarted(false)} className="text-xs uppercase text-gray-500 hover:text-white pt-1">{t.exit}</button>
            </div>
        </div>

        {/* Gallery Strip - Shows only if there are generated images */}
        <PreviewGallery 
            images={generatedHistory} 
            onSelect={handleGallerySelect} 
            selectedImageSrc={activeGeneratedImageSrc} 
        />

      <div className="flex-1 overflow-y-auto px-4 space-y-6 pt-4">
        {messages.map((msg, index) => (
          <div 
            key={index} 
            className={`flex flex-col ${msg.role === 'user' ? 'items-end' : 'items-start'} animate-message-in`}
            style={{ animationDelay: '100ms' }}
          >
            {msg.image && (
              <div className="mb-2 max-w-[70%] border border-gray-800 rounded overflow-hidden">
                <img src={msg.image} alt="User Upload" className="w-full h-auto" />
              </div>
            )}

            {msg.analysis && (
               <div className="mb-2 w-full max-w-[85%] bg-[#111] border border-gray-700 p-4 rounded-sm animate-blur-in">
                  <h4 className="text-xs uppercase tracking-widest text-gray-400 mb-3 border-b border-gray-800 pb-2">{t.expert} Diagnosis</h4>
                  <div className="grid grid-cols-2 gap-4 text-sm mb-4">
                     <div>
                        <span className="block text-[10px] uppercase text-gray-500">{t.faceShape}</span>
                        <span className="font-bold">{msg.analysis.faceShape}</span>
                     </div>
                     <div>
                        <span className="block text-[10px] uppercase text-gray-500">{t.skinTone}</span>
                        <span className="font-bold">{msg.analysis.skinTone}</span>
                     </div>
                  </div>
                  <div className="mb-2">
                     <span className="block text-[10px] uppercase text-gray-500 mb-1">{t.palette}</span>
                     <div className="flex gap-2">
                       {msg.analysis.bestColors.map((c, i) => (
                         <span key={i} className="text-[10px] bg-gray-800 px-2 py-1 rounded">{c}</span>
                       ))}
                     </div>
                  </div>
               </div>
            )}

            {msg.generatedImage && (
               <div className={`mb-2 max-w-[85%] border rounded overflow-hidden relative group flex flex-col transition-all animate-slow-zoom ${activeGeneratedImageSrc === msg.generatedImage ? 'border-white shadow-lg' : 'border-gray-700'}`}>
                  <div className="relative">
                      <div className={`absolute top-2 left-2 backdrop-blur px-2 py-1 text-[8px] uppercase tracking-widest text-white z-10 ${msg.isFinalImage ? 'bg-purple-900/80 border border-purple-500' : 'bg-black/50'}`}>
                        {msg.isFinalImage ? t.finalImage : t.projection}
                      </div>
                      <img 
                          src={msg.generatedImage} 
                          alt="Generated Look" 
                          className="w-full h-auto cursor-pointer" 
                          onClick={() => !msg.isFinalImage && handleGallerySelect(msg.originalPrompt || "", msg.generatedImage!)}
                      />
                  </div>
               </div>
            )}

            {(msg.text || (!msg.image && !msg.analysis && !msg.generatedImage)) && (
              <div 
                className={`max-w-[85%] p-4 text-sm leading-relaxed ${
                  msg.role === 'user' 
                    ? 'bg-white text-black' 
                    : 'bg-[#1a1a1a] text-gray-100 border border-gray-800'
                }`}
              >
                  {msg.role === 'model' && !msg.analysis && !msg.generatedImage && (
                      <div className="mb-2 text-[10px] uppercase tracking-widest text-gray-500">{t.expert}</div>
                  )}
                {msg.text}
              </div>
            )}
          </div>
        ))}
        {loading && (
          <div className="flex justify-start w-full animate-message-in">
            <div className="bg-[#1a1a1a] border border-gray-800 p-4 flex items-center gap-3">
              <div className="flex gap-1">
                <div className="w-1.5 h-1.5 bg-white rounded-full animate-bounce" />
                <div className="w-1.5 h-1.5 bg-white rounded-full animate-bounce delay-100" />
                <div className="w-1.5 h-1.5 bg-white rounded-full animate-bounce delay-200" />
              </div>
              <span className="text-xs uppercase tracking-widest text-gray-400 animate-pulse">{loadingText || 'Processing...'}</span>
            </div>
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>

        {/* Refinement Controls - Fixed at bottom above input */}
        {activePrompt && !loading && (
            <div className="bg-[#0a0a0a] p-3 border-t border-gray-900 mx-4 mb-2 space-y-2 animate-slide-up">
                <div>
                    <div className="text-[9px] text-gray-500 uppercase tracking-widest text-center mb-2">{t.refine}: {t.variations}</div>
                    <div className="grid grid-cols-2 md:grid-cols-5 gap-2">
                        <button onClick={() => handleRefine('regenerate')} className="col-span-2 md:col-span-1 text-[9px] font-bold uppercase border border-gray-700 bg-gray-900 text-white py-2 hover:bg-white hover:text-black transition-colors">{t.regenerate}</button>
                        <button onClick={() => handleRefine('lighter')} className="text-[9px] uppercase border border-gray-800 text-gray-400 py-2 hover:bg-gray-800 hover:text-white transition-colors">{t.lighter}</button>
                        <button onClick={() => handleRefine('darker')} className="text-[9px] uppercase border border-gray-800 text-gray-400 py-2 hover:bg-gray-800 hover:text-white transition-colors">{t.darker}</button>
                        <button onClick={() => handleRefine('shorter')} className="text-[9px] uppercase border border-gray-800 text-gray-400 py-2 hover:bg-gray-800 hover:text-white transition-colors">{t.shorter}</button>
                        <button onClick={() => handleRefine('longer')} className="text-[9px] uppercase border border-gray-800 text-gray-400 py-2 hover:bg-gray-800 hover:text-white transition-colors">{t.longer}</button>
                    </div>
                </div>
                <div className="flex gap-2">
                    <button 
                      onClick={handleFinalizeEconomy}
                      className="flex-1 text-[10px] font-bold uppercase bg-gray-800 border border-gray-700 text-white py-3 hover:bg-gray-700 transition-colors"
                    >
                        {t.finalizeStandard}
                    </button>
                    <button 
                      onClick={handleFinalize}
                      className="flex-1 text-[10px] font-bold uppercase bg-gradient-to-r from-purple-500 to-pink-500 text-white py-3 hover:opacity-90 transition-opacity"
                    >
                        {t.finalize}
                    </button>
                </div>
            </div>
        )}

      <div className="p-4 border-t border-gray-800 bg-black">
        {selectedImage && (
          <div className="mb-2 relative inline-block animate-slide-up">
             <img src={selectedImage} alt="Preview" className="h-16 w-auto border border-gray-700 rounded" />
             <button 
                onClick={() => { setSelectedImage(null); if(fileInputRef.current) fileInputRef.current.value = ''; }}
                className="absolute -top-2 -right-2 bg-white text-black rounded-full w-5 h-5 flex items-center justify-center font-bold text-xs hover:bg-red-500 hover:text-white"
             >
               &times;
             </button>
          </div>
        )}
        <div className="flex gap-2 items-end">
          <input 
            type="file" 
            ref={fileInputRef}
            accept="image/*"
            onChange={handleFileChange}
            className="hidden"
          />
          <button 
            onClick={() => fileInputRef.current?.click()}
            className="p-3 bg-[#1a1a1a] border border-gray-800 text-gray-400 hover:text-white hover:border-white transition-colors"
          >
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
              <path strokeLinecap="round" strokeLinejoin="round" d="M18.375 12.739l-7.693 7.693a4.5 4.5 0 01-6.364-6.364l10.94-10.94A3 3 0 1119.5 7.372L8.552 18.32m.009-.01l-.01.01m5.699-9.941l-7.81 7.81a1.5 1.5 0 002.112 2.13" />
            </svg>
          </button>
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && handleSend()}
            placeholder={t.placeholder}
            className="flex-1 bg-[#1a1a1a] border border-gray-800 text-white p-3 text-sm focus:outline-none focus:border-white transition-colors"
          />
          <button 
            onClick={handleSend}
            disabled={(!input.trim() && !selectedImage) || loading}
            className="bg-white text-black px-6 py-3 font-bold uppercase text-xs tracking-wider disabled:opacity-50 hover:bg-gray-200 transition-colors h-full"
          >
            {t.send}
          </button>
        </div>
      </div>
    </div>
  );
};