import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import API from "../api/axios";
import "../clean.css";
import Alert from "../components/Alert";
import Loader from "../components/Loader";
import useUI from "../components/useUI";

export default function ResetPassword() {
  const { token } = useParams();
  const navigate = useNavigate();

  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");

  const ui = useUI();

  const handleReset = async () => {
    // ✅ Validation
    if (!password || !confirm) {
      return ui.setError("All fields required");
    }

    if (password.length < 6) {
      return ui.setError("Password must be at least 6 characters");
    }

    if (password !== confirm) {
      return ui.setError("Passwords do not match");
    }

    try {
      ui.setLoading(true);

      await API.post("/auth/reset-password", {
        token,
        password,
      });

      ui.setMessage("Password reset successful! Redirecting...");
      ui.setError("");

      // ✅ Redirect after 2 seconds
      setTimeout(() => {
        navigate("/login");
      }, 2000);

    } catch (err) {
      ui.setError("Reset failed or link expired");
    } finally {
      ui.setLoading(false);
    }
  };

  return (
    <div className="page-center">
      <div className="card">

        <h2 className="title">Reset Password</h2>
        <p className="subtitle">Enter your new password</p>

        {/* Password */}
        <label>New Password</label>
        <input
          type="password"
          className="input"
          placeholder="Enter new password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        {/* Confirm Password */}
        <label>Confirm Password</label>
        <input
          type="password"
          className="input"
          placeholder="Confirm password"
          value={confirm}
          onChange={(e) => setConfirm(e.target.value)}
        />

        {/* Button */}
        <button
          className="btn"
          onClick={handleReset}
          disabled={ui.loading}
        >
          {ui.loading ? <Loader /> : "Reset Password"}
        </button>

        {/* Alerts */}
        <Alert type="error" message={ui.error} />
        <Alert type="success" message={ui.message} />

      </div>
    </div>
  );
}