import { HashRouter, Routes, Route, Navigate } from "react-router-dom";

import Login from "./components/Login";
import Register from "./components/Register";
import Dashboard from "./components/Dashboard";
import ForgotPassword from "./components/ForgotPassword";
import ResetPassword from "./components/ResetPassword";

import ProtectedRoute from "./components/ProtectedRoute";
import PublicRoute from "./components/PublicRoute";

function App() {
  return (
    <HashRouter>
      <Routes>

        <Route path="/" element={<PublicRoute><Login /></PublicRoute>}/>

        <Route path="/login" element={<PublicRoute><Login /></PublicRoute>} />

        <Route path="/register" element={<PublicRoute><Register /></PublicRoute>} />

        <Route path="/forgot" element={<PublicRoute><ForgotPassword /></PublicRoute>} />

        <Route path="/reset/:token" element={<PublicRoute><ResetPassword /></PublicRoute>} />

        <Route path="/dashboard" element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />

        <Route path="*" element={<Navigate to="/login" />} />

      </Routes>
    </HashRouter>
  );
}

export default App;