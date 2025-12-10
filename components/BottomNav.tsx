import React from 'react';
import { Tab } from '../types';

interface BottomNavProps {
  activeTab: Tab;
  onTabChange: (tab: Tab) => void;
}

export const BottomNav: React.FC<BottomNavProps> = ({ activeTab, onTabChange }) => {
  return (
    <div className="fixed bottom-0 left-0 w-full bg-black border-t border-gray-900 z-40">
      <div className="flex justify-between items-center h-20 px-6 max-w-md mx-auto">
        <button
          onClick={() => onTabChange(Tab.CONSULTATION)}
          className={`flex flex-col items-center justify-center space-y-1 transition-colors ${
            activeTab === Tab.CONSULTATION ? 'text-white' : 'text-gray-600'
          }`}
        >
          <span className="uppercase text-[9px] md:text-[10px] font-bold tracking-widest">Consult</span>
          {activeTab === Tab.CONSULTATION && <div className="w-1 h-1 bg-white rounded-full"></div>}
        </button>

        <button
          onClick={() => onTabChange(Tab.EXPLORE)}
          className={`flex flex-col items-center justify-center space-y-1 transition-colors ${
            activeTab === Tab.EXPLORE ? 'text-white' : 'text-gray-600'
          }`}
        >
          <span className="uppercase text-[9px] md:text-[10px] font-bold tracking-widest">Explore</span>
          {activeTab === Tab.EXPLORE && <div className="w-1 h-1 bg-white rounded-full"></div>}
        </button>

        <button
          onClick={() => onTabChange(Tab.WEDDING)}
          className={`flex flex-col items-center justify-center space-y-1 transition-colors ${
            activeTab === Tab.WEDDING ? 'text-white' : 'text-gray-600'
          }`}
        >
          <span className="uppercase text-[9px] md:text-[10px] font-bold tracking-widest">Noivas</span>
          {activeTab === Tab.WEDDING && <div className="w-1 h-1 bg-white rounded-full"></div>}
        </button>

        <button
          onClick={() => onTabChange(Tab.CATALOGUE)}
          className={`flex flex-col items-center justify-center space-y-1 transition-colors ${
            activeTab === Tab.CATALOGUE ? 'text-white' : 'text-gray-600'
          }`}
        >
          <span className="uppercase text-[9px] md:text-[10px] font-bold tracking-widest">Guides</span>
          {activeTab === Tab.CATALOGUE && <div className="w-1 h-1 bg-white rounded-full"></div>}
        </button>
      </div>
    </div>
  );
};