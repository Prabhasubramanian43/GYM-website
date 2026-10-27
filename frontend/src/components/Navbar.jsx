import { useState } from "react";
import { Link, NavLink } from "react-router-dom";
import { useCart } from "../context/CartContext.jsx";

export default function Navbar() {
  const { count } = useCart();
  const [menuOpen, setMenuOpen] = useState(false);

  const closeMenu = () => {
    setMenuOpen(false);
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-dark fitfuel-navbar sticky-top">
      <div className="container">
        <Link
          className="navbar-brand fitfuel-logo"
          to="/home"
          onClick={closeMenu}
        >
          <span className="logo-icon">🥗</span> FitFuel
        </Link>

        <button
          className="navbar-toggler"
          type="button"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-controls="fitfuelNavbar"
          aria-expanded={menuOpen}
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        <div
          className={`collapse navbar-collapse ${
            menuOpen ? "show" : ""
          }`}
          id="fitfuelNavbar"
        >
          <ul className="navbar-nav ms-auto align-items-lg-center">
            <li className="nav-item">
              <NavLink
                className="nav-link"
                to="/home"
                end
                onClick={closeMenu}
              >
                Home
              </NavLink>
            </li>

            <li className="nav-item">
              <NavLink
                className="nav-link"
                to="/about"
                onClick={closeMenu}
              >
                About
              </NavLink>
            </li>

            <li className="nav-item">
              <NavLink
                className="nav-link"
                to="/products"
                onClick={closeMenu}
              >
                Products
              </NavLink>
            </li>

            <li className="nav-item">
              <NavLink
                className="nav-link"
                to="/contact"
                onClick={closeMenu}
              >
                Contact
              </NavLink>
            </li>

            <li className="nav-item ms-lg-3">
              <NavLink
                className="btn cart-button"
                to="/cart"
                onClick={closeMenu}
              >
                🛒 Cart{" "}
                <span className="cart-count">{count}</span>
              </NavLink>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
}