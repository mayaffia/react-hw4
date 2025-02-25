import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
  FormHelperText,
} from "@mui/material";
import { addProduct, fetchProducts } from "../../store/productSlice";
import { RootState } from "../../store/store";
import { fetchCategories } from "../../store/categorySlice";

const AddProductModal = () => {
  const [open, setOpen] = useState(false);
  const [newProduct, setNewProduct] = useState({
    name: "",
    description: "",
    category: "",
    quantity: "",
    price: "",
  });
  const [categoryError, setCategoryError] = useState("");
  const [quantityError, setQuantityError] = useState("");
  const [priceError, setPriceError] = useState("");

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchProducts());
    dispatch(fetchCategories())
  }, [dispatch]);
  
  const categories = useSelector((state: RootState) => state.categories.categories);
  console.log(categories)

  const handleOpen = () => setOpen(true);

  const handleClose = () => {
    setOpen(false);
    setNewProduct({
      name: "",
      description: "",
      category: "",
      quantity: "",
      price: "",
    });
    setCategoryError("");
    setQuantityError("");
    setPriceError("");
  };

  const handleChange = (e) => {
    const { name, value } = e.target;

    setNewProduct({ ...newProduct, [name]: value });

    if (name === "category") {
      setCategoryError("");
    }
  };

  const handleSubmit = () => {
    const { name, description, category, quantity, price } = newProduct;

    const categoryExists = categories.some(
      (cat) => cat.name.toLowerCase() === category.toLowerCase()
    );

    if (!categoryExists) {
      setCategoryError(
        "Эта категория не существует. Пожалуйста, выберите существующую категорию."
      );
      return;
    }

    if (!quantity || !price) {
      alert("Пожалуйста, заполните все обязательные поля.");
      return;
    }

    if (name && description && quantity && price) {
      dispatch(addProduct({
        ...newProduct,
      }));
      handleClose();
    } else {
      alert("Пожалуйста, заполните все обязательные поля.");
    }
  };

  return (
    <div
      style={{
        marginBottom: "100px",
        marginTop: "30px",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Button variant="contained" color="primary" onClick={handleOpen}>
        Добавить товар
      </Button>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Добавить новый товар</DialogTitle>

        <DialogContent>
          <TextField
            label="Название"
            name="name"
            onChange={handleChange}
            fullWidth
            required
            value={newProduct.name}
          />
          <TextField
            label="Описание"
            name="description"
            onChange={handleChange}
            fullWidth
            required
            value={newProduct.description}
          />
          <TextField
            label="Категория"
            name="category"
            onChange={handleChange}
            fullWidth
            required
            value={newProduct.category}
            error={!!categoryError}
          />
          {categoryError && (
            <FormHelperText error>{categoryError}</FormHelperText>
          )}
          <TextField
            label="Количество"
            name="quantity"
            onChange={handleChange}
            fullWidth
            required
            value={newProduct.quantity}
            type="number"
            error={!!quantityError}
          />
          <TextField
            label="Цена"
            name="price"
            onChange={handleChange}
            fullWidth
            required
            value={newProduct.price}
            type="number"
            error={!!priceError}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Отмена</Button>
          <Button onClick={handleSubmit} color="primary">
            Сохранить
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default AddProductModal;
