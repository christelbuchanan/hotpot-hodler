import React, { createContext, useContext, useReducer, ReactNode } from 'react';
import { GameState } from '../types/game';
import { initialGameState } from '../data/initialGameState';

type GameAction = 
  | { type: 'BUY_INGREDIENT'; payload: { id: string; quantity: number } }
  | { type: 'ADJUST_SPICE_LEVEL'; payload: { id: string; level: number } }
  | { type: 'HIRE_STAFF'; payload: { id: string } }
  | { type: 'FIRE_STAFF'; payload: { id: string } }
  | { type: 'PURCHASE_UPGRADE'; payload: { id: string } }
  | { type: 'NEXT_DAY' }
  | { type: 'TRIGGER_EVENT'; payload: { id: string } }
  | { type: 'RESOLVE_EVENT'; payload: { id: string } };

interface GameContextType {
  state: GameState;
  dispatch: React.Dispatch<GameAction>;
}

const GameContext = createContext<GameContextType | undefined>(undefined);

function gameReducer(state: GameState, action: GameAction): GameState {
  switch (action.type) {
    case 'BUY_INGREDIENT': {
      const { id, quantity } = action.payload;
      const ingredient = state.ingredients.find(i => i.id === id);
      
      if (!ingredient) return state;
      
      const cost = ingredient.currentPrice * quantity;
      if (state.money < cost) return state; // Not enough money
      
      return {
        ...state,
        money: state.money - cost,
        ingredients: state.ingredients.map(i => 
          i.id === id ? { ...i, quantity: i.quantity + quantity } : i
        )
      };
    }
    
    case 'ADJUST_SPICE_LEVEL': {
      const { id, level } = action.payload;
      return {
        ...state,
        ingredients: state.ingredients.map(i => 
          i.id === id ? { ...i, spiceLevel: level } : i
        )
      };
    }
    
    case 'HIRE_STAFF': {
      const { id } = action.payload;
      const staff = state.staff.find(s => s.id === id);
      
      if (!staff || staff.hired) return state;
      if (state.money < staff.salary) return state; // Not enough money
      
      return {
        ...state,
        money: state.money - staff.salary, // Initial hiring cost
        staff: state.staff.map(s => 
          s.id === id ? { ...s, hired: true } : s
        )
      };
    }
    
    case 'FIRE_STAFF': {
      const { id } = action.payload;
      return {
        ...state,
        staff: state.staff.map(s => 
          s.id === id ? { ...s, hired: false } : s
        )
      };
    }
    
    case 'PURCHASE_UPGRADE': {
      const { id } = action.payload;
      const upgrade = state.upgrades.find(u => u.id === id);
      
      if (!upgrade || upgrade.purchased) return state;
      if (state.money < upgrade.cost) return state; // Not enough money
      
      // Apply upgrade effects
      let newState = {
        ...state,
        money: state.money - upgrade.cost,
        upgrades: state.upgrades.map(u => 
          u.id === id ? { ...u, purchased: true } : u
        )
      };
      
      // Apply specific upgrade effects
      switch (upgrade.effect.type) {
        case 'capacity':
          newState = {
            ...newState,
            restaurantCapacity: newState.restaurantCapacity + upgrade.effect.value
          };
          break;
        case 'ingredientCost':
          // This will be applied during price calculations
          break;
        case 'staffEfficiency':
          // This will be applied during staff performance calculations
          break;
        case 'customerSatisfaction':
          // This will be applied during satisfaction calculations
          break;
      }
      
      return newState;
    }
    
    case 'NEXT_DAY': {
      // Simulate a day of business
      const hiredStaff = state.staff.filter(s => s.hired);
      const staffExpenses = hiredStaff.reduce((sum, staff) => sum + staff.salary, 0);
      
      // Calculate staff efficiency
      const staffEfficiencyUpgrade = state.upgrades
        .filter(u => u.purchased && u.effect.type === 'staffEfficiency')
        .reduce((total, upgrade) => total + upgrade.effect.value, 0);
      
      const totalEfficiency = hiredStaff.reduce((sum, staff) => {
        return sum + staff.efficiency * (1 + staffEfficiencyUpgrade);
      }, 0);
      
      // Calculate number of customers based on reputation and capacity
      const potentialCustomers = Math.floor(state.reputation / 10) + 5;
      const actualCustomers = Math.min(potentialCustomers, state.restaurantCapacity);
      
      // Calculate revenue based on customers and satisfaction
      const satisfactionBonus = state.upgrades
        .filter(u => u.purchased && u.effect.type === 'customerSatisfaction')
        .reduce((total, upgrade) => total + upgrade.effect.value, 0);
      
      const baseRevenue = actualCustomers * (10 + (state.reputation / 10));
      const revenue = baseRevenue * (1 + (satisfactionBonus / 100));
      
      // Update ingredient prices with random fluctuations and event effects
      const updatedIngredients = state.ingredients.map(ingredient => {
        // Check if there's an active event affecting this ingredient
        const event = state.activeEvents.find(e => 
          e.effect.type === 'price' && e.effect.ingredientId === ingredient.id
        );
        
        const eventMultiplier = event ? event.effect.multiplier : 1;
        const randomFactor = 0.9 + Math.random() * 0.2; // Random factor between 0.9 and 1.1
        
        return {
          ...ingredient,
          currentPrice: Math.round(ingredient.basePrice * randomFactor * eventMultiplier * 100) / 100
        };
      });
      
      // Update active events (decrease duration, remove expired)
      const updatedEvents = state.activeEvents
        .map(event => ({
          ...event,
          duration: event.duration - 1
        }))
        .filter(event => event.duration > 0);
      
      // Calculate new reputation based on ingredient quality and staff
      const reputationChange = (totalEfficiency / 10) - (Math.random() * 5) + 2;
      const newReputation = Math.max(0, Math.min(100, state.reputation + reputationChange));
      
      return {
        ...state,
        day: state.day + 1,
        money: state.money + revenue - staffExpenses,
        reputation: newReputation,
        ingredients: updatedIngredients,
        activeEvents: updatedEvents,
        dailyCustomers: actualCustomers,
        dailyRevenue: revenue,
        dailyExpenses: staffExpenses
      };
    }
    
    case 'TRIGGER_EVENT': {
      const { id } = action.payload;
      const eventToTrigger = state.activeEvents.find(e => e.id === id);
      
      if (eventToTrigger) return state; // Event already active
      
      // Find the event from the available events (would be imported from data)
      // For now, we'll assume it exists and is valid
      const newEvent = { id, name: 'New Event', description: 'Description', duration: 3, effect: { type: 'price' as const, multiplier: 1.2 } };
      
      return {
        ...state,
        activeEvents: [...state.activeEvents, newEvent]
      };
    }
    
    case 'RESOLVE_EVENT': {
      const { id } = action.payload;
      return {
        ...state,
        activeEvents: state.activeEvents.filter(e => e.id !== id)
      };
    }
    
    default:
      return state;
  }
}

export const GameProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [state, dispatch] = useReducer(gameReducer, initialGameState);
  
  return (
    <GameContext.Provider value={{ state, dispatch }}>
      {children}
    </GameContext.Provider>
  );
};

export const useGame = () => {
  const context = useContext(GameContext);
  if (context === undefined) {
    throw new Error('useGame must be used within a GameProvider');
  }
  return context;
};
