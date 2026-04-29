import { useState } from "react";
import { useParams } from "react-router-dom";
import API from "../api/axios";
import "../clean.css";
import Alert from "../components/Alert";
import Loader from "../components/Loader";
import useUI from "../components/useUI";

export default function ResetPassword() {
  const { token } = useParams();

  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");

  const ui = useUI();

  const handleReset = async () => {
    if (!password || !confirm) {
      return ui.setError("All fields required");
    }

    if (password !== confirm) {
      return ui.setError("Passwords do not match");
    }

    try {
      ui.setLoading(true);

      await API.post("/auth/reset-password", {
        token,
        password
      });

      ui.setMessage("Password reset successful");
      ui.setError("");

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

        <label>New Password</label>
        <input
          type="password"
          className="input"
          onChange={(e) => setPassword(e.target.value)}
        />

        <label>Confirm Password</label>
        <input
          type="password"
          className="input"
          onChange={(e) => setConfirm(e.target.value)}
        />

        <button className="btn" onClick={handleReset} disabled={ui.loading}>
          {ui.loading ? <Loader /> : "Reset Password"}
        </button>

        <Alert type="error" message={ui.error} />
        <Alert type="success" message={ui.message} />

      </div>
    </div>
  );
}