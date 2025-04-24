import React from 'react';
import { useGame } from '../context/GameContext';

const Staff: React.FC = () => {
  const { state, dispatch } = useGame();
  
  const handleHireStaff = (id: string) => {
    dispatch({
      type: 'HIRE_STAFF',
      payload: { id }
    });
  };
  
  const handleFireStaff = (id: string) => {
    dispatch({
      type: 'FIRE_STAFF',
      payload: { id }
    });
  };
  
  const getRoleColor = (role: string) => {
    switch (role) {
      case 'chef': return 'text-red-600';
      case 'server': return 'text-blue-600';
      case 'manager': return 'text-purple-600';
      default: return 'text-gray-600';
    }
  };
  
  return (
    <div className="bg-amber-50 p-4 rounded-lg shadow-md">
      <h2 className="text-2xl font-bold text-red-800 mb-4">Staff Management</h2>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {state.staff.map(staff => (
          <div key={staff.id} className="bg-white p-4 rounded-md shadow">
            <div className="flex justify-between items-start">
              <div>
                <span className="text-2xl mr-2">{staff.image}</span>
                <span className="font-bold">{staff.name}</span>
              </div>
              <div className={`capitalize font-medium ${getRoleColor(staff.role)}`}>
                {staff.role}
              </div>
            </div>
            
            <div className="mt-2">
              <div className="text-sm">Salary: <span className="font-bold text-green-600">¥{staff.salary}/day</span></div>
              <div className="text-sm">Efficiency: <span className="font-bold">{staff.efficiency}/10</span></div>
            </div>
            
            <div className="mt-4">
              {staff.hired ? (
                <button
                  onClick={() => handleFireStaff(staff.id)}
                  className="bg-red-100 text-red-700 px-3 py-1 rounded hover:bg-red-200 transition"
                >
                  Fire
                </button>
              ) : (
                <button
                  onClick={() => handleHireStaff(staff.id)}
                  className="bg-green-600 text-white px-3 py-1 rounded hover:bg-green-700 transition"
                  disabled={state.money < staff.salary}
                >
                  Hire for ¥{staff.salary}
                </button>
              )}
              {state.money < staff.salary && !staff.hired && (
                <div className="text-xs text-red-500 mt-1">Not enough money!</div>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Staff;
