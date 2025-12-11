import React, { useState } from 'react';
import { Tab, Language } from './types';
import { IntroScreen } from './components/IntroScreen';
import { LanguageScreen } from './components/LanguageScreen';
import { BottomNav } from './components/BottomNav';
import { Consultation } from './components/Consultation';
import { Swatchbook } from './components/Swatchbook';
import { TechnicalGuides } from './components/TechnicalGuides';
import { WeddingServices } from './components/WeddingServices';
import { Logo } from './components/Logo';
import { LogsDashboard } from './components/LogsDashboard';

const App: React.FC = () => {
  const [language, setLanguage] = useState<Language | null>(null);
  const [showIntro, setShowIntro] = useState(true);
  const [activeTab, setActiveTab] = useState<Tab>(Tab.CONSULTATION);

  // Flow: Language Screen -> Intro Screen -> Main App
  if (!language) {
    return <LanguageScreen onSelect={setLanguage} />;
  }

  if (showIntro) {
    return <IntroScreen onComplete={() => setShowIntro(false)} />;
  }

  const renderContent = () => {
    switch (activeTab) {
      case Tab.CONSULTATION:
        return <Consultation language={language} />;
      case Tab.EXPLORE:
        return <Swatchbook language={language} />;
      case Tab.WEDDING:
        return <WeddingServices language={language} />;
      case Tab.CATALOGUE:
        return <TechnicalGuides language={language} onNavigate={setActiveTab} />;
      case Tab.LOGS:
        return <LogsDashboard onBack={() => setActiveTab(Tab.CATALOGUE)} />;
      default:
        return <Consultation language={language} />;
    }
  };

  // Determine if main should scroll or if component handles it (Consultation)
  const isConsultation = activeTab === Tab.CONSULTATION;

  return (
    <div className="min-h-[100dvh] bg-black text-white selection:bg-white selection:text-black overflow-hidden relative">
      {/* Top Header - Visible on all tabs except Consultation when started (handled internally) */}
      <div className="absolute top-0 left-0 w-full p-4 flex justify-center z-30 pointer-events-none">
        <div className="opacity-0"> 
            {/* Hidden spacer for now, logic inside components handles headers */}
        </div>
      </div>

      <div className="max-w-md mx-auto h-[100dvh] relative bg-black shadow-2xl overflow-hidden flex flex-col">
        
        {/* Top Branding Bar */}
        {activeTab !== Tab.LOGS && (
          <div className="pt-8 pb-2 flex justify-center border-b border-gray-900/50 bg-black/80 backdrop-blur-sm sticky top-0 z-20 flex-shrink-0">
              <Logo size="sm" />
          </div>
        )}

        {/* Main Content Area */}
        <main 
          className={`flex-1 ${isConsultation ? 'overflow-hidden' : 'overflow-y-auto scrollbar-hide'}`}
        >
          {renderContent()}
        </main>

        {/* Navigation */}
        {activeTab !== Tab.LOGS && (
          <BottomNav activeTab={activeTab} onTabChange={setActiveTab} />
        )}
      </div>
    </div>
  );
};

export default App;