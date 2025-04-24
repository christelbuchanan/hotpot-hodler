import React from 'react';
import { useGame } from '../context/GameContext';

const GameControls: React.FC = () => {
  const { dispatch } = useGame();
  
  const handleNextDay = () => {
    dispatch({ type: 'NEXT_DAY' });
  };
  
  return (
    <div className="fixed bottom-4 right-4">
      <button
        onClick={handleNextDay}
        className="bg-red-700 text-white px-6 py-3 rounded-full shadow-lg hover:bg-red-800 transition-colors flex items-center"
      >
        <span className="mr-2">Next Day</span>
        <span className="text-xl">→</span>
      </button>
    </div>
  );
};

export default GameControls;
