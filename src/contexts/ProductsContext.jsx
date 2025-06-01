//productsContext.jsx
import { createContext, useState } from "react";

export const ProductsContext = createContext();

export const ProductsProvider = ({ children }) => {
  const initialProducts = [
    {
      id: 1,
      name: "Large Burger",
      count: 1,
      price: 150,
      isAddedToCart: true,
      categoryId: 1,
    },
    {
      id: 2,
      name: "Large Pizza",
      count: 1,
      price: 140,
      isAddedToCart: true,
      categoryId: 2,
    },
    {
      id: 3,
      name: "Large Fries",
      count: 1,
      price: 160,
      isAddedToCart: true,
      categoryId: 3,
    },
    {
      id: 4,
      name: "Medium Burger",
      count: 0,
      price: 130,
      isAddedToCart: false,
      categoryId: 1,
    },
    {
      id: 5,
      name: "Meduim Pizza",
      count: 0,
      price: 120,
      isAddedToCart: false,
      categoryId: 2,
    },
    {
      id: 6,
      name: "Meduim Fries",
      count: 0,
      price: 135,
      isAddedToCart: false,
      categoryId: 3,
    },
    {
      id: 7,
      name: "Small Burger",
      count: 0,
      price: 90,
      isAddedToCart: false,
      categoryId: 1,
    },
    {
      id: 8,
      name: "Small Pizza",
      count: 0,
      price: 80,
      isAddedToCart: false,
      categoryId: 2,
    },
    {
      id: 9,
      name: "Small Fries",
      count: 0,
      price: 95,
      isAddedToCart: false,
      categoryId: 3,
    },
  ];

  const categories = [
    { id: 1, name: "Burger", isSelected: false },
    { id: 2, name: "Pizza", isSelected: false },
    { id: 3, name: "Fries", isSelected: false },
  ];

  const [products, setProducts] = useState(initialProducts);

  //Admin Operations
  const editProduct = (id, updatedProduct) => {
    setProducts(
      products.map((product) =>
        product.id === id ? { ...product, ...updatedProduct } : product
      )
    );
  };

  const deleteProduct = (id) => {
    setProducts(products.filter((product) => product.id !== id));
  };

  const addProduct = (product) => {
    setProducts([...products, product]);
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
