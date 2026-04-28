import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import API from "../api/axios";
import "../clean.css";
import Alert from "../components/Alert";
import Loader from "../components/Loader";
import useUI from "../components/useUI";

export default function ResetPassword() {
  const { token } = useParams();

  const [password, setPassword] = useState("");

  const { loading, setLoading, error, setError, message, setMessage } = useUI();

  const handleReset = async () => {
    if (!password) return setError("Enter password");

    try {
      setLoading(true);
      await API.post(`/auth/reset/${token}`, { password });
      setMessage("Password reset successful");
    } catch {
      setError("Reset failed or Link Expired");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="page-center">
      <div className="card">

        <h2 className="title">Reset Password</h2>

        {msg && <p style={{color:"red", fontSize:"13px"}}>{msg}</p>}

	<label> Enter New Password:</label>
        <input
          type="password"
          className="input"
          placeholder="New Password"
          onChange={(e)=>setPassword(e.target.value)}
        />

	<label>Confirm Password:</label>
        <input
          type="password"
          className="input"
          placeholder="Confirm Password"
          onChange={(e)=>setConfirm(e.target.value)}
        />

        <button className="btn" onClick={handleReset}>
          Reset Password
        </button>

 <Alert type="error" message={error} />
        <Alert type="success" message={message} />

      </div>
    </div>
  );
}