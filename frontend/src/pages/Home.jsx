import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { getServerFoods, apiRequest } from "../api.js";

import HeroSection from "../components/HeroSection.jsx";
import FoodGrid from "../components/FoodGrid.jsx";
import { foods, categories } from "../data/foodData.js";

export default function Home() {
  const [menuFoods, setMenuFoods] = useState(foods);

  // Feedback form state
  const [feedback, setFeedback] = useState({
    name: "",
    email: "",
    rating: 5,
    message: "",
  });

  const [feedbackMessage, setFeedbackMessage] = useState("");
  const [feedbackError, setFeedbackError] = useState("");
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    getServerFoods(foods).then(setMenuFoods);
  }, []);

  const featured = [
    menuFoods[0],
    menuFoods[7],
    menuFoods[20],
    menuFoods[14],
  ].filter(Boolean);

  // Handle feedback input changes
  function handleFeedbackChange(e) {
    const { name, value } = e.target;

    setFeedback((prev) => ({
      ...prev,
      [name]: value,
    }));
  }

  // Submit feedback to backend
  async function handleFeedbackSubmit(e) {
    e.preventDefault();

    setFeedbackMessage("");
    setFeedbackError("");

    if (!feedback.name.trim() || !feedback.email.trim() || !feedback.message.trim()) {
      setFeedbackError("Please fill in all fields.");
      return;
    }

    setSubmitting(true);

    try {
      await apiRequest("/feedback", {
        method: "POST",
        body: JSON.stringify({
          name: feedback.name.trim(),
          email: feedback.email.trim(),
          rating: Number(feedback.rating),
          message: feedback.message.trim(),
        }),
      });

      setFeedbackMessage("Thank you! Your feedback has been submitted successfully.");

      setFeedback({
        name: "",
        email: "",
        rating: 5,
        message: "",
      });
    } catch (error) {
      setFeedbackError(
        error.message || "Unable to submit feedback. Please try again."
      );
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <>
      {/* Hero Section */}
      <HeroSection />

      {/* Featured Foods */}
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

      {/* Food Categories */}
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

      {/* Why FitFuel */}
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

      {/* Call to Action */}
      <section className="cta-section">
        <div className="container text-center">
          <p className="section-subtitle">
            YOUR FITNESS JOURNEY STARTS HERE
          </p>

          <h2>Make Every Meal Count.</h2>

          <p>
            Explore the FitFuel menu and find food that fits your routine.
          </p>

          <Link to="/products" className="btn cta-button">
            Browse Our Menu →
          </Link>
        </div>
      </section>

      {/* Customer Feedback Section */}
      <section className="feedback-section py-5">
        <div className="container">
          <div className="section-heading text-center">
            <p className="section-subtitle">WE VALUE YOUR OPINION</p>
            <h2>Share Your Feedback</h2>
            <p className="section-description">
              Tell us about your FitFuel experience. Your feedback helps us
              serve you better!
            </p>
          </div>

          <div className="row justify-content-center">
            <div className="col-lg-7 col-md-9">
              <div className="card border-0 shadow-sm p-4 p-md-5">
                <form onSubmit={handleFeedbackSubmit}>
                  {/* Name */}
                  <div className="mb-3">
                    <label htmlFor="feedbackName" className="form-label">
                      Your Name
                    </label>

                    <input
                      id="feedbackName"
                      type="text"
                      name="name"
                      className="form-control"
                      placeholder="Enter your name"
                      value={feedback.name}
                      onChange={handleFeedbackChange}
                      maxLength={100}
                      required
                    />
                  </div>

                  {/* Email */}
                  <div className="mb-3">
                    <label htmlFor="feedbackEmail" className="form-label">
                      Email Address
                    </label>

                    <input
                      id="feedbackEmail"
                      type="email"
                      name="email"
                      className="form-control"
                      placeholder="Enter your email"
                      value={feedback.email}
                      onChange={handleFeedbackChange}
                      maxLength={254}
                      required
                    />
                  </div>

                  {/* Rating */}
                  <div className="mb-3">
                    <label htmlFor="feedbackRating" className="form-label">
                      Rate Your Experience
                    </label>

                    <select
                      id="feedbackRating"
                      name="rating"
                      className="form-select"
                      value={feedback.rating}
                      onChange={handleFeedbackChange}
                      required
                    >
                      <option value={5}>⭐⭐⭐⭐⭐ - Excellent</option>
                      <option value={4}>⭐⭐⭐⭐ - Very Good</option>
                      <option value={3}>⭐⭐⭐ - Good</option>
                      <option value={2}>⭐⭐ - Fair</option>
                      <option value={1}>⭐ - Poor</option>
                    </select>
                  </div>

                  {/* Feedback Message */}
                  <div className="mb-4">
                    <label htmlFor="feedbackText" className="form-label">
                      Your Feedback
                    </label>

                    <textarea
                      id="feedbackText"
                      name="message"
                      className="form-control"
                      rows="5"
                      placeholder="Write your feedback here..."
                      value={feedback.message}
                      onChange={handleFeedbackChange}
                      minLength={3}
                      maxLength={2000}
                      required
                    />
                  </div>

                  {/* Success Message */}
                  {feedbackMessage && (
                    <div className="alert alert-success" role="status">
                      {feedbackMessage}
                    </div>
                  )}

                  {/* Error Message */}
                  {feedbackError && (
                    <div className="alert alert-danger" role="alert">
                      {feedbackError}
                    </div>
                  )}

                  {/* Submit Button */}
                  <div className="text-center">
                    <button
                      type="submit"
                      className="btn hero-primary-btn px-5"
                      disabled={submitting}
                    >
                      {submitting ? "Submitting..." : "Submit Feedback →"}
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}