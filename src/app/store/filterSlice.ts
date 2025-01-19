import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { FilterState } from './types';

const initialState: FilterState = {
  searchQuery: '',
  categories: [],
  priceRange: {
    min: 0,
    max: 10000,
  },
  playerCount: '',
  playTime: '',
  age: '',
  inStock: null,
  sortBy: 'rating',
};

const filterSlice = createSlice({
  name: 'filter',
  initialState,
  reducers: {
    setSearchQuery: (state, action: PayloadAction<string>) => {
      state.searchQuery = action.payload;
    },
    toggleCategory: (state, action: PayloadAction<string>) => {
      const category = action.payload;
      const index = state.categories.indexOf(category);
      if (index === -1) {
        state.categories.push(category);
      } else {
        state.categories.splice(index, 1);
      }
    },
    setPriceRange: (state, action: PayloadAction<{ min: number; max: number }>) => {
      state.priceRange = action.payload;
    },
    setPlayerCount: (state, action: PayloadAction<string>) => {
      state.playerCount = action.payload;
    },
    setPlayTime: (state, action: PayloadAction<string>) => {
      state.playTime = action.payload;
    },
    setAge: (state, action: PayloadAction<string>) => {
      state.age = action.payload;
    },
    setInStock: (state, action: PayloadAction<boolean | null>) => {
      state.inStock = action.payload;
    },
    setSortBy: (state, action: PayloadAction<FilterState['sortBy']>) => {
      state.sortBy = action.payload;
    },
    resetFilters: () => initialState,
  },
});

export const {
  setSearchQuery,
  toggleCategory,
  setPriceRange,
  setPlayerCount,
  setPlayTime,
  setAge,
  setInStock,
  setSortBy,
  resetFilters,
} = filterSlice.actions;

export default filterSlice.reducer;
