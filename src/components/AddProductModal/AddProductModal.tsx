import React, { useState } from "react";
import { useDispatch } from "react-redux";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
} from "@mui/material";
import { addProduct } from "../../store/productSlice";

const AddProductModal = () => {
  const [open, setOpen] = useState(false);
  const [newProduct, setNewProduct] = useState({
    name: "",
    description: "",
    category: "",
    quantity: "",
    price: "",
  });
  const dispatch = useDispatch();

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setNewProduct({ ...newProduct, [name]: value });
  };

  const handleSubmit = () => {
    const { name, description, quantity, price } = newProduct;
    if (name && description && quantity && price) {
      const id = Math.random().toString(36).substr(2, 9);
      dispatch(addProduct({ ...newProduct, id }));
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
          />
          <TextField
            label="Описание"
            name="description"
            onChange={handleChange}
            fullWidth
            required
          />
          <TextField
            label="Категория"
            name="category"
            onChange={handleChange}
            fullWidth
          />
          <TextField
            label="Количество"
            name="quantity"
            onChange={handleChange}
            fullWidth
            required
          />
          <TextField
            label="Цена"
            name="price"
            onChange={handleChange}
            fullWidth
            required
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
