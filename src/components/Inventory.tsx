import React, { useState } from 'react';
import { useGame } from '../context/GameContext';
import { Ingredient } from '../types/game';

const Inventory: React.FC = () => {
  const { state, dispatch } = useGame();
  const [purchaseQuantity, setPurchaseQuantity] = useState<Record<string, number>>({});
  
  const handleBuyIngredient = (id: string) => {
    const quantity = purchaseQuantity[id] || 0;
    if (quantity <= 0) return;
    
    dispatch({
      type: 'BUY_INGREDIENT',
      payload: { id, quantity }
    });
    
    // Reset quantity after purchase
    setPurchaseQuantity(prev => ({ ...prev, [id]: 0 }));
  };
  
  const handleSpiceLevelChange = (id: string, level: number) => {
    dispatch({
      type: 'ADJUST_SPICE_LEVEL',
      payload: { id, level }
    });
  };
  
  const renderSpiceLevel = (ingredient: Ingredient) => {
    return (
      <div className="flex items-center mt-2">
        <span className="text-xs mr-2">Spice:</span>
        <div className="flex space-x-1">
          {[0, 1, 2, 3, 4, 5].map(level => (
            <button
              key={level}
              className={`w-4 h-4 rounded-full ${
                level <= ingredient.spiceLevel 
                  ? 'bg-red-500' 
                  : 'bg-gray-200'
              }`}
              onClick={() => handleSpiceLevelChange(ingredient.id, level)}
              aria-label={`Set spice level to ${level}`}
            />
          ))}
        </div>
      </div>
    );
  };
  
  return (
    <div className="bg-amber-50 p-4 rounded-lg shadow-md">
      <h2 className="text-2xl font-bold text-red-800 mb-4">Inventory</h2>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {state.ingredients.map(ingredient => (
          <div key={ingredient.id} className="bg-white p-4 rounded-md shadow">
            <div className="flex justify-between items-start">
              <div>
                <span className="text-2xl mr-2">{ingredient.image}</span>
                <span className="font-bold">{ingredient.name}</span>
              </div>
              <div className="text-right">
                <div className="text-green-600 font-bold">¥{ingredient.currentPrice.toFixed(2)}</div>
                <div className="text-sm text-gray-500">
                  {ingredient.currentPrice > ingredient.basePrice 
                    ? <span className="text-red-500">↑</span> 
                    : ingredient.currentPrice < ingredient.basePrice 
                      ? <span className="text-green-500">↓</span> 
                      : null}
                </div>
              </div>
            </div>
            
            <div className="mt-2">
              <div className="text-sm">In stock: <span className="font-bold">{ingredient.quantity}</span></div>
              {renderSpiceLevel(ingredient)}
            </div>
            
            <div className="mt-4 flex items-center">
              <input
                type="number"
                min="0"
                value={purchaseQuantity[ingredient.id] || 0}
                onChange={(e) => setPurchaseQuantity({
                  ...purchaseQuantity,
                  [ingredient.id]: parseInt(e.target.value) || 0
                })}
                className="w-16 p-1 border border-gray-300 rounded mr-2"
              />
              <button
                onClick={() => handleBuyIngredient(ingredient.id)}
                className="bg-red-700 text-white px-3 py-1 rounded hover:bg-red-800 transition"
              >
                Buy
              </button>
              <div className="ml-2 text-sm">
                Cost: ¥{((purchaseQuantity[ingredient.id] || 0) * ingredient.currentPrice).toFixed(2)}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Inventory;
