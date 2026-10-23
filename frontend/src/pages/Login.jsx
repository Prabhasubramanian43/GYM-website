import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Container from "react-bootstrap/Container";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Alert from "react-bootstrap/Alert";

function Login() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChange = (event) => {
    setFormData({
      ...formData,
      [event.target.name]: event.target.value,
    });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setError("");
    setLoading(true);

    try {
      const response = await fetch(
        "http://localhost:5000/api/auth/login",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formData),
        }
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Login failed");
      }

      if (data.token) {
        localStorage.setItem("fitfuelToken", data.token);
      }

      if (data.user) {
        localStorage.setItem(
          "fitfuelUser",
          JSON.stringify(data.user)
        );
      }

      navigate("/");
    } catch (error) {
      setError(error.message || "Unable to connect to server");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container className="py-5">
      <div
        className="mx-auto p-4 border rounded shadow-sm"
        style={{ maxWidth: "450px" }}
      >
        <h2 className="text-center mb-4">Login to FitFuel</h2>

        {error && <Alert variant="danger">{error}</Alert>}

        <Form onSubmit={handleSubmit}>
          <Form.Group className="mb-3">
            <Form.Label>Email Address</Form.Label>

            <Form.Control
              type="email"
              name="email"
              placeholder="Enter your email"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Password</Form.Label>

            <Form.Control
              type="password"
              name="password"
              placeholder="Enter your password"
              value={formData.password}
              onChange={handleChange}
              required
            />
          </Form.Group>

          <Button
            type="submit"
            className="w-100"
            disabled={loading}
          >
            {loading ? "Logging in..." : "Login"}
          </Button>
        </Form>

        <p className="text-center mt-3 mb-0">
          Don't have an account?{" "}
          <Link to="/register">Register here</Link>
        </p>
      </div>
    </Container>
  );
}

export default Login;
