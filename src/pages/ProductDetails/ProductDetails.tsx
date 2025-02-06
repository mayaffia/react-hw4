import React, { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
  Box,
} from "@mui/material";
import { addProduct } from "../../store/productSlice";

const ProductDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const product = useSelector((state) =>
    state.products.find((p) => p.id === id)
  );
  const [open, setOpen] = useState(false);
  const [updatedProduct, setUpdatedProduct] = useState(product);

  const handleEditOpen = () => setOpen(true);
  const handleEditClose = () => setOpen(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUpdatedProduct({ ...updatedProduct, [name]: value });
  };

  const handleEditSubmit = () => {
    dispatch(addProduct(updatedProduct));
    handleEditClose();
  };

  const handleDelete = () => {
    dispatch(deleteProduct(id));
    navigate("/products");
  };

  if (!product) {
    return <div>Продукт не найден</div>;
  }

  return (
    <Box mt={4} p={2}>
      <h2>Детали товара</h2>
      <p>Название: {product.name}</p>
      <p>Описание: {product.description}</p>
      <p>Категория: {product.category}</p>
      <p>Количество: {product.quantity}</p>
      <p>Цена: {product.price}</p>

      <Button variant="contained" color="primary" onClick={handleEditOpen}>
        Редактировать товар
      </Button>
      <Button
        variant="contained"
        color="secondary"
        onClick={handleDelete}
        style={{ marginLeft: "10px" }}
      >
        Удалить товар
      </Button>

      <Dialog open={open} onClose={handleEditClose}>
        <DialogTitle>Редактировать товар</DialogTitle>
        <DialogContent>
          <TextField
            label="Название"
            name="name"
            onChange={handleChange}
            value={updatedProduct.name}
            fullWidth
            required
          />
          <TextField
            label="Описание"
            name="description"
            onChange={handleChange}
            value={updatedProduct.description}
            fullWidth
            required
          />
          <TextField
            label="Категория"
            name="category"
            onChange={handleChange}
            value={updatedProduct.category}
            fullWidth
          />
          <TextField
            label="Количество"
            name="quantity"
            onChange={handleChange}
            value={updatedProduct.quantity}
            fullWidth
            required
          />
          <TextField
            label="Цена"
            name="price"
            onChange={handleChange}
            value={updatedProduct.price}
            fullWidth
            required
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleEditClose}>Отмена</Button>
          <Button onClick={handleEditSubmit} color="primary">
            Сохранить
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default ProductDetails;

function deleteProduct(id: string | undefined): any {
  throw new Error("Function not implemented.");
}
