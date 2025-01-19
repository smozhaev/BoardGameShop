export interface FilterState {
  searchQuery: string;
  categories: string[];
  priceRange: {
    min: number;
    max: number;
  };
  playerCount: string;
  playTime: string;
  age: string;
  inStock: boolean | null;
  sortBy: 'price_asc' | 'price_desc' | 'rating' | 'name';
}

export interface RootState {
  filter: FilterState;
}
