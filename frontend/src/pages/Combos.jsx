import { useEffect, useState } from "react";
import { getServerFoods, apiRequest } from "../api.js";
import { useNavigate } from "react-router-dom";
import { foods, categories } from "../data/foodData.js";
import { useCart } from "../context/CartContext.jsx";
import "../App.css";

function Combos() {
  const [menuFoods, setMenuFoods] = useState(foods);
  useEffect(() => {
    getServerFoods(foods).then(setMenuFoods);
  }, []);
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [selectedFoods, setSelectedFoods] = useState({});
  const [activeCategory, setActiveCategory] = useState("");

  const { addComboToCart } = useCart();
  const navigate = useNavigate();

  // Available combo categories.
  const comboCategories = categories.filter(
    (category) =>
      category !== "All" &&
      category !== "Diet Plans" &&
      category !== "Diet-Based Subscription Plans",
  );

  // Click a category heading.
  const handleCategoryChange = (category) => {
    setActiveCategory(category);

    // Keep previously selected categories and foods.
    setSelectedCategories((previous) =>
      previous.includes(category) ? previous : [...previous, category],
    );
  };

  // Select one food from the active category.
  const handleFoodSelect = (category, food) => {
    setSelectedFoods((previous) => ({
      ...previous,
      [category]: food,
    }));
  };

  // Get all selected foods for the combo.
  const selectedItems = selectedCategories
    .map((category) => selectedFoods[category])
    .filter(Boolean);

  // Calculate total price.
  const totalPrice = selectedItems.reduce(
    (total, food) => total + Number(food.price || 0),
    0,
  );

  // Calculate total calories.
  const totalCalories = selectedItems.reduce((total, food) => {
    const calories = parseInt(food.calories, 10);

    return total + (Number.isNaN(calories) ? 0 : calories);
  }, 0);

  // Calculate total protein.
  const totalProtein = selectedItems.reduce((total, food) => {
    const protein = parseInt(food.protein, 10);

    return total + (Number.isNaN(protein) ? 0 : protein);
  }, 0);

  // Add the selected foods as one combo.
  const handleAddCombo = () => {
    if (selectedItems.length === 0) {
      alert("Please select your food items first!");
      return;
    }

    const allCategoriesSelected = selectedCategories.every(
      (category) => selectedFoods[category],
    );

    if (!allCategoriesSelected) {
      alert("Please select one food from each chosen category!");
      return;
    }

    apiRequest("/combos", {
      method: "POST",
      body: JSON.stringify({
        name: "My Custom Combo",
        items: selectedItems.map(({ id, name, price, category }) => ({
          id,
          name,
          price,
          category,
        })),
      }),
    }).catch((error) =>
      console.warn("Combo could not be saved on server:", error.message),
    );
    addComboToCart(selectedItems);

    alert("Your custom combo has been added to the cart!");

    navigate("/cart");
  };

  // Clear all selections.
  const clearCombo = () => {
    setSelectedCategories([]);
    setSelectedFoods({});
    setActiveCategory("");
  };

  return (
    <div className="combo-page">
      <section className="container combo-container py-5">
        {/* Combo Heading */}
        <div className="text-center mb-5">
          <span className="combo-badge">CREATE YOUR PERFECT MEAL</span>

          <h2 className="mt-3">
            🎯 Build Your Own <span>Combo</span>
          </h2>

          <p>Choose your favourite foods and create your own healthy combo.</p>
        </div>

        {/* Step 1: Choose a Category */}
        <div className="combo-section">
          <h3>Step 1: Choose Your Category</h3>

          <p>Click one category at a time to view its food items.</p>

          <div className="combo-category-grid">
            {comboCategories.map((category) => (
              <button
                key={category}
                type="button"
                className={`combo-category-card ${
                  activeCategory === category ? "selected" : ""
                }`}
                onClick={() => handleCategoryChange(category)}
              >
                {category}
              </button>
            ))}
          </div>
        </div>

        {/* Step 2: Show Foods from Only the Active Category */}
        {activeCategory && (
          <div className="combo-section">
            <h3>Step 2: Select Your Food</h3>

            <p>Choose one food from {activeCategory}.</p>

            <div className="combo-food-section">
              <h4>{activeCategory}</h4>

              {menuFoods.filter((food) => food.category === activeCategory)
                .length === 0 ? (
                <p>No food items found in this category.</p>
              ) : (
                <div className="row g-4">
                  {menuFoods
                    .filter((food) => food.category === activeCategory)
                    .map((food) => {
                      const isSelected =
                        selectedFoods[activeCategory]?.id === food.id;

                      return (
                        <div className="col-12 col-sm-6 col-lg-4" key={food.id}>
                          <div
                            className={`combo-food-card ${
                              isSelected ? "selected" : ""
                            }`}
                          >
                            <img
                              src={food.image}
                              alt={food.name}
                              className="combo-food-image"
                            />

                            <div className="combo-food-details">
                              <h5>{food.name}</h5>

                              <p>{food.description}</p>

                              <div className="combo-food-nutrition">
                                <span>{food.calories || "N/A"}</span>

                                <span>{food.protein || "N/A"} protein</span>
                              </div>

                              <div className="combo-food-bottom">
                                <strong>₹{food.price}</strong>

                                <button
                                  type="button"
                                  className={
                                    isSelected
                                      ? "btn btn-dark"
                                      : "btn btn-success"
                                  }
                                  onClick={() =>
                                    handleFoodSelect(activeCategory, food)
                                  }
                                >
                                  {isSelected ? "Selected ✓" : "Select"}
                                </button>
                              </div>
                            </div>
                          </div>
                        </div>
                      );
                    })}
                </div>
              )}
            </div>
          </div>
        )}

        {/* Combo Summary */}
        <div className="combo-summary">
          <h3>Your Combo Summary</h3>

          {selectedItems.length === 0 ? (
            <p>Select a category and food to build your combo.</p>
          ) : (
            <>
              <div className="combo-summary-items">
                {selectedItems.map((food) => (
                  <div className="combo-summary-item" key={food.id}>
                    <span>{food.name}</span>

                    <strong>₹{food.price}</strong>
                  </div>
                ))}
              </div>

              <div className="combo-summary-nutrition">
                <div>
                  <span>Total Calories</span>
                  <strong>{totalCalories} kcal*</strong>
                </div>

                <div>
                  <span>Total Protein</span>
                  <strong>{totalProtein}g*</strong>
                </div>
              </div>

              <div className="combo-total">
                <span>Total Price</span>
                <strong>₹{totalPrice}</strong>
              </div>
            </>
          )}

          <div className="combo-summary-buttons">
            <button
              type="button"
              className="btn btn-success"
              onClick={handleAddCombo}
              disabled={
                selectedItems.length === 0 ||
                selectedCategories.some((category) => !selectedFoods[category])
              }
            >
              🛒 Add Combo to Cart
            </button>

            <button
              type="button"
              className="btn btn-outline-secondary"
              onClick={clearCombo}
            >
              Clear Combo
            </button>
          </div>

          <small>
            *Nutrition values are approximate. Items without numeric nutrition
            values are not included in the calculation.
          </small>
        </div>
      </section>
    </div>
  );
}

export default Combos;
