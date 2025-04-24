import { GameState, Ingredient, Staff, Upgrade, MarketEvent } from '../types/game';

export const initialIngredients: Ingredient[] = [
  {
    id: 'beef',
    name: 'Sliced Beef',
    basePrice: 20,
    currentPrice: 20,
    quantity: 10,
    spiceLevel: 0,
    image: '🥩'
  },
  {
    id: 'tofu',
    name: 'Tofu',
    basePrice: 5,
    currentPrice: 5,
    quantity: 15,
    spiceLevel: 0,
    image: '🧊'
  },
  {
    id: 'mushroom',
    name: 'Mushrooms',
    basePrice: 8,
    currentPrice: 8,
    quantity: 15,
    spiceLevel: 0,
    image: '🍄'
  },
  {
    id: 'noodles',
    name: 'Noodles',
    basePrice: 6,
    currentPrice: 6,
    quantity: 20,
    spiceLevel: 0,
    image: '🍜'
  },
  {
    id: 'chili',
    name: 'Chili Oil',
    basePrice: 10,
    currentPrice: 10,
    quantity: 8,
    spiceLevel: 5,
    image: '🌶️'
  }
];

export const initialStaff: Staff[] = [
  {
    id: 'chef1',
    name: 'Chef Wang',
    role: 'chef',
    salary: 50,
    efficiency: 5,
    hired: true,
    image: '👨‍🍳'
  },
  {
    id: 'server1',
    name: 'Server Li',
    role: 'server',
    salary: 30,
    efficiency: 4,
    hired: true,
    image: '🧑‍🍳'
  },
  {
    id: 'chef2',
    name: 'Master Chef Zhang',
    role: 'chef',
    salary: 100,
    efficiency: 8,
    hired: false,
    image: '👨‍🍳'
  },
  {
    id: 'server2',
    name: 'Server Chen',
    role: 'server',
    salary: 40,
    efficiency: 6,
    hired: false,
    image: '👩‍🍳'
  },
  {
    id: 'manager1',
    name: 'Manager Liu',
    role: 'manager',
    salary: 120,
    efficiency: 7,
    hired: false,
    image: '🧑‍💼'
  }
];

export const initialUpgrades: Upgrade[] = [
  {
    id: 'better-pots',
    name: 'Premium Hotpot Pots',
    description: 'Better quality pots increase customer satisfaction',
    cost: 200,
    purchased: false,
    effect: {
      type: 'customerSatisfaction',
      value: 10
    },
    image: '🍲'
  },
  {
    id: 'bulk-supplier',
    name: 'Bulk Ingredient Supplier',
    description: 'Reduces the cost of ingredients by 10%',
    cost: 300,
    purchased: false,
    effect: {
      type: 'ingredientCost',
      value: -0.1
    },
    image: '📦'
  },
  {
    id: 'staff-training',
    name: 'Staff Training Program',
    description: 'Increases staff efficiency by 20%',
    cost: 250,
    purchased: false,
    effect: {
      type: 'staffEfficiency',
      value: 0.2
    },
    image: '📚'
  },
  {
    id: 'expansion',
    name: 'Restaurant Expansion',
    description: 'Increases restaurant capacity by 5 customers',
    cost: 500,
    purchased: false,
    effect: {
      type: 'capacity',
      value: 5
    },
    image: '🏗️'
  }
];

export const marketEvents: MarketEvent[] = [
  {
    id: 'beef-shortage',
    name: 'Beef Shortage',
    description: 'A temporary beef shortage has increased prices!',
    duration: 3,
    effect: {
      ingredientId: 'beef',
      type: 'price',
      multiplier: 1.5
    }
  },
  {
    id: 'tourist-season',
    name: 'Tourist Season',
    description: 'More tourists are visiting, increasing demand!',
    duration: 5,
    effect: {
      type: 'demand',
      multiplier: 1.3
    }
  },
  {
    id: 'food-critic',
    name: 'Food Critic Visit',
    description: 'A famous food critic is in town. Customer satisfaction matters more!',
    duration: 2,
    effect: {
      type: 'satisfaction',
      multiplier: 1.5
    }
  }
];

export const initialGameState: GameState = {
  day: 1,
  money: 500,
  reputation: 50,
  ingredients: initialIngredients,
  staff: initialStaff,
  upgrades: initialUpgrades,
  customers: [],
  activeEvents: [],
  restaurantCapacity: 10,
  dailyCustomers: 0,
  dailyRevenue: 0,
  dailyExpenses: 0
};
