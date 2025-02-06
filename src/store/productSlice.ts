import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  products: [
    {
    "id": 1,
    "name": "Продукт 1",
    "description": "Это описание товара. Очень длинное прям очень очень очень очень очень очень очень очень очень очень очень очень очень очень очень очень очень очень очень очень ",
    "category": "Категория 1",
    "quantity": 10,
    "unit": "шт",
    "image": ""
  },
  {
    "id": 2,
    "name": "Продукт 2",
    "description": "длинное описание чтобы проверить скроллинг в модалке \n ывагмыдшвоамжышоваломтыдвывагмыдшвоамжышова \n ломтыдволамдоывадмывагмыдшвоамжышоваломты \n дволамдоывадмывагмыдшвоамж\n ышоваломтыдволамдоывадмывагмыдшво\nамжышоваломтыдволамдоывламдоыва \n дмывагмыдшвоамжышоваломтыдволамдоывадмываг\n мыдшвоамжышоваломтыдволамдоывадмывагм\n ыдшвоамжышоваломтыдвола\n мдоывадмывагмыдшвоамжышовал\n омтыдволамдоывадмывагмыдшво\n амжышоваломтыдволамдоывадмывагмыд\n швоамжышоваломтыдволамдоывадмоламдоывадмо",
    "category": "Категория 2",
    "quantity": 10,
    "unit": "кг",
    "image": ""
  },
  {
    "id": 3,
    "name": "Продукт 3",
    "description": "Описание товара каоке-то",
    "category": "Категория 3",
    "quantity": 10,
    "unit": "шт",
    "image": ""
  },
  {
    "id": 4,
    "name": "Продукт 4",
    "description": "Описание товара 4",
    "category": "Категория 1",
    "quantity": 10,
    "unit": "шт",
    "image": ""
  },
  {
    "id": 5,
    "name": "Продукт 5",
    "description": "Описание товара 5",
    "category": "Категория 4",
    "quantity": 10,
    "unit": "шт",
    "image": ""
  },
  {
    "id": 6,
    "name": "Продукт 6",
    "description": "Описание товара 6",
    "category": "Категория 2",
    "quantity": 10,
    "unit": "кг",
    "image": ""
  },
  {
    "id": 7,
    "name": "Продукт 7",
    "description": "Описание товара 7",
    "category": "Категория 1",
    "quantity": 10,
    "unit": "л",
    "image": ""
  },
  {
    "id": 8,
    "name": "Продукт 8",
    "description": "Описание товара 8",
    "category": "Категория 3",
    "quantity": 10,
    "unit": "шт",
    "image": ""
  },
  {
    "id": 9,
    "name": "Продукт 9",
    "description": "Описание товара 9",
    "category": "Категория 1",
    "quantity": 10,
    "unit": "шт",
    "image": ""
  },
  {
    "id": 10,
    "name": "Продукт 10",
    "description": "Описание товара 10",
    "category": "Категория 4",
    "quantity": 10,
    "unit": "шт",
    "image": ""
  }
]
};

const productSlice = createSlice({
  name: 'products',
  initialState,
  reducers: {
    addProduct: (state, action) => {
      state.products.push(action.payload);
    },
    removeProduct: (state, action) => {
      state.products = state.products.filter(product => product.id !== action.payload);
    }
  }
});

export const { addProduct, removeProduct } = productSlice.actions;
export default productSlice.reducer;
