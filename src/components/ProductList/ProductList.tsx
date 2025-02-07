import React, { useEffect, useState } from "react";
import { Pagination } from "@mui/material";
import { Product, ProductListProps } from "../../types/types";
import { useSelector} from "react-redux";
import ProductCard from "../../components/ProductCard/ProductCard";
import AddProductModal from "../../components/AddProductModal/AddProductModal";
import { useNavigate } from "react-router-dom";
import { RootState } from "../../store/store";

export default function ProductList({
  category,
  name,
  inStock,
}: ProductListProps) {
  const products = useSelector((state: RootState) => state.products.products);
 
  const [currentPage, setCurrentPage] = useState(1);
  const productsPerPage = 8;

  const navigate = useNavigate();
  const handleCardClick = (product: Product) => {
    navigate(`/products/${product.id}`);
  };

  const handlePageChange = (
    event: React.ChangeEvent<unknown>,
    value: number
  ) => {
    setCurrentPage(value);
  };

  const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);
  const indexOfLastProduct = currentPage * productsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;

  useEffect(() => {
    const filterProducts = () => {
      const filtered = products.filter((product) => {
        const matchName = name
          ? product.name.toLowerCase().includes(name.toLowerCase())
          : true;
        const matchStock = inStock ? product.quantity > 0 : true;
        const matchCategory = category ? product.category === category : true;

        return matchName && matchStock && matchCategory;
      });

      setFilteredProducts(filtered);
    };

    filterProducts();
  }, [products, name, inStock, category]);

  const currentProducts = filteredProducts.slice(
    indexOfFirstProduct,
    indexOfLastProduct
  );

  useEffect(() => {
    setCurrentPage(1);
  }, [filteredProducts]);

  return (
    <>
      <div
        style={{
          display: "flex",
          flexWrap: "wrap",
          gap: "40px",
          marginLeft: "60px",
        }}
      >
        {currentProducts.length === 0 && (
          <div style={{ marginLeft: "500px" }}>Таких товаров не нашлось</div>
        )}
        {currentProducts.map((product) => (
          <ProductCard
            key={product.id}
            product={product}
            onClick={handleCardClick}
          />
        ))}
        <div
          style={{
            position: "fixed",
            bottom: 0,
            left: 0,
            right: 0,
            backgroundColor: "white",
            padding: "10px",
            zIndex: 1000,
            display: "flex",
            justifyContent: "center",
          }}
        >
          <Pagination
            count={Math.ceil(filteredProducts.length / productsPerPage)}
            page={currentPage}
            onChange={handlePageChange}
            shape="rounded"
          />
        </div>
      </div>
      <AddProductModal />
    </>
  );
}
