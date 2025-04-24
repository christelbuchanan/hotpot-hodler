export interface Ingredient {
  id: string;
  name: string;
  basePrice: number;
  currentPrice: number;
  quantity: number;
  spiceLevel: number; // 0-5 scale
  image?: string;
}

export interface Staff {
  id: string;
  name: string;
  role: 'chef' | 'server' | 'manager';
  salary: number;
  efficiency: number; // 1-10 scale
  hired: boolean;
  image?: string;
}

export interface Upgrade {
  id: string;
  name: string;
  description: string;
  cost: number;
  purchased: boolean;
  effect: {
    type: 'customerSatisfaction' | 'ingredientCost' | 'staffEfficiency' | 'capacity';
    value: number;
  };
  image?: string;
}

export interface Customer {
  id: string;
  name: string;
  spicePreference: number; // 0-5 scale
  satisfaction: number; // 0-100 scale
  spending: number;
  image?: string;
}

export interface MarketEvent {
  id: string;
  name: string;
  description: string;
  duration: number; // in game days
  effect: {
    ingredientId?: string; // if affects specific ingredient
    type: 'price' | 'demand' | 'satisfaction';
    multiplier: number;
  };
}

export interface GameState {
  day: number;
  money: number;
  reputation: number; // 0-100 scale
  ingredients: Ingredient[];
  staff: Staff[];
  upgrades: Upgrade[];
  customers: Customer[];
  activeEvents: MarketEvent[];
  restaurantCapacity: number;
  dailyCustomers: number;
  dailyRevenue: number;
  dailyExpenses: number;
}
