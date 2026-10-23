import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useCart } from "../context/CartContext.jsx";
import { apiRequest, getSessionId } from "../api.js";
import qrImage from "../assets/upi-qr.png";

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

  const [paymentMethod, setPaymentMethod] = useState("COD");
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

    setError("");
    setSubmitting(true);

    try {
      const order = await apiRequest("/orders", {
        method: "POST",
        body: JSON.stringify({
          customer: form,
          items: cart,
          sessionId: getSessionId(),
          paymentMethod,
          paymentStatus: "pending",
        }),
      });

      localStorage.setItem("fitfuelLastOrder", JSON.stringify(order));

      const orders = JSON.parse(
        localStorage.getItem("fitfuelOrders") || "[]"
      );

      localStorage.setItem(
        "fitfuelOrders",
        JSON.stringify([...orders, order])
      );

      clearCart();
      navigate("/order-success");
    } catch (err) {
      setError(
        `${err.message} Please make sure the backend and MongoDB are running.`
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

            <hr className="my-4" />

            <h2>Payment Method</h2>

            <div className="form-check border rounded p-3 mb-3">
              <input
                className="form-check-input ms-0 me-2"
                type="radio"
                name="paymentMethod"
                id="qrPayment"
                value="QR"
                checked={paymentMethod === "QR"}
                onChange={(e) => setPaymentMethod(e.target.value)}
              />

              <label className="form-check-label" htmlFor="qrPayment">
                <strong>UPI QR Code Payment</strong>
                <span className="d-block small text-muted">
                  Pay using Google Pay, PhonePe, or Paytm.
                </span>
              </label>
            </div>

            {paymentMethod === "QR" && (
              <div className="text-center border rounded p-3 mb-3">
                <h5>Scan and Pay</h5>

                <img
                  src={qrImage}
                  alt="UPI Payment QR Code"
                  className="img-fluid mb-3"
                  style={{
                    width: "220px",
                    maxWidth: "100%",
                    height: "auto",
                  }}
                />

                <p>
                  <strong>Order Total: ₹{total}</strong>
                </p>

                <p className="small text-muted mb-0">
                  Scan using your UPI app. Your payment must be
                  verified separately before the order is marked as paid.
                </p>
              </div>
            )}

            <div className="form-check border rounded p-3">
              <input
                className="form-check-input ms-0 me-2"
                type="radio"
                name="paymentMethod"
                id="codPayment"
                value="COD"
                checked={paymentMethod === "COD"}
                onChange={(e) => setPaymentMethod(e.target.value)}
              />

              <label className="form-check-label" htmlFor="codPayment">
                <strong>Cash on Delivery (COD)</strong>
                <span className="d-block small text-muted">
                  Pay when your order is delivered.
                </span>
              </label>
            </div>

            <button
              className="btn hero-primary-btn mt-4"
              type="submit"
              disabled={submitting}
            >
              {submitting ? "Placing Order..." : "Place Order →"}
            </button>

            <p className="small text-muted mt-3 mb-0">
              QR payments remain pending until verified. COD orders
              are paid upon delivery.
            </p>
          </form>
        </div>

        <div className="col-lg-5">
          <div className="summary-card">
            <h2>Your Order</h2>

            {cart.map((item) => (
              <div className="summary-row" key={item.key}>
                <span>
                  {item.name} × {item.quantity}
                  <small className="d-block">
                    {item.customization}
                  </small>
                </span>

                <strong>₹{item.price * item.quantity}</strong>
              </div>
            ))}

            <hr />

            <div className="summary-row summary-total">
              <span>Total</span>
              <strong>₹{total}</strong>
            </div>

            <div className="mt-3">
              <strong>Selected Payment:</strong>{" "}
              {paymentMethod === "QR"
                ? "UPI QR Code"
                : "Cash on Delivery"}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}