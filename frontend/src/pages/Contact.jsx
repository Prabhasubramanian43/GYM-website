import { useState } from "react";
import { apiRequest } from "../api.js";
export default function Contact() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });
  const [sent, setSent] = useState(false);
  const [error, setError] = useState("");
  const [sending, setSending] = useState(false);
  function change(e) {
    setForm({ ...form, [e.target.name]: e.target.value });
  }
  async function submit(e) {
    e.preventDefault();
    setSent(false);
    setError("");
    setSending(true);
    try {
      await apiRequest("/contact", {
        method: "POST",
        body: JSON.stringify(form),
      });
      setSent(true);
      setForm({ name: "", email: "", subject: "", message: "" });
    } catch (err) {
      setError(
        `${err.message} Please make sure the backend and MongoDB are running.`,
      );
    } finally {
      setSending(false);
    }
  }
  return (
    <div className="page-shell">
      <section className="page-hero">
        <div className="container">
          <p className="section-subtitle">GET IN TOUCH</p>
          <h1>Contact FitFuel</h1>
          <p>Questions about our menu? Send us a message.</p>
        </div>
      </section>
      <section className="container py-5">
        <div className="row g-5">
          <div className="col-lg-5">
            <h2 className="page-heading">We'd love to hear from you.</h2>
            <p>Reach out with questions or feedback about the FitFuel menu.</p>
            <div className="contact-info">
              <p>
                📍 <strong>Location</strong>
                <br />
                Madurai, Tamil Nadu
              </p>
              <p>
                ✉️ <strong>Email</strong>
                <br />
                fitfuel@example.com
              </p>
              <p>
                📞 <strong>Phone</strong>
                <br />
                +91 98765 43210
              </p>
            </div>
          </div>
          <div className="col-lg-7">
            {sent && (
              <div className="alert alert-success">
                Thank you! Your message has been saved successfully.
              </div>
            )}
            {error && <div className="alert alert-danger">{error}</div>}
            <form className="form-card" onSubmit={submit}>
              <div className="mb-3">
                <label className="form-label">Your name *</label>
                <input
                  className="form-control"
                  name="name"
                  value={form.name}
                  onChange={change}
                  required
                />
              </div>
              <div className="mb-3">
                <label className="form-label">Email *</label>
                <input
                  className="form-control"
                  name="email"
                  type="email"
                  value={form.email}
                  onChange={change}
                  required
                />
              </div>
              <div className="mb-3">
                <label className="form-label">Subject</label>
                <input
                  className="form-control"
                  name="subject"
                  value={form.subject}
                  onChange={change}
                />
              </div>
              <div className="mb-3">
                <label className="form-label">Message *</label>
                <textarea
                  className="form-control"
                  rows="5"
                  name="message"
                  value={form.message}
                  onChange={change}
                  required
                />
              </div>
              <button
                className="btn hero-primary-btn"
                type="submit"
                disabled={sending}
              >
                {sending ? "Sending..." : "Send Message →"}
              </button>
              <p className="small text-muted mt-3 mb-0">
                Your message will be securely stored in the FitFuel database.
              </p>
            </form>
          </div>
        </div>
      </section>
    </div>
  );
}
