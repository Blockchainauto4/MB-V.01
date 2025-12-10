import React, { useState } from 'react';
import { Tab } from './types';
import { IntroScreen } from './components/IntroScreen';
import { BottomNav } from './components/BottomNav';
import { Consultation } from './components/Consultation';
import { Swatchbook } from './components/Swatchbook';
import { TechnicalGuides } from './components/TechnicalGuides';
import { WeddingServices } from './components/WeddingServices';
import { Logo } from './components/Logo';

const App: React.FC = () => {
  const [showIntro, setShowIntro] = useState(true);
  const [activeTab, setActiveTab] = useState<Tab>(Tab.CONSULTATION);

  if (showIntro) {
    return <IntroScreen onComplete={() => setShowIntro(false)} />;
  }

  const renderContent = () => {
    switch (activeTab) {
      case Tab.CONSULTATION:
        return <Consultation />;
      case Tab.EXPLORE:
        return <Swatchbook />;
      case Tab.WEDDING:
        return <WeddingServices />;
      case Tab.CATALOGUE:
        return <TechnicalGuides />;
      default:
        return <Consultation />;
    }
  };

  return (
    <div className="min-h-screen bg-black text-white selection:bg-white selection:text-black overflow-hidden relative">
      {/* Top Header - Visible on all tabs except Consultation when started (handled internally) */}
      <div className="absolute top-0 left-0 w-full p-4 flex justify-center z-30 pointer-events-none">
        <div className="opacity-0"> 
            {/* Hidden spacer for now, logic inside components handles headers */}
        </div>
      </div>

      <div className="max-w-md mx-auto h-screen relative bg-black shadow-2xl overflow-hidden flex flex-col">
        
        {/* Top Branding Bar */}
        <div className="pt-8 pb-2 flex justify-center border-b border-gray-900/50 bg-black/80 backdrop-blur-sm sticky top-0 z-20">
             <Logo size="sm" />
        </div>

        {/* Main Content Area */}
        <main className="flex-1 overflow-y-auto scrollbar-hide">
          {renderContent()}
        </main>

        {/* Navigation */}
        <BottomNav activeTab={activeTab} onTabChange={setActiveTab} />
      </div>
    </div>
  );
};

export default App;
