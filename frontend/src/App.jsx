import { useMemo, useState } from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import DashboardPage from "./pages/DashboardPage.jsx";
import LoginPage from "./pages/LoginPage.jsx";
import RegisterPage from "./pages/RegisterPage.jsx";
import ProtectedRoute from "./components/ProtectedRoute.jsx";

const API_BASE = "";
const TOKEN_KEY = "authrbacToken";

function App() {
  const [response, setResponse] = useState("Ready.");
  const [registerForm, setRegisterForm] = useState({
    name: "",
    email: "",
    password: "",
    role: "USER",
  });
  const [loginForm, setLoginForm] = useState({
    email: "",
    password: "",
  });
  const [user, setUser] = useState({
    email: "",
    role: "",
  });

  const saveToken = (token) => {
    localStorage.setItem(TOKEN_KEY, token);
  };

  const clearToken = () => {
    localStorage.removeItem(TOKEN_KEY);
  };

  const getToken = () => {
    return localStorage.getItem(TOKEN_KEY);
  };

  const sendRequest = async (path, options = {}) => {
    try {
      const result = await fetch(`${API_BASE}${path}`, options);
      const body = await result.text();
      return {
        ok: result.ok,
        status: result.status,
        body: body || "",
      };
    } catch (error) {
      return {
        ok: false,
        status: 0,
        body: error.message,
      };
    }
  };

  const handleLogin = async (event) => {
    if (event && event.preventDefault) {
      event.preventDefault();
    }

    try {
      const res = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(loginForm),
      });

      const body = await res.json();
      if (!res.ok) {
        setResponse(JSON.stringify(body));
        return null;
      }

      saveToken(body.token);
      setUser({
        email: body.email || loginForm.email,
        role: body.role || "USER",
      });
      setResponse(
        `Logged in as ${body.email || loginForm.email}. Role: ${body.role}`,
      );
      return body;
    } catch (err) {
      setResponse(err.message);
      return null;
    }
  };

  const handleLogout = () => {
    clearToken();
    setUser({ email: "", role: "" });
    setResponse("Logged out.");
  };

  const callApi = async (path, useAuth = false) => {
    const headers = { "Content-Type": "application/json" };
    if (useAuth) {
      const token = getToken();
      if (token) {
        headers.Authorization = `Bearer ${token}`;
      }
    }

    const result = await sendRequest(path, {
      method: "GET",
      headers,
    });

    setResponse(`GET ${path}\nStatus: ${result.status}\n\n${result.body}`);
  };

  return (
    <BrowserRouter>
      <div className="app-shell">
        <header className="hero">
          <div>
            <p className="eyebrow">Auth & RBAC</p>
            <h1>Auth & RBAC</h1>
            <p className="subtitle">A minimal authentication demo</p>
          </div>
          <div className="status-chip">
            <span>Current user</span>
            <strong>{user.email || "Not signed in"}</strong>
            <span>{user.role ? `Role: ${user.role}` : "Role: guest"}</span>
          </div>
        </header>

        <main className="layout-grid">
          <Routes>
            <Route
              path="/"
              element={
                user && user.role ? (
                  <Navigate to="/dashboard" />
                ) : (
                  <Navigate to="/login" />
                )
              }
            />

            <Route
              path="/login"
              element={
                <LoginPage
                  onAuthSuccess={(token, role, email) => {
                    saveToken(token);
                    setUser({ email, role });
                  }}
                />
              }
            />

            <Route path="/register" element={<RegisterPage />} />

            <Route
              path="/dashboard"
              element={
                <ProtectedRoute user={user}>
                  <DashboardPage
                    user={user}
                    response={response}
                    onLogout={handleLogout}
                    onApiCall={callApi}
                  />
                </ProtectedRoute>
              }
            />
          </Routes>
        </main>
      </div>
    </BrowserRouter>
  );
}

export default App;
