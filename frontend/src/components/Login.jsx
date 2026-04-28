import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import API from "../api/axios";
import "../clean.css";
import Alert from "../components/Alert";
import Loader from "../components/Loader";
import useUI from "../components/useUI";

export default function Login() {
  const [form, setForm] = useState({
    email: "",
    password: "",
    remember: false
  });

  const { loading, setLoading, error, setError } = useUI();
  const navigate = useNavigate();

  const handleLogin = async () => {
    if (!form.email || !form.password) {
      setError("All fields are required");
      return;
    }

    try {
      setLoading(true);

      const res = await API.post("/auth/login", form);

      const storage = form.remember ? localStorage : sessionStorage;
      storage.setItem("token", res.data.token);
      storage.setItem("user", res.data.name);

      navigate("/dashboard");

    } catch (err) {
      setError(err?.response?.data?.message || "Invalid credentials");
    } finally {
      setLoading(false);
    }
  };

  // Enter key support
  const handleKeyDown = (e) => {
    if (e.key === "Enter") handleLogin();
  };

  return (
    <div className="page-center">
      <div className="card">

        <h2 className="title">Welcome back</h2>
        <p className="subtitle">Login to continue</p>

        {/* ALERT */}
        <Alert type="error" message={error} />

        {/* EMAIL */}
        <label>Email</label>
        <input
          className="input"
          type="email"
          placeholder="Enter your email"
          value={form.email}
          onChange={(e) => setForm({ ...form, email: e.target.value })}
          onKeyDown={handleKeyDown}
        />

        {/* PASSWORD */}
        <label>Password</label>
        <input
          className="input"
          type="password"
          placeholder="Enter your password"
          value={form.password}
          onChange={(e) => setForm({ ...form, password: e.target.value })}
          onKeyDown={handleKeyDown}
        />

        {/* REMEMBER */}
        <label className="checkbox">
          <input
            type="checkbox"
            checked={form.remember}
            onChange={(e) => setForm({ ...form, remember: e.target.checked })}
          />
          Remember me
        </label>

        {/* BUTTON */}
        <button
          className="btn"
          onClick={handleLogin}
          disabled={loading}
        >
          {loading ? <Loader /> : "Login"}
        </button>

        {/* LINKS */}
       <div className="footer">
          <Link to="/register">Register</Link> |{" "}
          <Link to="/forgot">Forgot Password?</Link>
        </div>

      </div>
    </div>
  );
}