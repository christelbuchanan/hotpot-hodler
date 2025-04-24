import React, { useState, useEffect } from 'react';
import { GameProvider, useGame } from './context/GameContext';
import { WalletProvider } from './context/WalletContext';
import Header from './components/Header';
import Dashboard from './components/Dashboard';
import Inventory from './components/Inventory';
import Staff from './components/Staff';
import Upgrades from './components/Upgrades';
import GameControls from './components/GameControls';
import DailyReport from './components/DailyReport';

const GameContent: React.FC = () => {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [showReport, setShowReport] = useState(false);
  const [prevDay, setPrevDay] = useState(1);
  const { state } = useGame();
  
  useEffect(() => {
    // Show report when day changes (except first day)
    if (state.day > 1 && state.day !== prevDay) {
      setShowReport(true);
      setPrevDay(state.day);
    }
  }, [state.day, prevDay]);
  
  const renderActiveTab = () => {
    switch (activeTab) {
      case 'dashboard':
        return <Dashboard />;
      case 'inventory':
        return <Inventory />;
      case 'staff':
        return <Staff />;
      case 'upgrades':
        return <Upgrades />;
      default:
        return <Dashboard />;
    }
  };
  
  return (
    <div className="min-h-screen bg-amber-100">
      <Header activeTab={activeTab} setActiveTab={setActiveTab} />
      
      <main className="container mx-auto py-6 px-4">
        {renderActiveTab()}
      </main>
      
      <GameControls />
      
      <DailyReport 
        isOpen={showReport} 
        onClose={() => setShowReport(false)} 
      />
    </div>
  );
};

function App() {
  return (
    <WalletProvider>
      <GameProvider>
        <GameContent />
      </GameProvider>
    </WalletProvider>
  );
}

export default App;
