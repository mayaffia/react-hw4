import { BrowserRouter, Routes, Route } from "react-router-dom";
import MainPage from "./pages/MainPage/MainPage";
import { UserPage } from "./pages/UserPage/UserPage";
import CategoriesPage from "./pages/CategoriesPage/CategoriesPage";
import ProductDetailsPage from "./pages/ProductDetails/ProductDetails";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<MainPage />} />
        <Route path="products/:productId" element={<ProductDetailsPage />} />
        <Route path="userProfile" element={<UserPage />} />
        <Route path="categories" element={<CategoriesPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
