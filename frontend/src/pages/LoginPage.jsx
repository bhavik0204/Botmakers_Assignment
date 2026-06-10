import { useState } from "react";
import { useNavigate } from "react-router-dom";

function LoginPage({ onAuthSuccess }) {
  const [form, setForm] = useState({ email: "", password: "" });
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    try {
      const res = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      const body = await res.json();
      if (!res.ok) {
        setError(body.message || JSON.stringify(body));
        return;
      }

      onAuthSuccess(body.token, body.role, form.email);
      navigate("/dashboard");
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <section className="card">
      <h2>Login Page</h2>
      <p>Sign in with your email and password to access protected content.</p>
      <form className="form-grid" onSubmit={handleSubmit}>
        <label>
          Email
          <input
            type="email"
            value={form.email}
            onChange={(event) =>
              setForm({ ...form, email: event.target.value })
            }
            placeholder="Enter your email"
            required
          />
        </label>

        <label>
          Password
          <input
            type="password"
            value={form.password}
            onChange={(event) =>
              setForm({ ...form, password: event.target.value })
            }
            placeholder="Enter your password"
            required
          />
        </label>

        <div>
          <button type="submit" className="primary-button">
            Login
          </button>
        </div>

        {error && (
          <div style={{ color: "#b91c1c", marginTop: 12 }}>{error}</div>
        )}
      </form>
    </section>
  );
}

export default LoginPage;

