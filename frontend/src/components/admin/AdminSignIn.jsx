import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  FiMail,
  FiLock,
  FiEye,
  FiEyeOff,
  FiArrowRight,
} from "react-icons/fi";
import "../../styles/AdminPortal.css";

function AdminSignIn({ onLoginSuccess }) {
  const navigate = useNavigate();
  const [email, setEmail] = useState("admin@fitguide.club");
  const [password, setPassword] = useState("FitGuide@2026");
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(true);
  const [loginError, setLoginError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoginError("");
    setIsLoading(true);

    if (
      email.trim().toLowerCase() === "admin@fitguide.club" &&
      password === "FitGuide@2026"
    ) {
      if (rememberMe) {
        localStorage.setItem("fitguideAdminToken", "admin-verified-session-token");
      }
      setIsLoading(false);
      onLoginSuccess();
    } else {
      setLoginError("Invalid credentials. Please use demo credentials.");
      setIsLoading(false);
    }
  };

  return (
    <div className="admin-portal-wrapper">
      <header className="admin-app-bar">
        <div className="admin-breadcrumb">FITGUIDE Admin Portal</div>
        <button
          onClick={() => navigate("/")}
          style={{
            background: "none",
            border: "none",
            color: "#c5ff16",
            cursor: "pointer",
            fontSize: "12px",
          }}
        >
          ↗ Public Site
        </button>
      </header>

      <main className="admin-signin-container">
        <div className="admin-signin-header">
          <h1>Admin Portal Sign In</h1>
          <p>
            Manage member accounts, plans, payments, workouts, and diet
            schedules.
          </p>
        </div>

        <div className="admin-signin-card">
          {loginError && <div className="admin-error-box">{loginError}</div>}

          <form onSubmit={handleSubmit}>
            <div className="admin-form-group">
              <label>Email Address</label>
              <div className="admin-input-box">
                <FiMail className="admin-input-icon" />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="admin@fitguide.club"
                  required
                />
              </div>
            </div>

            <div className="admin-form-group">
              <label>Password</label>
              <div className="admin-input-box">
                <FiLock className="admin-input-icon" />
                <input
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Enter password"
                  required
                />
                <button
                  type="button"
                  className="admin-eye-button"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? <FiEyeOff /> : <FiEye />}
                </button>
              </div>
            </div>

            <div className="admin-remember-row">
              <label className="admin-remember-label">
                <input
                  type="checkbox"
                  checked={rememberMe}
                  onChange={(e) => setRememberMe(e.target.checked)}
                />
                Remember Me
              </label>
              <a
                href="#forgot"
                className="admin-forgot-link"
                onClick={(e) => {
                  e.preventDefault();
                  alert("Admin password reset sent to admin@fitguide.club");
                }}
              >
                Forgot Password?
              </a>
            </div>

            <button
              type="submit"
              className="admin-login-button"
              disabled={isLoading}
            >
              {isLoading ? "Signing in..." : "Login to Dashboard"}{" "}
              <FiArrowRight />
            </button>

            <div className="admin-demo-box">
              <span>
                Demo Admin: <strong>admin@fitguide.club</strong>
              </span>
              <span>
                <strong>FitGuide@2026</strong>
              </span>
            </div>
          </form>
        </div>
      </main>
    </div>
  );
}

export default AdminSignIn;
