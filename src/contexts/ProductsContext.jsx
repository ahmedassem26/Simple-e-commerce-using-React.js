import axios from "axios";
import { createContext, useEffect, useState } from "react";

export const ProductsContext = createContext();

export const ProductsProvider = ({ children }) => {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);

  //Get Products & Categories from backend
  useEffect(() => {
    const getAllProducts = async () => {
      const products = await axios.get("http://localhost:3000/products");
      setProducts(products.data);
    };
    getAllProducts();

    const getAllCategories = async () => {
      const categories = await axios.get("http://localhost:3000/categories");
      setCategories(categories.data);
    };
    getAllCategories();
  }, []);

  //Admin Operations
  const editProduct = async (id, updatedProduct) => {
    setProducts(
      products.map((product) =>
        product.id === id ? { ...product, ...updatedProduct } : product
      )
    );
    await axios.put(`http://localhost:3000/products/${id}`, updatedProduct);
  };

  const deleteProduct = async (id) => {
    setProducts(products.filter((product) => product.id !== id));
    await axios.delete(`http://localhost:3000/products/${id}`);
  };

  const addProduct = async (product) => {
    setProducts([...products, product]);
    await axios.post("http://localhost:3000/products", product);
  };

  //Cart Operations
  function handleIncrement(item) {
    const index = products.findIndex((p) => p.id === item.id);
    const newProducts = structuredClone(products);
    newProducts[index].count += 1;
    setProducts(newProducts);
  }

  function handleDecrement(item) {
    const index = products.findIndex((p) => p.id === item.id);
    const newProducts = structuredClone(products);
    newProducts[index].count > 1
      ? (newProducts[index].count -= 1)
      : newProducts[index].count;
    setProducts(newProducts);
  }

  function handleRemoveItem(item) {
    const newProducts = products.map((p) =>
      p.id === item.id ? { ...p, isAddedToCart: false } : p
    );
    setProducts(newProducts);
  }

  function handleReset() {
    const newProducts = products.map((p) => ({
      ...p,
      isAddedToCart: false,
      count: 0,
    }));
    setProducts(newProducts);
  }

  //Menu Operations
  function handleToggleAddToCart(item) {
    const newProducts = products.map((p) =>
      p.id === item.id
        ? {
            ...p,
            isAddedToCart: !p.isAddedToCart,
            count: p.isAddedToCart ? 0 : 1,
          }
        : p
    );
    setProducts(newProducts);
  }

  return (
    <ProductsContext.Provider
      value={{
        products,
        categories,
        handleIncrement,
        handleDecrement,
        handleRemoveItem,
        handleReset,
        handleToggleAddToCart,
        editProduct,
        deleteProduct,
        addProduct,
      }}
    >
      {children}
    </ProductsContext.Provider>
  );
};
