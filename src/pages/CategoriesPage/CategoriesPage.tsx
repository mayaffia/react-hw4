import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
  Box,
  List,
  ListItem,
  ListItemText,
} from "@mui/material";

const CategoriesPage = () => {
  const dispatch = useDispatch();
  const categories = useSelector((state) => state.categories);
  const [open, setOpen] = useState(false);
  const [currentCategory, setCurrentCategory] = useState(null);
  const [categoryName, setCategoryName] = useState("");

  const handleOpen = (category = null) => {
    setCurrentCategory(category);
    setCategoryName(category ? category.name : "");
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleSubmit = () => {
    if (currentCategory) {
      dispatch(editCategory({ ...currentCategory, name: categoryName }));
    } else {
      dispatch(addCategory({ id: Date.now().toString(), name: categoryName }));
    }
    handleClose();
  };

  const handleDelete = (id) => {
    dispatch(deleteCategory(id));
  };

  return (
    <Box mt={4} p={2}>
      <h2>Управление категориями</h2>
      <Button variant="contained" color="primary" onClick={() => handleOpen()}>
        Добавить категорию
      </Button>

      <List>
        {categories.map((category) => (
          <ListItem key={category.id}>
            <ListItemText primary={category.name} />
            <Button onClick={() => handleOpen(category)}>Редактировать</Button>
            <Button onClick={() => handleDelete(category.id)} color="secondary">
              Удалить
            </Button>
          </ListItem>
        ))}
      </List>

      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>
          {currentCategory ? "Редактировать категорию" : "Добавить категорию"}
        </DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            label="Название категории"
            type="text"
            fullWidth
            value={categoryName}
            onChange={(e) => setCategoryName(e.target.value)}
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
  );
};

export default CategoriesPage;
