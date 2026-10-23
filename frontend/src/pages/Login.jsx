import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import Container from "react-bootstrap/Container";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Alert from "react-bootstrap/Alert";

function Login() {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleLogin = async (event) => {
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
          body: JSON.stringify({
            email: email.trim(),
            password,
          }),
        }
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Login failed.");
      }

      if (!data.token) {
        throw new Error("Login token was not received from the server.");
      }

      localStorage.setItem("fitfuelToken", data.token);

      if (data.user) {
        localStorage.setItem(
          "fitfuelUser",
          JSON.stringify(data.user)
        );
      }

      navigate("/home", { replace: true });
    } catch (err) {
      setError(
        err.message === "Failed to fetch"
          ? "Cannot connect to the server. Please make sure your backend is running."
          : err.message || "Something went wrong. Please try again."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="login-page">
      <Container className="py-5">
        <div
          className="mx-auto p-4 p-md-5 shadow rounded"
          style={{ maxWidth: "450px" }}
        >
          <div className="text-center mb-4">
            <h1 className="fw-bold">FitFuel</h1>
            <h3 className="mt-3">Welcome Back!</h3>
            <p className="text-muted">
              Login to your healthy lifestyle.
            </p>
          </div>

          {error && (
            <Alert
              variant="danger"
              dismissible
              onClose={() => setError("")}
            >
              {error}
            </Alert>
          )}

          <Form onSubmit={handleLogin}>
            <Form.Group className="mb-3" controlId="loginEmail">
              <Form.Label>Email Address</Form.Label>

              <Form.Control
                type="email"
                placeholder="Enter your email"
                value={email}
                onChange={(event) => setEmail(event.target.value)}
                autoComplete="email"
                required
              />
            </Form.Group>

            <Form.Group className="mb-4" controlId="loginPassword">
              <Form.Label>Password</Form.Label>

              <Form.Control
                type="password"
                placeholder="Enter your password"
                value={password}
                onChange={(event) => setPassword(event.target.value)}
                autoComplete="current-password"
                required
              />
            </Form.Group>

            <Button
              type="submit"
              variant="success"
              className="w-100 py-2"
              disabled={loading}
            >
              {loading ? "Logging in..." : "Login"}
            </Button>
          </Form>

          <div className="text-center mt-4">
            <p className="mb-0">
              Don't have an account?{" "}
              <Link to="/register">Register here</Link>
            </p>
          </div>
        </div>
      </Container>
    </div>
  );
}

export default Login;
