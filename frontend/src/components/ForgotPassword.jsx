import { useState } from "react";
import API from "../api/axios";
import Alert from "../components/Alert";
import Loader from "../components/Loader";
import useUI from "../components/useUI";
import "../clean.css";

export default function ForgotPassword() {
  const [email, setEmail] = useState("");

  const { loading, setLoading, error, setError, message, setMessage } = useUI();

  const handleSubmit = async () => {
    if (!email) return setError("Email required");

    try {
      setLoading(true);
      await API.post("/auth/forgot-password", { email });
      setMessage("Reset link sent to email");
    } catch {
      setError("Failed to send email");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="page-center">
      <div className="card">
        <h2 className="title">Forgot Password</h2><br/>

	<label> Enter your Registered Email:</label>
        <input className="input" placeholder="Email"
          onChange={(e) => setEmail(e.target.value)}
        />

        <button className="btn" onClick={handleSubmit} disabled={loading}>
          {loading ? <Loader /> : "Send Reset Link"}
        </button>

        <Alert type="error" message={error} />
        <Alert type="success" message={message} />
      </div>
    </div>
  );
}