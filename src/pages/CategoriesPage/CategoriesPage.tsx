// import React, { useState, ChangeEvent } from "react";
// import { useSelector, useDispatch } from "react-redux";
// import {
//   Button,
//   Dialog,
//   DialogActions,
//   DialogContent,
//   DialogTitle,
//   TextField,
//   Box,
//   List,
//   ListItem,
//   ListItemText,
// } from "@mui/material";
// import { RootState } from "../../store/store";
// import {
//   addCategory,
//   deleteCategory,
//   editCategory,
// } from "../../store/categorySlice";
// import NavBar from "../../components/NavBar/NavBar";
// import { Category } from "../../types/types";

// const CategoriesPage: React.FC = () => {
//   const dispatch = useDispatch();
//   const categories = useSelector((state: RootState) => state.categories);
//   const [open, setOpen] = useState(false);
//   const [currentCategory, setCurrentCategory] = useState<Category | null>(null);
//   const [categoryName, setCategoryName] = useState("");

//   const handleOpen = (category: Category | null = null) => {
//     setCurrentCategory(category);
//     setCategoryName(category ? category.name : "");
//     setOpen(true);
//   };

//   const handleClose = () => {
//     setOpen(false);
//   };

//   const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
//     setCategoryName(event.target.value);
//   };

//   const handleSubmit = () => {
//     if (currentCategory) {
//       dispatch(editCategory({ ...currentCategory, name: categoryName }));
//     } else {
//       dispatch(addCategory({ id: Date.now().toString(), name: categoryName }));
//     }
//     handleClose();
//   };

//   const handleDelete = (id: string) => {
//     dispatch(deleteCategory(id));
//   };

//   return (
//     <>
//       <NavBar />
//       <Box mt={4} p={2}>
//         <h2>Управление категориями</h2>
//         <Button
//           variant="contained"
//           color="primary"
//           onClick={() => handleOpen()}
//         >
//           Добавить категорию
//         </Button>

//         <h1> Категории: </h1>
//         <List>
//           {categories.map((category) => (
//             <ListItem key={category.id}>
//               <ListItemText primary={category.name} />
//               <Button onClick={() => handleOpen(category)}>
//                 Редактировать
//               </Button>
//               <Button
//                 onClick={() => handleDelete(category.id)}
//                 color="secondary"
//               >
//                 Удалить
//               </Button>
//             </ListItem>
//           ))}
//         </List>

//         <Dialog open={open} onClose={handleClose}>
//           <DialogTitle>
//             {currentCategory ? "Редактировать категорию" : "Добавить категорию"}
//           </DialogTitle>
//           <DialogContent>
//             <TextField
//               autoFocus
//               margin="dense"
//               label="Название категории"
//               type="text"
//               fullWidth
//               value={categoryName}
//               onChange={handleChange}
//             />
//           </DialogContent>
//           <DialogActions>
//             <Button onClick={handleClose}>Отмена</Button>
//             <Button onClick={handleSubmit} color="primary">
//               Сохранить
//             </Button>
//           </DialogActions>
//         </Dialog>
//       </Box>
//     </>
//   );
// };

// export default CategoriesPage;

import React, { useState, ChangeEvent } from "react";
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
import { RootState } from "../../store/store";
import {
  addCategory,
  deleteCategory,
  editCategory,
} from "../../store/categorySlice";
import NavBar from "../../components/NavBar/NavBar";
import { Category } from "../../types/types";

const CategoriesPage: React.FC = () => {
  const dispatch = useDispatch();
  const categories = useSelector((state: RootState) => state.categories);
  const products = useSelector((state: RootState) => state.products.products);
  const [open, setOpen] = useState(false);
  const [currentCategory, setCurrentCategory] = useState<Category | null>(null);
  const [categoryName, setCategoryName] = useState("");

  const handleOpen = (category: Category | null = null) => {
    setCurrentCategory(category);
    setCategoryName(category ? category.name : "");
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    setCategoryName(event.target.value);
  };

  const handleSubmit = (category: Category) => {
    if (currentCategory) {
      const isCategoryInUse = products.some(
        (product) => product.category === category.name
      );
      if (isCategoryInUse) {
        alert(
          "Эту категорию нельзя редактировать, так как она используется в товарах."
        );
        return;
      }
      dispatch(editCategory({ ...currentCategory, name: categoryName }));
    } else {
      dispatch(addCategory({ id: Date.now().toString(), name: categoryName }));
    }
    handleClose();
  };

  const handleDelete = (category: Category) => {
    const isCategoryInUse = products.some(
      (product) => product.category === category.name
    );
    if (isCategoryInUse) {
      alert(
        "Эту категорию нельзя удалить, так как она используется в товарах."
      );
      return;
    }

    dispatch(deleteCategory(category.id));
  };

  return (
    <>
      <NavBar />
      <Box mt={4} p={2}>
        <h2>Управление категориями</h2>
        <Button
          variant="contained"
          color="primary"
          onClick={() => handleOpen()}
        >
          Добавить категорию
        </Button>

        <h1>Категории:</h1>
        <List>
          {categories.map((category) => (
            <ListItem key={category.id}>
              <ListItemText primary={category.name} />
              <Button onClick={() => handleOpen(category)}>
                Редактировать
              </Button>
              <Button onClick={() => handleDelete(category)} color="secondary">
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
              onChange={handleChange}
            />
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose}>Отмена</Button>
            <Button
              onClick={() => handleSubmit(currentCategory)}
              color="primary"
            >
              Сохранить
            </Button>
          </DialogActions>
        </Dialog>
      </Box>
    </>
  );
};

export default CategoriesPage;
