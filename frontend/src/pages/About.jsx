import { Link } from "react-router-dom";
import { useEffect } from "react";
import { apiRequest } from "../api.js";

import aboutImage from "../assets/about.jpeg";

export default function About() {
  useEffect(() => {
    apiRequest("/about").catch((error) =>
      console.warn("About API unavailable:", error.message),
    );
  }, []);
  return (
    <div className="page-shell">
      <section className="page-hero">
        <div className="container">
          <p className="section-subtitle">ABOUT FITFUEL</p>
          <h1>Healthy Food for Your Fitness Journey</h1>
          <p>Eat Clean. Train Hard. Live Strong.</p>
        </div>
      </section>
      <section className="container py-5">
        <div className="row align-items-center g-5">
          <div className="col-lg-6">
            <img
              className="about-image"
              src={aboutImage}
              alt="Healthy food bowl"
              onError={(e) => {
                e.currentTarget.style.display = "none";
              }}
            />
          </div>
          <div className="col-lg-6">
            <p className="section-subtitle">OUR PURPOSE</p>
            <h2 className="page-heading">Food that supports your goals</h2>
            <p>
              FitFuel is a healthy gym food menu concept for people who want
              convenient meal ideas alongside an active lifestyle. Explore
              breakfast, protein-rich meals, salads, drinks, snacks and
              diet-based plans.
            </p>
            <p>
              Nutrition values are approximate and can vary with ingredients and
              serving sizes. Choose meals that suit your own needs.
            </p>
            <Link to="/products" className="btn hero-primary-btn">
              Explore the Menu →
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
