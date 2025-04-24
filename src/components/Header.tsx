import React from 'react';
import { useGame } from '../context/GameContext';

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
    { id: 'upgrades', label: 'Upgrades' },
  ];
  
  return (
    <header className="bg-red-700 text-white shadow-md">
      <div className="container mx-auto px-4 py-3">
        <div className="flex flex-col md:flex-row md:justify-between md:items-center">
          <div className="flex items-center mb-4 md:mb-0">
            <h1 className="text-2xl font-baumans">Hotpot Hodler</h1>
            <div className="ml-6 flex space-x-4">
              <div className="text-amber-200">
                <span className="font-bold">Day:</span> {state.day}
              </div>
              <div className="text-amber-200">
                <span className="font-bold">¥</span> {state.money.toFixed(2)}
              </div>
            </div>
          </div>
          
          <nav>
            <ul className="flex space-x-1">
              {tabs.map(tab => (
                <li key={tab.id}>
                  <button
                    onClick={() => setActiveTab(tab.id)}
                    className={`px-4 py-2 rounded-t-lg font-baumans ${
                      activeTab === tab.id
                        ? 'bg-amber-100 text-red-700'
                        : 'bg-red-800 text-white hover:bg-red-600'
                    }`}
                  >
                    {tab.label}
                  </button>
                </li>
              ))}
            </ul>
          </nav>
        </div>
      </div>
    </header>
  );
};

export default Header;
