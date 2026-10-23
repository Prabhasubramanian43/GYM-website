import { Link } from "react-router-dom";
export default function OrderSuccess() {
  let order = null;
  try {
    order = JSON.parse(localStorage.getItem("fitfuelLastOrder"));
  } catch {}
  return (
    <div className="container page-content">
      <div className="success-card">
        <div className="success-icon">✓</div>
        <p className="section-subtitle">THANK YOU</p>
        <h1>Order Summary Saved!</h1>
        <p>
          This frontend demo saved your order in this browser. No real order or
          payment was sent.
        </p>
        {order && (
          <div className="order-details">
            <p>
              <strong>Order ID:</strong> {order.id}
            </p>
            <p>
              <strong>Name:</strong> {order.customer?.name}
            </p>
            <p>
              <strong>Total:</strong> ₹{order.total}
            </p>
            <p>
              <strong>Items:</strong>{" "}
              {order.items?.reduce((n, i) => n + i.quantity, 0) || 0}
            </p>
          </div>
        )}
        <Link to="/products" className="btn hero-primary-btn">
          Continue Exploring
        </Link>
      </div>
    </div>
  );
}
