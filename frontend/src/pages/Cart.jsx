import { Link } from "react-router-dom";
import { useCart } from "../context/CartContext.jsx";

export default function Cart() {
  const { cart, total, updateQuantity, removeFromCart } = useCart();

  return (
    <div className="container page-content">
      {/* Page Heading */}
      <div className="page-title-row">
        <div>
          <p className="section-subtitle">YOUR SELECTION</p>
          <h1 className="page-heading">Shopping Cart</h1>
        </div>

        <Link to="/products" className="text-link">
          ← Continue shopping
        </Link>
      </div>

      {/* Empty Cart */}
      {!cart.length ? (
        <div className="empty-state cart-empty">
          <span>🛒</span>

          <h2>Your cart is empty</h2>

          <p>Add healthy favourites from our menu to get started.</p>

          <Link to="/products" className="btn hero-primary-btn">
            Explore Menu
          </Link>
        </div>
      ) : (
        <div className="row g-4">
          {/* Cart Items */}
          <div className="col-lg-8">
            {cart.map((item) => (
              <div className="cart-line" key={item.key}>
                {/* Product Image */}
                <img src={item.image} alt={item.name} />

                {/* Product Details */}
                <div className="cart-line-info">
                  <h3>
                    {item.isCombo ? "🥗 " : ""}
                    {item.name}
                  </h3>

                  <p>{item.customization}</p>

                  {/* Show foods inside the combo */}
                  {item.isCombo && item.items && (
                    <div className="cart-combo-details">
                      <p>
                        <strong>Foods included in your combo:</strong>
                      </p>

                      <ul>
                        {item.items.map((food, index) => (
                          <li key={`${food.id}-${index}`}>
                            {food.name} — ₹{food.price}
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}

                  <strong>₹{item.price}</strong>

                  {/* Quantity Controls */}
                  <div className="quantity-control">
                    <button
                      type="button"
                      onClick={() =>
                        updateQuantity(item.key, item.quantity - 1)
                      }
                      aria-label="Decrease quantity"
                    >
                      −
                    </button>

                    <span>{item.quantity}</span>

                    <button
                      type="button"
                      onClick={() =>
                        updateQuantity(item.key, item.quantity + 1)
                      }
                      aria-label="Increase quantity"
                    >
                      +
                    </button>
                  </div>
                </div>

                {/* Remove Item */}
                <button
                  type="button"
                  className="remove-button"
                  onClick={() => removeFromCart(item.key)}
                >
                  Remove
                </button>
              </div>
            ))}
          </div>

          {/* Order Summary */}
          <div className="col-lg-4">
            <div className="summary-card">
              <h2>Order Summary</h2>

              <div className="summary-row">
                <span>Subtotal</span>
                <strong>₹{total}</strong>
              </div>

              <div className="summary-row">
                <span>Delivery</span>
                <strong>₹0</strong>
              </div>

              <hr />

              <div className="summary-row summary-total">
                <span>Total</span>
                <strong>₹{total}</strong>
              </div>

              <p className="small text-muted">
                Frontend demo: no payment is collected.
              </p>

              <Link to="/checkout" className="btn hero-primary-btn w-100">
                Proceed to Checkout
              </Link>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
