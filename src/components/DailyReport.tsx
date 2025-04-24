import React from 'react';
import { useGame } from '../context/GameContext';

interface DailyReportProps {
  isOpen: boolean;
  onClose: () => void;
}

const DailyReport: React.FC<DailyReportProps> = ({ isOpen, onClose }) => {
  const { state } = useGame();
  
  if (!isOpen) return null;
  
  const profit = state.dailyRevenue - state.dailyExpenses;
  
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg shadow-xl p-6 max-w-md w-full">
        <h2 className="text-2xl font-bold text-red-800 mb-4">Day {state.day - 1} Report</h2>
        
        <div className="space-y-4">
          <div className="bg-amber-50 p-3 rounded">
            <h3 className="font-bold text-lg">Customers</h3>
            <p>You served <span className="font-bold">{state.dailyCustomers}</span> customers today.</p>
          </div>
          
          <div className="bg-green-50 p-3 rounded">
            <h3 className="font-bold text-lg text-green-800">Revenue</h3>
            <p className="text-xl font-bold text-green-600">¥{state.dailyRevenue.toFixed(2)}</p>
          </div>
          
          <div className="bg-red-50 p-3 rounded">
            <h3 className="font-bold text-lg text-red-800">Expenses</h3>
            <p className="text-xl font-bold text-red-600">¥{state.dailyExpenses.toFixed(2)}</p>
          </div>
          
          <div className={`p-3 rounded font-bold text-lg ${profit >= 0 ? 'bg-green-100' : 'bg-red-100'}`}>
            <h3 className="font-bold">Profit</h3>
            <p className={`text-xl ${profit >= 0 ? 'text-green-600' : 'text-red-600'}`}>
              ¥{profit.toFixed(2)}
            </p>
          </div>
          
          <div className="bg-blue-50 p-3 rounded">
            <h3 className="font-bold text-lg text-blue-800">Reputation</h3>
            <p>Your restaurant reputation is now <span className="font-bold">{state.reputation.toFixed(1)}/100</span></p>
          </div>
        </div>
        
        <button
          onClick={onClose}
          className="mt-6 w-full bg-red-700 text-white py-2 rounded hover:bg-red-800 transition"
        >
          Continue to Day {state.day}
        </button>
      </div>
    </div>
  );
};

export default DailyReport;
