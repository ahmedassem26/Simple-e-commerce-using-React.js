// import { useState } from "react";
import "./index.css";
import Cart from "./pages/Cart";
import Navbar from "./components/Navbar";
import { Route, Routes } from "react-router";
import Home from "./pages/Home";
import About from "./pages/About";
import AboutPeople from "./pages/AboutPeople";
import AboutCompany from "./pages/AboutCompany";
import Error from "./pages/Error";
import Menu from "./pages/Menu";
import Admin from "./pages/Admin";
import { ProductsProvider } from "./contexts/ProductsContext";

function App() {
  return (
    <div>
      <Navbar />
      <ProductsProvider>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/menu" element={<Menu />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/admin" element={<Admin />} />
          <Route path="/about" element={<About />}>
            <Route path="people" element={<AboutPeople />} />
            <Route path="company" element={<AboutCompany />} />
          </Route>
          <Route path="*" element={<Error />} />
        </Routes>
      </ProductsProvider>
    </div>
  );
}

export default App;
