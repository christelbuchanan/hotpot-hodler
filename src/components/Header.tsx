import React from 'react';
import { useGame } from '../context/GameContext';
import WalletButton from './WalletButton';

interface HeaderProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
}

const Header: React.FC<HeaderProps> = ({ activeTab, setActiveTab }) => {
  const { state } = useGame();
  
  const tabs = [
    { id: 'dashboard', label: 'Dashboard' },
    { id: 'inventory', label: 'Inventory' },
    { id: 'staff', label: 'Staff' },
    { id: 'upgrades', label: 'Upgrades' }
  ];
  
  return (
    <header className="bg-red-800 text-white shadow-md">
      <div className="container mx-auto px-4 py-3">
        <div className="flex justify-between items-center">
          <div className="flex items-center">
            <img src="/hotpot.svg" alt="Hotpot Logo" className="w-10 h-10 mr-3" />
            <h1 className="text-2xl font-bold font-baumans">Hotpot Hodler</h1>
          </div>
          
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2 bg-red-700 px-3 py-1 rounded-lg">
              <span className="text-amber-300">💰</span>
              <span className="font-medium">${state.money.toFixed(2)}</span>
            </div>
            
            <div className="flex items-center gap-2 bg-red-700 px-3 py-1 rounded-lg">
              <span className="text-amber-300">⭐</span>
              <span className="font-medium">{state.reputation.toFixed(1)}</span>
            </div>
            
            <div className="flex items-center gap-2 bg-red-700 px-3 py-1 rounded-lg">
              <span className="text-amber-300">📅</span>
              <span className="font-medium">Day {state.day}</span>
            </div>
            
            <WalletButton />
          </div>
        </div>
        
        <nav className="mt-4">
          <ul className="flex space-x-1">
            {tabs.map(tab => (
              <li key={tab.id}>
                <button
                  onClick={() => setActiveTab(tab.id)}
                  className={`px-4 py-2 rounded-t-lg transition-colors ${
                    activeTab === tab.id
                      ? 'bg-amber-100 text-red-800 font-medium'
                      : 'bg-red-700 text-white hover:bg-red-600'
                  }`}
                >
                  {tab.label}
                </button>
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </header>
  );
};

export default Header;
