import { useEffect, useMemo, useState } from "react";
import { getServerFoods } from "../api.js";
import { useSearchParams } from "react-router-dom";
import { foods, categories } from "../data/foodData.js";
import FoodGrid from "../components/FoodGrid.jsx";
import Combos from "./Combos.jsx";

export default function Products() {
  const [menuFoods, setMenuFoods] = useState(foods);
  useEffect(() => {
    getServerFoods(foods).then(setMenuFoods);
  }, []);
  const [category, setCategory] = useState("All");
  const [search, setSearch] = useState("");
  const [searchParams, setSearchParams] = useSearchParams();

  const [showCombo, setShowCombo] = useState(
    searchParams.get("view") === "combo",
  );

  const shown = useMemo(
    () =>
      menuFoods.filter(
        (food) =>
          (category === "All" || food.category === category) &&
          `${food.name} ${food.description} ${food.ingredients}`
            .toLowerCase()
            .includes(search.toLowerCase()),
      ),
    [menuFoods, category, search],
  );

  // Select a food category.
  const handleCategoryClick = (selectedCategory) => {
    setCategory(selectedCategory);
    setShowCombo(false);
    setSearchParams({});
  };

  // Show only the Combo Builder.
  const handleComboClick = () => {
    setShowCombo(true);
    setSearch("");
    setCategory("All");
    setSearchParams({ view: "combo" });
  };

  return (
    <div className="page-shell">
      {/* Page Heading */}
      <section className="page-hero">
        <div className="container">
          <p className="section-subtitle">FRESH • BALANCED • DELICIOUS</p>

          <h1>Our Healthy Food Menu</h1>

          <p>Find your next meal from our menu of 38 food options and plans.</p>
        </div>
      </section>

      {/* Category Buttons */}
      <section className="container py-5">
        <div className="menu-toolbar">
          {!showCombo && (
            <div className="search-box">
              <i className="bi bi-search" />

              <input
                type="text"
                value={search}
                onChange={(event) => setSearch(event.target.value)}
                placeholder="Search food or ingredients..."
                aria-label="Search food"
              />
            </div>
          )}

          <div className="filter-row">
            {categories.map((item) => (
              <button
                key={item}
                type="button"
                className={`filter-chip ${
                  !showCombo && category === item ? "active" : ""
                }`}
                onClick={() => handleCategoryClick(item)}
              >
                {item}
              </button>
            ))}

            <button
              type="button"
              className={`filter-chip combo-chip ${showCombo ? "active" : ""}`}
              onClick={handleComboClick}
            >
              Combo
            </button>
          </div>
        </div>

        {/* Show Foods OR Combo Builder */}
        {showCombo ? (
          <div className="combo-inline-section">
            <Combos />
          </div>
        ) : (
          <>
            <p className="results-count">
              Showing {shown.length} item
              {shown.length === 1 ? "" : "s"}
            </p>

            <FoodGrid items={shown} />

            <p className="nutrition-note mt-4">
              Nutrition values are approximate per serving. Prices shown are
              sample frontend prices.
            </p>
          </>
        )}
      </section>
    </div>
  );
}
