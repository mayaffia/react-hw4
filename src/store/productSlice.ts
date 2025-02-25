
import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import axios from 'axios';
import { Product } from '../types/types';

interface ProductListState {
  products: Product[];
  loading: boolean;
  error: string | null;
}

const initialState: ProductListState = {
  products: [],
  loading: false,
  error: null,
};

const axiosInstance = axios.create({
  baseURL: 'http://localhost:3000/api',
});


export const fetchProducts = createAsyncThunk('productList/fetchProducts', async () => {
  const response = await axiosInstance.get<Product[]>('/products');
  return response.data;
});

export const addProduct = createAsyncThunk(
  'productList/addProduct',
  async (newProduct) => {
    console.log(newProduct)
    const productPayload = {
      name: newProduct.name,
      description: newProduct.description,
      categoryName: newProduct.category,
      quantity: newProduct.quantity,
      price: newProduct.price
    };

    const response = await axiosInstance.post<Product>('/products', productPayload);
    console.log(response.data);
    return response.data;
  }
);

export const editProduct = createAsyncThunk('productList/editProduct', async (updatedProduct: Product) => {
  const response = await axiosInstance.put<Product>(`/products/${updatedProduct.id}`, updatedProduct);
  return response.data;
});

export const deleteProduct = createAsyncThunk('productList/deleteProduct', async (id: number) => {
  await axiosInstance.delete(`/products/${id}`);
  return id;
});

const productListSlice = createSlice({
  name: 'productList',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchProducts.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchProducts.fulfilled, (state, action: PayloadAction<Product[]>) => {
        state.loading = false;
        state.products = action.payload;
        console.log(state.products);
        console.log(action.payload);
      })
      .addCase(fetchProducts.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Failed to load products';
      })
      .addCase(addProduct.fulfilled, (state, action: PayloadAction<Product>) => {
        state.products.push(action.payload);
      })
      .addCase(editProduct.fulfilled, (state, action: PayloadAction<Product>) => {
        const index = state.products.findIndex(product => product._id === action.payload.id);
        if (index !== -1) {
          state.products[index] = action.payload;
        }
      })
      .addCase(deleteProduct.fulfilled, (state, action: PayloadAction<number>) => {
        state.products = state.products.filter(product => product._id !== action.payload);
      });
  },
});

export default productListSlice.reducer;