import { Link, NavLink } from "react-router-dom";
import { useCart } from "../context/CartContext.jsx";
export default function Navbar() {
  const { count } = useCart();
  return (
    <nav className="navbar navbar-expand-lg navbar-dark fitfuel-navbar sticky-top">
      <div className="container">
        <Link className="navbar-brand fitfuel-logo" to="/home">
          <span className="logo-icon">🥗</span> FitFuel
        </Link>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#fitfuelNavbar"
          aria-controls="fitfuelNavbar"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon" />
        </button>
        <div className="collapse navbar-collapse" id="fitfuelNavbar">
          <ul className="navbar-nav ms-auto align-items-lg-center">
            <li className="nav-item">
              <NavLink className="nav-link" to="/home" end>
                Home
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink className="nav-link" to="/about">
                About
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink className="nav-link" to="/products">
                Products
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink className="nav-link" to="/contact">
                Contact
              </NavLink>
            </li>
            <li className="nav-item ms-lg-3">
              <NavLink className="btn cart-button" to="/cart">
                🛒 Cart <span className="cart-count">{count}</span>
              </NavLink>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
}
