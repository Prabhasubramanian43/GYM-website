import { useState } from "react";
import { useCart } from "../context/CartContext.jsx";
export default function FoodCard({ food }) {
  const [option, setOption] = useState(food.options?.[0] || "Regular");
  const [added, setAdded] = useState(false);
  const { addToCart } = useCart();
  function handleAdd() {
    addToCart(food, option);
    setAdded(true);
    window.setTimeout(() => setAdded(false), 1200);
  }
  return (
    <article className="food-card">
      <div className="food-card-image">
        <img src={food.image} alt={food.name} />
        <span className="food-badge">
          {food.category === "Diet Plans" ? "Meal Plan" : "Healthy Choice"}
        </span>
      </div>
      <div className="food-card-content">
        <span className="food-category-label">{food.category}</span>
        <h3>{food.name}</h3>
        <p className="food-description">{food.description}</p>
        <p className="ingredients">
          <strong>Includes:</strong> {food.ingredients}
        </p>
        <div className="food-nutrition">
          <div>
            <span>🔥</span>
            <p>{food.calories}</p>
            <small>Calories</small>
          </div>
          <div>
            <span>💪</span>
            <p>{food.protein}</p>
            <small>Protein</small>
          </div>
        </div>
        {food.options?.length > 1 && (
          <label className="customization-label">
            Choose option
            <select
              value={option}
              onChange={(e) => setOption(e.target.value)}
              className="form-select form-select-sm mt-1"
            >
              {food.options.map((o) => (
                <option key={o}>{o}</option>
              ))}
            </select>
          </label>
        )}
        <div className="food-card-bottom">
          <h4>₹{food.price}</h4>
          <button type="button" className="food-add-button" onClick={handleAdd}>
            {added ? "✓ Added" : "+ Add"}
          </button>
        </div>
      </div>
    </article>
  );
}
