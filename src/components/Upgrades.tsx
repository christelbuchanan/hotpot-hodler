import React from 'react';
import { useGame } from '../context/GameContext';

const Upgrades: React.FC = () => {
  const { state, dispatch } = useGame();
  
  const handlePurchaseUpgrade = (id: string) => {
    dispatch({
      type: 'PURCHASE_UPGRADE',
      payload: { id }
    });
  };
  
  return (
    <div className="bg-amber-50 p-4 rounded-lg shadow-md">
      <h2 className="text-2xl font-bold text-red-800 mb-4">Restaurant Upgrades</h2>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {state.upgrades.map(upgrade => (
          <div 
            key={upgrade.id} 
            className={`p-4 rounded-md shadow ${
              upgrade.purchased ? 'bg-green-50 border border-green-200' : 'bg-white'
            }`}
          >
            <div className="flex justify-between items-start">
              <div>
                <span className="text-2xl mr-2">{upgrade.image}</span>
                <span className="font-bold">{upgrade.name}</span>
              </div>
              {upgrade.purchased && (
                <div className="bg-green-100 text-green-800 text-xs px-2 py-1 rounded">
                  Purchased
                </div>
              )}
            </div>
            
            <div className="mt-2 text-sm">{upgrade.description}</div>
            
            <div className="mt-4 flex justify-between items-center">
              <div className="font-bold text-green-600">¥{upgrade.cost}</div>
              
              {!upgrade.purchased && (
                <button
                  onClick={() => handlePurchaseUpgrade(upgrade.id)}
                  className="bg-red-700 text-white px-3 py-1 rounded hover:bg-red-800 transition"
                  disabled={state.money < upgrade.cost}
                >
                  Purchase
                </button>
              )}
              
              {!upgrade.purchased && state.money < upgrade.cost && (
                <div className="text-xs text-red-500">Not enough money!</div>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Upgrades;
