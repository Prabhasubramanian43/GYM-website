import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

import Navbar from "./components/Navbar.jsx";
import Footer from "./components/Footer.jsx";

import Home from "./pages/Home.jsx";
import About from "./pages/About.jsx";
import Products from "./pages/Products.jsx";
import Cart from "./pages/Cart.jsx";
import Checkout from "./pages/Checkout.jsx";
import OrderSuccess from "./pages/OrderSuccess.jsx";
import Contact from "./pages/Contact.jsx";
import Combos from "./pages/Combos.jsx";

import Login from "./pages/Login.jsx";
import Register from "./pages/Register.jsx";

import "./App.css";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Open Login page when the website starts */}
        <Route
          path="/"
          element={<Navigate to="/login" replace />}
        />

        {/* Login page */}
        <Route
          path="/login"
          element={<Login />}
        />

        {/* Register page */}
        <Route
          path="/register"
          element={<Register />}
        />

        {/* Home page */}
        <Route
          path="/home"
          element={
            <>
              <Navbar />
              <Home />
              <Footer />
            </>
          }
        />

        {/* About page */}
        <Route
          path="/about"
          element={
            <>
              <Navbar />
              <About />
              <Footer />
            </>
          }
        />

        {/* Products page */}
        <Route
          path="/products"
          element={
            <>
              <Navbar />
              <Products />
              <Footer />
            </>
          }
        />

        {/* Combos page */}
        <Route
          path="/combos"
          element={
            <>
              <Navbar />
              <Combos />
              <Footer />
            </>
          }
        />

        {/* Cart page */}
        <Route
          path="/cart"
          element={
            <>
              <Navbar />
              <Cart />
              <Footer />
            </>
          }
        />

        {/* Checkout page */}
        <Route
          path="/checkout"
          element={
            <>
              <Navbar />
              <Checkout />
              <Footer />
            </>
          }
        />

        {/* Order success page */}
        <Route
          path="/order-success"
          element={
            <>
              <Navbar />
              <OrderSuccess />
              <Footer />
            </>
          }
        />

        {/* Contact page */}
        <Route
          path="/contact"
          element={
            <>
              <Navbar />
              <Contact />
              <Footer />
            </>
          }
        />

        {/* Unknown routes redirect to Login */}
        <Route
          path="*"
          element={<Navigate to="/login" replace />}
        />
      </Routes>
    </BrowserRouter>
  );
}