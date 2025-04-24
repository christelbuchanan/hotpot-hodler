import React from 'react';
import { useGame } from '../context/GameContext';

const Dashboard: React.FC = () => {
  const { state } = useGame();
  
  return (
    <div className="bg-amber-50 p-4 rounded-lg shadow-md">
      <h2 className="text-2xl font-bold text-red-800 mb-4">Restaurant Dashboard</h2>
      
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="bg-white p-3 rounded-md shadow">
          <div className="text-gray-500 text-sm">Day</div>
          <div className="text-xl font-bold">{state.day}</div>
        </div>
        
        <div className="bg-white p-3 rounded-md shadow">
          <div className="text-gray-500 text-sm">Money</div>
          <div className="text-xl font-bold text-green-600">¥{state.money.toFixed(2)}</div>
        </div>
        
        <div className="bg-white p-3 rounded-md shadow">
          <div className="text-gray-500 text-sm">Reputation</div>
          <div className="text-xl font-bold text-blue-600">{state.reputation.toFixed(1)}/100</div>
        </div>
        
        <div className="bg-white p-3 rounded-md shadow">
          <div className="text-gray-500 text-sm">Capacity</div>
          <div className="text-xl font-bold">{state.restaurantCapacity} seats</div>
        </div>
      </div>
      
      <div className="mt-4 grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-white p-3 rounded-md shadow">
          <div className="text-gray-500 text-sm">Daily Customers</div>
          <div className="text-xl font-bold">{state.dailyCustomers}</div>
        </div>
        
        <div className="bg-white p-3 rounded-md shadow">
          <div className="text-gray-500 text-sm">Daily Revenue</div>
          <div className="text-xl font-bold text-green-600">¥{state.dailyRevenue.toFixed(2)}</div>
        </div>
        
        <div className="bg-white p-3 rounded-md shadow">
          <div className="text-gray-500 text-sm">Daily Expenses</div>
          <div className="text-xl font-bold text-red-600">¥{state.dailyExpenses.toFixed(2)}</div>
        </div>
      </div>
      
      {state.activeEvents.length > 0 && (
        <div className="mt-4">
          <h3 className="text-lg font-semibold text-red-800 mb-2">Active Events</h3>
          <div className="bg-red-50 p-3 rounded-md border border-red-200">
            {state.activeEvents.map(event => (
              <div key={event.id} className="mb-2 last:mb-0">
                <div className="font-bold">{event.name}</div>
                <div className="text-sm">{event.description}</div>
                <div className="text-xs text-gray-500">Days remaining: {event.duration}</div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default Dashboard;
