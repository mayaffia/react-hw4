import { BrowserRouter, Routes, Route } from 'react-router-dom'
import './App.css'
import ProductDetails from './pages/ProductDetails/ProductDetails'
import MainPage from './pages/MainPage/MainPage'
import { UserPage } from './pages/UserPage/UserPage'
import CategoriesPage from './pages/CategoriesPage/CategoriesPage'

function App() {

  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<MainPage />} />
        <Route path="products/:productId" element={<ProductDetails />} />
        <Route path="userProfile" element={<UserPage />} />
        <Route path="categories" element={<CategoriesPage />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App