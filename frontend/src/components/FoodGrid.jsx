import FoodCard from "./FoodCard.jsx";
export default function FoodGrid({ items }) {
  if (!items.length)
    return (
      <div className="empty-state">
        No foods found. Try another search or category.
      </div>
    );
  return (
    <div className="row g-4">
      {items.map((food) => (
        <div className="col-sm-6 col-xl-4" key={food.id}>
          <FoodCard food={food} />
        </div>
      ))}
    </div>
  );
}
