import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import API from "../api/axios";
import "../clean.css";
import Alert from "../components/Alert";
import Loader from "../components/Loader";
import useUI from "../components/useUI";

export default function Register() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    password: "",
    confirm: ""
  });

  const { loading, setLoading, error, setError, message, setMessage } = useUI();
  const navigate = useNavigate();

  const handleRegister = async () => {
    if (!form.name || !form.email || !form.password || !form.confirm) {
      setError("All fields are required");
      return;
    }

    if (form.password !== form.confirm) {
      setError("Passwords do not match");
      return;
    }

    try {
      setLoading(true);

      await API.post("/auth/register", form);

      setMessage("Registered successfully!");

      setTimeout(() => {
        navigate("/login");
      }, 1500);

    } catch (err) {
      setError(err?.response?.data?.message || "Registration failed");
    } finally {
      setLoading(false);
    }
  };

  // Enter key support
  const handleKeyDown = (e) => {
    if (e.key === "Enter") handleRegister();
  };

  return (
    <div className="page-center">
      <div className="card">

        <h2 className="title">Create Account</h2>
        <p className="subtitle">Start managing your tasks</p>

        {/* ALERTS */}
        <Alert type="error" message={error} />
        <Alert type="success" message={message} />

        {/* NAME */}
        <label>Username</label>
        <input
          className="input"
          type="text"
          placeholder="Enter your name"
          value={form.name}
          onChange={(e) => setForm({ ...form, name: e.target.value })}
          onKeyDown={handleKeyDown}
        />

        {/* EMAIL */}
        <label>Email</label>
        <input
          className="input"
          type="email"
          placeholder="you@example.com"
          value={form.email}
          onChange={(e) => setForm({ ...form, email: e.target.value })}
          onKeyDown={handleKeyDown}
        />

        {/* PHONE */}
        <label>Phone</label>
        <input
          className="input"
          type="text"
          placeholder="+91 9876543210"
          value={form.phone}
          onChange={(e) => setForm({ ...form, phone: e.target.value })}
          onKeyDown={handleKeyDown}
        />

        {/* PASSWORD */}
        <label>Password</label>
        <input
          className="input"
          type="password"
          placeholder="Enter password"
          value={form.password}
          onChange={(e) => setForm({ ...form, password: e.target.value })}
          onKeyDown={handleKeyDown}
        />

        {/* CONFIRM */}
        <label>Confirm Password</label>
        <input
          className="input"
          type="password"
          placeholder="Confirm password"
          value={form.confirm}
          onChange={(e) => setForm({ ...form, confirm: e.target.value })}
          onKeyDown={handleKeyDown}
        />

        {/* BUTTON */}
        <button
          className="btn"
          onClick={handleRegister}
          disabled={loading}
        >
          {loading ? <Loader /> : "Register"}
        </button>

        {/* FOOTER */}
        <div className="footer">
          <p style={{ fontSize: "13px" }}>
            Already have an account?{" "}
            <Link to="/login" className="link">Login</Link>
          </p>
        </div>

      </div>
    </div>
  );
}