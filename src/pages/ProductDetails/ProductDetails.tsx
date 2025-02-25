import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import {
  Button,
  TextField,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Typography,
  Box,
  FormHelperText,
} from "@mui/material";
import { RootState } from "../../store/store";
import { editProduct, deleteProduct, fetchProducts } from "../../store/productSlice";
import NavBar from "../../components/NavBar/NavBar";
import { fetchCategories } from "../../store/categorySlice";

const ProductDetailsPage: React.FC = () => {
  const { productId } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);
  const [categoryError, setCategoryError] = useState("");

  useEffect(() => {
    dispatch(fetchProducts());
    dispatch(fetchCategories())
  }, [dispatch]);

  const categories = useSelector((state: RootState) => state.categories.categories);
  const product = useSelector((state: RootState) =>
    state.products.products.find((product) => product.id === Number(productId))
  );

  const [formValues, setFormValues] = useState({
    name: product?.name || "",
    description: product?.description || "",
    category: product?.category || "",
    quantity: product?.quantity.toString() || "0",
    price: product?.price || 0,
  });

  useEffect(() => {
    if (
      !categories?.some(
        (cat) => cat.name.toLowerCase() === formValues.category.toLowerCase()
      )
    ) {
      setCategoryError(
        "Эта категория не существует. Выберите существующую категорию."
      );
    } else {
      setCategoryError("");
    }
  }, [formValues.category, categories]);

  if (!product) {
    return <Typography>Товар не найден</Typography>;
  }

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormValues({
      ...formValues,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = () => {
    if (categoryError) {
      alert(categoryError);
      return;
    }

    const updatedProduct = {
      ...formValues,
      quantity: Number(formValues.quantity),
      price: Number(formValues.price),
    };

    dispatch(
      editProduct({
        id: Number(productId),
        ...updatedProduct,
        unit: "",
        image: "",
      })
    );
    handleClose();
  };

  const handleDelete = () => {
    dispatch(deleteProduct(Number(productId)));
    navigate("/");
  };

  const goToMainPage = () => {
    navigate("/");
  };

  return (
    <>
      <NavBar />
      <Box sx={{ p: 3 }} marginTop="80px">
        <Typography variant="h4">{product.name}</Typography>
        <Typography>Описание: {product.description}</Typography>
        <Typography>Категория: {product.category}</Typography>
        <Typography>Количество: {product.quantity}</Typography>
        <Typography>Цена: {product.price}</Typography>

        <Button variant="contained" color="primary" onClick={handleOpen}>
          Редактировать товар
        </Button>
        <Button
          variant="contained"
          color="secondary"
          onClick={handleDelete}
          style={{ marginLeft: "20px" }}
        >
          Удалить товар
        </Button>
        <Button
          variant="contained"
          color="secondary"
          onClick={goToMainPage}
          style={{ marginLeft: "20px" }}
        >
          Назад
        </Button>

        <Dialog open={open} onClose={handleClose}>
          <DialogTitle>Редактировать продукт</DialogTitle>

          <DialogContent>
            <TextField
              label="Название"
              name="name"
              onChange={handleChange}
              fullWidth
              value={formValues.name}
              required
            />
            <TextField
              label="Описание"
              name="description"
              onChange={handleChange}
              fullWidth
              value={formValues.description}
              required
            />
            <TextField
              label="Категория"
              name="category"
              onChange={handleChange}
              fullWidth
              value={formValues.category}
              required
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
              value={formValues.quantity}
              required
              type="number"
            />
            <TextField
              label="Цена"
              name="price"
              onChange={handleChange}
              fullWidth
              value={formValues.price}
              required
              type="number"
            />
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose}>Отмена</Button>
            <Button onClick={handleSubmit} color="primary">
              Сохранить
            </Button>
          </DialogActions>
        </Dialog>
      </Box>
    </>
  );
};

export default ProductDetailsPage;
