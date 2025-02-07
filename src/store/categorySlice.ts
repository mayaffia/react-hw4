import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Category } from '../types/types';


const initialState: Category[] = [
  {
    id: '1',
    name: 'Категория 1'
  },
  {
    id: '2',
    name: 'Категория 2'
  },
  {
    id: '3',
    name: 'Категория 3'
  },
  {
    id: '4',
    name: 'Категория 4'
  },
  {
    id: '5',
    name: 'Категория 5'
  }
];

const categorySlice = createSlice({
  name: 'categories',
  initialState,
  reducers: {
    addCategory: (state, action: PayloadAction<Category>) => {
      state.push(action.payload);
    },
    editCategory: (state, action: PayloadAction<Category>) => {
      const index = state.findIndex(category => category.id === action.payload.id);
      if (index !== -1) {
        state[index] = action.payload;
      }
    },
    deleteCategory: (state, action: PayloadAction<string>) => {
      return state.filter(category => category.id !== action.payload);
    },
  },
});

export const { addCategory, editCategory, deleteCategory } = categorySlice.actions;
export default categorySlice.reducer;