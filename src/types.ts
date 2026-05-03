export interface MenuItem {
  id: string;
  name: string;
  description: string;
  price: number;
  calories: number;
  portionSize: string;
  category: 'Breakfast' | 'Morning Refreshment' | 'Lunch' | 'Evening Refreshment' | 'Dinner';
  imageUrl: string;
  isAvailable: boolean;
  isSpecial: boolean;
  allergens: string;
  prepTime: string;
  rating: number;
}

export type MealCategory = 'All' | 'Breakfast' | 'Morning Refreshment' | 'Lunch' | 'Evening Refreshment' | 'Dinner';
