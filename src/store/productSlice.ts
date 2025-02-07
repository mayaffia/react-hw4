import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Product, ProductState } from '../types/types';



const initialState: ProductState = {
  products: [
    {
    "id": 1,
    "name": "Продукт 1",
    "description": "Это описание товара. Очень длинное прям очень очень очень очень очень очень очень очень очень очень очень очень очень очень очень очень очень очень очень очень ",
    "category": "Категория 1",
    "quantity": 10,
    "unit": "шт",
    "image": "",
    "price": 100
  },
  {
    "id": 2,
    "name": "Продукт 2",
    "description": "длинное описание чтобы проверить скроллинг в модалке \n ывагмыдшвоамжышоваломтыдвывагмыдшвоамжышова \n ломтыдволамдоывадмывагмыдшвоамжышоваломты \n дволамдоывадмывагмыдшвоамж\n ышоваломтыдволамдоывадмывагмыдшво\nамжышоваломтыдволамдоывламдоыва \n дмывагмыдшвоамжышоваломтыдволамдоывадмываг\n мыдшвоамжышоваломтыдволамдоывадмывагм\n ыдшвоамжышоваломтыдвола\n мдоывадмывагмыдшвоамжышовал\n омтыдволамдоывадмывагмыдшво\n амжышоваломтыдволамдоывадмывагмыд\n швоамжышоваломтыдволамдоывадмоламдоывадмо",
    "category": "Категория 2",
    "quantity": 10,
    "unit": "кг",
    "image": "",
    "price": 100
  },
  {
    "id": 3,
    "name": "Продукт 3",
    "description": "Описание товара каоке-то",
    "category": "Категория 3",
    "quantity": 10,
    "unit": "шт",
    "image": "",
    "price": 100
  },
  {
    "id": 4,
    "name": "Продукт 4",
    "description": "Описание товара 4",
    "category": "Категория 1",
    "quantity": 10,
    "unit": "шт",
    "image": "",
    "price": 100
  },
  {
    "id": 5,
    "name": "Продукт 5",
    "description": "Описание товара 5",
    "category": "Категория 4",
    "quantity": 10,
    "unit": "шт",
    "image": "",
    "price": 100
  },
  {
    "id": 6,
    "name": "Продукт 6",
    "description": "Описание товара 6",
    "category": "Категория 2",
    "quantity": 10,
    "unit": "кг",
    "image": "",
    "price": 100
  },
  {
    "id": 7,
    "name": "Продукт 7",
    "description": "Описание товара 7",
    "category": "Категория 1",
    "quantity": 10,
    "unit": "л",
    "image": "",
    "price": 100
  },
  {
    "id": 8,
    "name": "Продукт 8",
    "description": "Описание товара 8",
    "category": "Категория 3",
    "quantity": 10,
    "unit": "шт",
    "image": "",
    "price": 100
  },
  {
    "id": 9,
    "name": "Продукт 9",
    "description": "Описание товара 9",
    "category": "Категория 1",
    "quantity": 10,
    "unit": "шт",
    "image": "",
    "price": 100
  },
  {
    "id": 10,
    "name": "Продукт 10",
    "description": "Описание товара 10",
    "category": "Категория 4",
    "quantity": 10,
    "unit": "шт",
    "image": "",
    "price": 100
  }
]
};


const productSlice = createSlice({
  name: 'products',
  initialState,
  reducers: {
    addProduct: (state, action: PayloadAction<Product>) => {
      state.products.push(action.payload);
    },
    editProduct: (state, action: PayloadAction<Product>) => {
      const index = state.products.findIndex(product => product.id === action.payload.id);

      if (index !== -1) {
        state.products[index] = {
          ...state.products[index],
          ...action.payload
        };
      }
    },
    removeProduct: (state, action: PayloadAction<number>) => {
      state.products = state.products.filter(product => product.id !== action.payload);
    }
  }
});

export const { addProduct, editProduct, removeProduct } = productSlice.actions;
export default productSlice.reducer;