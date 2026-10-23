import { Link } from "react-router-dom";
export default function Footer() {
  return (
    <footer className="fitfuel-footer">
      <div className="container py-5">
        <div className="row g-4">
          <div className="col-md-6 col-lg-4">
            <h3 className="footer-logo">🥗 FitFuel</h3>
            <p className="footer-description">
              Eat Clean. Train Hard. Live Strong.
            </p>
            <p>
              Fresh, healthy and protein-rich food to support your fitness
              journey.
            </p>
          </div>
          <div className="col-6 col-lg-4">
            <h5>Quick Links</h5>
            <ul className="footer-links">
              <li>
                <Link to="/">Home</Link>
              </li>
              <li>
                <Link to="/about">About Us</Link>
              </li>
              <li>
                <Link to="/products">Our Menu</Link>
              </li>
              <li>
                <Link to="/contact">Contact Us</Link>
              </li>
              <li>
                <Link to="/cart">Shopping Cart</Link>
              </li>
            </ul>
          </div>
          <div className="col-6 col-lg-4">
            <h5>Contact Us</h5>
            <p>📍 Madurai, Tamil Nadu</p>
            <p>✉️ fitfuel@example.com</p>
            <p>📞 +91 98765 43210</p>
          </div>
        </div>
        <hr className="footer-divider" />
        <p className="text-center mb-0">
          © {new Date().getFullYear()} FitFuel. All rights reserved.
        </p>
      </div>
    </footer>
  );
}
