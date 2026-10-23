import { Link } from "react-router-dom";
import homeImage from "../assets/home.jpeg";

export default function HeroSection() {
  return (
    <section className="hero-section">
      <div className="container">
        <div className="row align-items-center">
          <div className="col-lg-6 hero-content">
            <span className="hero-badge">HEALTHY FOOD • STRONG BODY</span>
            <h1>
              Eat Clean.
              <br />
              <span>Train Hard.</span>
              <br />
              Live Strong.
            </h1>
            <p className="hero-description">
              Fuel your fitness journey with fresh, healthy, and protein-rich
              meals made for your goals. Eat better, feel stronger, and live
              healthier every day.
            </p>
            <div className="hero-buttons">
              <Link to="/products" className="btn btn-success hero-primary-btn">
                Explore Our Menu →
              </Link>

              <Link
                to="/products?view=combo"
                className="btn hero-secondary-btn"
              >
                Customize Your Meal
              </Link>
            </div>
            <div className="hero-stats">
              <div>
                <h4>Fresh</h4>
                <p>Daily Meals</p>
              </div>
              <div>
                <h4>Healthy</h4>
                <p>Food Choices</p>
              </div>
              <div>
                <h4>Protein</h4>
                <p>Rich Options</p>
              </div>
            </div>
          </div>
          <div className="col-lg-6 hero-image-container">
            <div className="hero-image-background" />
            <img
              src={homeImage}
              alt="Healthy food bowl"
              className="hero-image"
            />
            <div className="hero-floating-card">
              <span className="floating-icon">🥗</span>
              <div>
                <h6>Eat Fresh</h6>
                <p>Fuel Your Body</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
