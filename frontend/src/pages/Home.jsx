import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { getServerFoods } from "../api.js";
import HeroSection from "../components/HeroSection.jsx";
import FoodGrid from "../components/FoodGrid.jsx";
import { foods, categories } from "../data/foodData.js";
export default function Home() {
  const [menuFoods, setMenuFoods] = useState(foods);
  useEffect(() => {
    getServerFoods(foods).then(setMenuFoods);
  }, []);
  const featured = [
    menuFoods[0],
    menuFoods[7],
    menuFoods[20],
    menuFoods[14],
  ].filter(Boolean);
  return (
    <>
      <HeroSection />
      <section className="featured-section">
        <div className="container">
          <div className="section-heading">
            <p className="section-subtitle">FUEL YOUR FITNESS</p>
            <h2>Our Featured Foods</h2>
            <p className="section-description">
              Delicious and nutritious options to support your everyday fitness
              journey.
            </p>
          </div>
          <FoodGrid items={featured} />
          <div className="text-center mt-5">
            <Link className="btn hero-primary-btn" to="/products">
              Explore Full Menu →
            </Link>
          </div>
        </div>
      </section>
      <section className="category-section">
        <div className="container">
          <div className="section-heading">
            <p className="section-subtitle">FIND YOUR FUEL</p>
            <h2>Explore Food Categories</h2>
          </div>
          <div className="row g-3">
            {categories.slice(1).map((cat, i) => (
              <div className="col-6 col-md-4 col-lg-2" key={cat}>
                <Link className="category-tile" to="/products">
                  <span>{["🥣", "🍗", "🥗", "🥤", "🥜", "🎯"][i]}</span>
                  <strong>{cat}</strong>
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>
      <section className="why-section">
        <div className="container">
          <div className="section-heading">
            <p className="section-subtitle">WHY FITFUEL?</p>
            <h2>Good Food. Stronger You.</h2>
          </div>
          <div className="row g-4">
            {[
              [
                "🥬",
                "Fresh Ingredients",
                "Thoughtful food choices made with everyday ingredients.",
              ],
              [
                "💪",
                "Fitness Friendly",
                "Protein-aware options for your active lifestyle.",
              ],
              [
                "🍱",
                "Choices for Everyone",
                "Breakfast, meals, salads, drinks, snacks and plans.",
              ],
            ].map((x) => (
              <div className="col-md-4" key={x[1]}>
                <div className="benefit-card">
                  <span>{x[0]}</span>
                  <h3>{x[1]}</h3>
                  <p>{x[2]}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
      <section className="cta-section">
        <div className="container text-center">
          <p className="section-subtitle">YOUR FITNESS JOURNEY STARTS HERE</p>
          <h2>Make Every Meal Count.</h2>
          <p>Explore the FitFuel menu and find food that fits your routine.</p>
          <Link to="/products" className="btn cta-button">
            Browse Our Menu →
          </Link>
        </div>
      </section>
    </>
  );
}
