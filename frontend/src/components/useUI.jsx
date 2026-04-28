import { useState, useEffect } from "react";

export default function useUI() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");

  useEffect(() => {
    if (!error && !message) return;

    const timer = setTimeout(() => {
      setError("");
      setMessage("");
    }, 3000);

    return () => clearTimeout(timer);
  }, [error, message]);

  return {
    loading,
    setLoading,
    error,
    setError,
    message,
    setMessage,
  };
}