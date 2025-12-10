
import React, { useState, useRef, useEffect } from 'react';
import { ChatMessage } from '../types';
import { Logo } from './Logo';

export const Consultation: React.FC = () => {
  const [started, setStarted] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([
    { role: 'model', text: "Welcome to Beatriz Bittencourt Professional. I am your Visagismo expert. Start a video analysis to find your perfect match, or chat with me directly." }
  ]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [loadingText, setLoadingText] = useState('');
  
  // Camera States
  const [isCameraOpen, setIsCameraOpen] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSend = async () => {
    if (!input.trim() || loading) return;

    const userMsg: ChatMessage = { role: 'user', text: input };
    const currentMessages = [...messages, userMsg];
    setMessages(currentMessages);
    setInput('');
    setLoading(true);

    try {
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ 
          message: input,
          history: currentMessages.filter(m => m.role !== 'model' || m.text) // Send relevant history
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to get response from the server.');
      }

      const data = await response.json();
      setMessages(prev => [...prev, { role: 'model', text: data.responseText }]);
    } catch (error) {
      console.error("Chat API Error:", error);
      setMessages(prev => [...prev, { role: 'model', text: "Sorry, the consultation service is currently unavailable." }]);
    } finally {
      setLoading(false);
    }
  };

  // --- Camera Logic ---
  const startCamera = async () => {
    setIsCameraOpen(true);
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ 
        video: { facingMode: 'user' } 
      });
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
      }
    } catch (err) {
      console.error("Error accessing camera:", err);
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

    const imageBase64 = canvasRef.current.toDataURL('image/jpeg', 0.8);
    
    stopCamera();
    
    setMessages(prev => [...prev, { role: 'user', text: "Analyze my look.", image: imageBase64 }]);
    
    setLoading(true);
    setLoadingText("Analyzing facial features...");

    try {
      const response = await fetch('/api/analyze', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ imageBase64 }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.details || 'Failed to analyze image.');
      }

      const { analysis, generatedImage } = await response.json();
      
      const analysisMessage: ChatMessage = {
        role: 'model',
        text: `I've analyzed your features. You have a **${analysis.faceShape}** face shape with **${analysis.skinTone}** skin. \n\n${analysis.reasoning}`,
        analysis: analysis
      };
      setMessages(prev => [...prev, analysisMessage]);

      setMessages(prev => [...prev, {
        role: 'model',
        text: `Here is a preview of the recommended look: **${analysis.hairSuggestion}**.`,
        generatedImage: generatedImage
      }]);

    } catch (error) {
      console.error("Analysis API Error:", error);
      setMessages(prev => [...prev, { role: 'model', text: "I encountered an error analyzing your image. Please try again." }]);
    } finally {
      setLoading(false);
      setLoadingText('');
    }
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
             <div className="absolute text-white/80 font-medium tracking-widest text-xs bottom-1/4">ALIGN YOUR FACE</div>
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
        <div className="mb-12">
            <Logo size="lg" />
        </div>
        
        <h1 className="text-3xl font-bold mb-4">
          Professional Visagismo
          <br />
          <span className="text-gray-400 font-normal text-2xl">powered by AI analysis.</span>
        </h1>
        
        <p className="text-gray-500 mb-12 max-w-md mx-auto">
          Experience a personalized diagnosis to find your perfect shade and technical routine based on your unique features.
        </p>

        <button 
          onClick={startCamera}
          className="bg-white text-black font-bold uppercase py-4 px-12 text-sm tracking-widest hover:bg-gray-200 transition-colors w-full max-w-xs mb-4 flex items-center justify-center gap-2"
        >
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
            <path strokeLinecap="round" strokeLinejoin="round" d="M6.827 6.175A2.31 2.31 0 015.186 7.23c-.38.054-.757.112-1.134.175C2.999 7.58 2.25 8.507 2.25 9.574V18a2.25 2.25 0 002.25 2.25h15A2.25 2.25 0 0021.75 18V9.574c0-1.067-.75-1.994-1.802-2.169a47.865 47.865 0 00-1.134-.175 2.31 2.31 0 01-1.64-1.055l-.822-1.316a2.192 2.192 0 00-1.736-1.039 48.774 48.774 0 00-5.232 0 2.192 2.192 0 00-1.736 1.039l-.821 1.316z" />
            <path strokeLinecap="round" strokeLinejoin="round" d="M16.5 12.75a4.5 4.5 0 11-9 0 4.5 4.5 0 019 0zM18.75 10.5h.008v.008h-.008V10.5z" />
          </svg>
          Video Analysis
        </button>

        <button 
          onClick={() => setStarted(true)}
          className="border border-gray-800 text-gray-300 font-bold uppercase py-4 px-12 text-sm tracking-widest hover:border-white transition-colors w-full max-w-xs mb-4"
        >
          Text Consultation
        </button>

        <a 
          href="https://wa.me/5511992279655?text=Gostaria%20de%20agendar,%20vim%20atrav%C3%A9s%20do%20site"
          target="_blank"
          rel="noopener noreferrer"
          className="text-gray-600 font-medium uppercase py-3 px-8 text-[10px] tracking-[0.2em] hover:text-white transition-colors w-full max-w-xs"
        >
           Book via WhatsApp
        </a>
      </div>
    );
  }

  return (
    <div className="flex flex-col h-[calc(100vh-80px)] pb-4 pt-4">
        <div className="px-4 mb-4 border-b border-gray-800 pb-4 flex justify-between items-center">
            <h2 className="text-lg font-bold">Visagismo Consultation</h2>
            <div className="flex gap-4">
              <button onClick={startCamera} className="text-xs uppercase text-white border border-white px-3 py-1 hover:bg-white hover:text-black transition-colors">
                New Scan
              </button>
              <button onClick={() => setStarted(false)} className="text-xs uppercase text-gray-500 hover:text-white pt-1">Exit</button>
            </div>
        </div>

      <div className="flex-1 overflow-y-auto px-4 space-y-6">
        {messages.map((msg, index) => (
          <div 
            key={index} 
            className={`flex flex-col ${msg.role === 'user' ? 'items-end' : 'items-start'}`}
          >
            {msg.image && (
              <div className="mb-2 max-w-[70%] border border-gray-800 rounded overflow-hidden">
                <img src={msg.image} alt="Captured" className="w-full h-auto" />
              </div>
            )}

            {msg.analysis && (
               <div className="mb-2 w-full max-w-[85%] bg-[#111] border border-gray-700 p-4 rounded-sm">
                  <h4 className="text-xs uppercase tracking-widest text-gray-400 mb-3 border-b border-gray-800 pb-2">Visagismo Diagnosis</h4>
                  <div className="grid grid-cols-2 gap-4 text-sm mb-4">
                     <div>
                        <span className="block text-[10px] uppercase text-gray-500">Face Shape</span>
                        <span className="font-bold">{msg.analysis.faceShape}</span>
                     </div>
                     <div>
                        <span className="block text-[10px] uppercase text-gray-500">Skin Tone</span>
                        <span className="font-bold">{msg.analysis.skinTone}</span>
                     </div>
                  </div>
                  <div className="mb-2">
                     <span className="block text-[10px] uppercase text-gray-500 mb-1">Best Color Palette</span>
                     <div className="flex gap-2">
                       {msg.analysis.bestColors.map((c, i) => (
                         <span key={i} className="text-[10px] bg-gray-800 px-2 py-1 rounded">{c}</span>
                       ))}
                     </div>
                  </div>
               </div>
            )}

            {msg.generatedImage && (
               <div className="mb-2 max-w-[85%] border border-gray-700 rounded overflow-hidden relative group">
                  <div className="absolute top-2 left-2 bg-black/50 backdrop-blur px-2 py-1 text-[8px] uppercase tracking-widest text-white z-10">AI Projection</div>
                  <img src={msg.generatedImage} alt="Generated Look" className="w-full h-auto" />
               </div>
            )}

            <div 
              className={`max-w-[85%] p-4 text-sm leading-relaxed ${
                msg.role === 'user' 
                  ? 'bg-white text-black' 
                  : 'bg-[#1a1a1a] text-gray-100 border border-gray-800'
              }`}
            >
                {msg.role === 'model' && !msg.analysis && !msg.generatedImage && (
                    <div className="mb-2 text-[10px] uppercase tracking-widest text-gray-500">Virtual Expert</div>
                )}
              {msg.text}
            </div>
          </div>
        ))}
        {loading && (
          <div className="flex justify-start w-full">
            <div className="bg-[#1a1a1a] border border-gray-800 p-4 flex items-center gap-3">
              <div className="flex gap-1">
                <div className="w-1.5 h-1.5 bg-white rounded-full animate-bounce" />
                <div className="w-1.5 h-1.5 bg-white rounded-full animate-bounce delay-100" />
                <div className="w-1.5 h-1.5 bg-white rounded-full animate-bounce delay-200" />
              </div>
              <span className="text-xs uppercase tracking-widest text-gray-400">{loadingText || 'Processing...'}</span>
            </div>
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>

      <div className="p-4 border-t border-gray-800 bg-black">
        <div className="flex gap-2">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && handleSend()}
            placeholder="Type your response..."
            className="flex-1 bg-[#1a1a1a] border border-gray-800 text-white p-3 text-sm focus:outline-none focus:border-white transition-colors"
          />
          <button 
            onClick={handleSend}
            disabled={!input.trim() || loading}
            className="bg-white text-black px-6 font-bold uppercase text-xs tracking-wider disabled:opacity-50 hover:bg-gray-200 transition-colors"
          >
            Send
          </button>
        </div>
      </div>
    </div>
  );
};
