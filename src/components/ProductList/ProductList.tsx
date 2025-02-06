import React, { useEffect, useState } from "react";
import { Modal, Pagination } from "@mui/material";
import { Product, ProductListProps } from "../../types/types";
import { useSelector, useDispatch } from "react-redux";
import { removeProduct } from "../../store/productSlice";
import ProductCard from "../../components/ProductCard/ProductCard";
import AddProductModal from "../../components/AddProductModal/AddProductModal";

export default function ProductList({
  category,
  name,
  inStock,
  darkTheme,
}: ProductListProps) {
  const products = useSelector((state) => state.products.products);
  const dispatch = useDispatch();

  const handleRemove = (id) => {
    dispatch(removeProduct(id));
  };

  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);

  const handleCardClick = (product: Product) => {
    setSelectedProduct(product);
  };

  const handleCloseModal = () => {
    setSelectedProduct(null);
  };

  const [currentPage, setCurrentPage] = useState(1);
  const productsPerPage = 8;

  const handlePageChange = (
    event: React.ChangeEvent<unknown>,
    value: number
  ) => {
    setCurrentPage(value);
  };

  const indexOfLastProduct = currentPage * productsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;

  const filtertedProducts = products.filter((product) => {
    const matchName = name
      ? product.name.toLowerCase().includes(name.toLowerCase())
      : true;
    const matchStock = inStock ? product.quantity > 0 : true;
    const matchCategory = category ? product.category === category : true;

    return matchName && matchStock && matchCategory;
  });

  const currentProducts = filtertedProducts.slice(
    indexOfFirstProduct,
    indexOfLastProduct
  );

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
            backgroundColor: darkTheme ? "#161a1d" : "white",
            padding: "10px",
            zIndex: 1000,
            display: "flex",
            justifyContent: "center",
          }}
        >
          <Pagination
            count={Math.ceil(filtertedProducts.length / productsPerPage)}
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
