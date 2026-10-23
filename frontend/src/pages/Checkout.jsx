import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useCart } from "../context/CartContext.jsx";
import { apiRequest, getSessionId } from "../api.js";
export default function Checkout() {
  const { cart, total, clearCart } = useCart();
  const navigate = useNavigate();
  const [form, setForm] = useState({
    name: "",
    phone: "",
    email: "",
    address: "",
    city: "Madurai",
    notes: "",
  });
  const [error, setError] = useState("");
  const [submitting, setSubmitting] = useState(false);
  function change(e) {
    setForm({ ...form, [e.target.name]: e.target.value });
  }
  async function submit(e) {
    e.preventDefault();
    if (!cart.length) {
      setError("Your cart is empty. Please add a food item first.");
      return;
    }
    setSubmitting(true);
    try {
      const order = await apiRequest("/orders", {
        method: "POST",
        body: JSON.stringify({
          customer: form,
          items: cart,
          sessionId: getSessionId(),
        }),
      });
      localStorage.setItem("fitfuelLastOrder", JSON.stringify(order));
      const orders = JSON.parse(localStorage.getItem("fitfuelOrders") || "[]");
      localStorage.setItem("fitfuelOrders", JSON.stringify([...orders, order]));
      clearCart();
      navigate("/order-success");
    } catch (err) {
      setError(
        `${err.message} Please make sure the backend and MongoDB are running.`,
      );
    } finally {
      setSubmitting(false);
    }
  }
  return (
    <div className="container page-content">
      <div className="page-title-row">
        <div>
          <p className="section-subtitle">ALMOST THERE</p>
          <h1 className="page-heading">Checkout</h1>
        </div>
        <Link to="/cart" className="text-link">
          ← Back to cart
        </Link>
      </div>
      {error && <div className="alert alert-warning">{error}</div>}
      <div className="row g-4">
        <div className="col-lg-7">
          <form className="form-card" onSubmit={submit}>
            <h2>Delivery Details</h2>
            <div className="row g-3">
              <div className="col-md-6">
                <label className="form-label">Full name *</label>
                <input
                  className="form-control"
                  name="name"
                  value={form.name}
                  onChange={change}
                  required
                />
              </div>
              <div className="col-md-6">
                <label className="form-label">Phone number *</label>
                <input
                  className="form-control"
                  name="phone"
                  type="tel"
                  pattern="[0-9+() -]{8,16}"
                  value={form.phone}
                  onChange={change}
                  required
                />
              </div>
              <div className="col-12">
                <label className="form-label">Email (optional)</label>
                <input
                  className="form-control"
                  name="email"
                  type="email"
                  value={form.email}
                  onChange={change}
                />
              </div>
              <div className="col-12">
                <label className="form-label">Delivery address *</label>
                <textarea
                  className="form-control"
                  name="address"
                  rows="3"
                  value={form.address}
                  onChange={change}
                  required
                />
              </div>
              <div className="col-md-6">
                <label className="form-label">City *</label>
                <input
                  className="form-control"
                  name="city"
                  value={form.city}
                  onChange={change}
                  required
                />
              </div>
              <div className="col-12">
                <label className="form-label">Notes (optional)</label>
                <textarea
                  className="form-control"
                  name="notes"
                  rows="2"
                  value={form.notes}
                  onChange={change}
                />
              </div>
            </div>
            <button
              className="btn hero-primary-btn mt-4"
              type="submit"
              disabled={submitting}
            >
              {submitting ? "Placing Order..." : "Place Order →"}
            </button>
            <p className="small text-muted mt-3 mb-0">
              Your order is saved in MongoDB. No online payment is collected.
            </p>
          </form>
        </div>
        <div className="col-lg-5">
          <div className="summary-card">
            <h2>Your Order</h2>
            {cart.map((i) => (
              <div className="summary-row" key={i.key}>
                <span>
                  {i.name} × {i.quantity}
                  <small className="d-block">{i.customization}</small>
                </span>
                <strong>₹{i.price * i.quantity}</strong>
              </div>
            ))}
            <hr />
            <div className="summary-row summary-total">
              <span>Total</span>
              <strong>₹{total}</strong>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
