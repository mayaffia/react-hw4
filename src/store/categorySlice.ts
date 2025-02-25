import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import axios from 'axios';

interface Category {
  id: string;
  name: string;
}

interface CategoryState {
  categories: Category[];
  isLoading: boolean;
  error: string | null;
}

const initialState: CategoryState = {
  categories: [],
  isLoading: false,
  error: null,
};

const axiosInstance = axios.create({
  baseURL: 'http://localhost:3000/api',
});

export const fetchCategories = createAsyncThunk<Category[]>(
  'categories/fetchCategories',
  async () => {
    const response = await axiosInstance.get('/categories');
    console.log(response.data);
    return response.data;
  }
);

export const addCategory = createAsyncThunk<Category, Category>(
  'categories/addCategory',
  async (newCategory) => {
    const response = await axiosInstance.post('/categories', newCategory);
    return response.data;
  }
);

export const editCategory = createAsyncThunk<Category, Category>(
  'categories/editCategory',
  async (category) => {
    const response = await axiosInstance.put(`/categories/${category.id}`, category);
    return response.data;
  }
);

export const deleteCategory = createAsyncThunk<string, string>(
  'categories/deleteCategory',
  async (id) => {
    await axiosInstance.delete(`/categories/${id}`);
    return id;
  }
);

const categorySlice = createSlice({
  name: 'categories',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchCategories.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchCategories.fulfilled, (state, action: PayloadAction<Category[]>) => {
        state.isLoading = false;
        state.categories = action.payload;
        console.log(action.payload)
      })
      .addCase(fetchCategories.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message || 'Could not fetch categories';
      })
      
      .addCase(addCategory.fulfilled, (state, action: PayloadAction<Category>) => {
        state.categories.push(action.payload);
      })
      
      .addCase(editCategory.fulfilled, (state, action: PayloadAction<Category>) => {
        const index = state.categories.findIndex(cat => cat._id === action.payload.id);
        if (index !== -1) {
          state.categories[index] = action.payload;
        }
      })
      
      .addCase(deleteCategory.fulfilled, (state, action: PayloadAction<string>) => {
        console.log(action.payload)
        state.categories = state.categories.filter(cat => cat._id !== action.payload);
        console.log(state.categories)
      });
  },
});

export default categorySlice.reducer;