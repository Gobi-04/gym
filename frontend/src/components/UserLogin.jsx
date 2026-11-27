import React, { useState } from "react";
import {
  FiMail,
  FiLock,
  FiEye,
  FiEyeOff,
  FiArrowRight,
  FiExternalLink,
  FiUser,
} from "react-icons/fi";
import { useNavigate, Link } from "react-router-dom";
import { api } from "../services/api";
import "../styles/Payment.css";

const USERS_KEY = "fitguideUsers";

const getUsers = () => {
  try {
    return JSON.parse(localStorage.getItem(USERS_KEY)) || [];
  } catch {
    return [];
  }
};

const findUser = (identifier) => {
  const id = identifier.trim().toLowerCase();
  return getUsers().find((u) => u.email === id || u.phone === id);
};

function UserLogin({ onSwitchToSignup }) {
  const navigate = useNavigate();
  const [loginData, setLoginData] = useState({ login: "", password: "" });
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(true);
  const [loginError, setLoginError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleInputChange = (e) => {
    setLoginError("");
    setLoginData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleLoginSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setLoginError("");

    // 1. Try logging in via MySQL Database backend
    try {
      const res = await api.login(loginData.login, loginData.password);
      if (res?.user) {
        localStorage.setItem("fitguideCurrentUser", JSON.stringify(res.user));
        if (res.user.fitnessProfile?.goal || res.user.goal) {
          const rawGoal = res.user.fitnessProfile?.goal || res.user.goal;
          const mappedGoal =
            rawGoal === "muscle-building"
              ? "bulking"
              : rawGoal === "fat-loss"
              ? "weightLoss"
              : rawGoal;
          localStorage.setItem("fitguide-goal", mappedGoal);
        }
        if (res.user.fitnessProfile?.diet || res.user.diet) {
          localStorage.setItem("fitguide-diet", res.user.fitnessProfile?.diet || res.user.diet);
        }
        setLoginError("");
        navigate("/dashboard");
        return;
      }
    } catch (err) {
      if (
        err.message.includes("Incorrect password") ||
        err.message.includes("No account found")
      ) {
        setLoginError(err.message);
        setIsLoading(false);
        return;
      }
      console.warn("Backend not available, trying local storage:", err.message);
    }

    // 2. Fallback to localStorage
    const user = findUser(loginData.login);

    if (!user) {
      setLoginError(
        "No account found with this email or mobile number. Please sign up first."
      );
      setIsLoading(false);
      return;
    }

    if (user.password !== loginData.password) {
      setLoginError("Incorrect password. Please try again.");
      setIsLoading(false);
      return;
    }

    localStorage.setItem("fitguideCurrentUser", JSON.stringify(user));
    if (user.fitnessProfile?.goal || user.goal) {
      const rawGoal = user.fitnessProfile?.goal || user.goal;
      const mappedGoal =
        rawGoal === "muscle-building"
          ? "bulking"
          : rawGoal === "fat-loss"
          ? "weightLoss"
          : rawGoal;
      localStorage.setItem("fitguide-goal", mappedGoal);
    }
    if (user.fitnessProfile?.diet || user.diet) {
      localStorage.setItem("fitguide-diet", user.fitnessProfile?.diet || user.diet);
    }
    setLoginError("");
    setIsLoading(false);
    navigate("/dashboard");
  };

  return (
    <div className="gym-page">
      <div className="gym-container login-mode">
        <Link to="/" className="public-link">
          <FiExternalLink />
          Public Site
        </Link>

        <h1 className="gym-heading">JOIN UNISEX GYM</h1>

        <div className="auth-card">
          {/* Auth Tabs */}
          <div className="auth-tabs">
            <button
              type="button"
              className="tab active-tab"
            >
              <FiExternalLink />
              Sign In (Login)
            </button>

            <button
              type="button"
              className="tab"
              onClick={() => {
                if (onSwitchToSignup) {
                  onSwitchToSignup();
                } else {
                  navigate("/login?mode=signup");
                }
              }}
            >
              <FiUser />
              Create Account (Sign Up)
            </button>
          </div>

          <div className="login-view">
            <h2>MEMBER LOGIN</h2>
            <p className="login-description">
              Only paid members can enter the portal. Use the account you
              created via Join Now.
            </p>

            <form className="login-form" onSubmit={handleLoginSubmit}>
              <label htmlFor="login-email">
                EMAIL ADDRESS OR MOBILE NUMBER
              </label>
              <div className="input-box">
                <FiMail />
                <input
                  id="login-email"
                  type="text"
                  name="login"
                  placeholder="e.g. arjun.kapoor@example.com"
                  autoComplete="username"
                  value={loginData.login}
                  onChange={handleInputChange}
                  required
                />
              </div>

              <div className="login-password-heading">
                <label htmlFor="login-password">PASSWORD</label>
                <button
                  type="button"
                  className="forgot-password"
                  onClick={() =>
                    alert(
                      "Please contact gym support at support@fitguide.club to reset your password."
                    )
                  }
                >
                  Forgot Password?
                </button>
              </div>

              <div className="input-box">
                <FiLock />
                <input
                  id="login-password"
                  type={showPassword ? "text" : "password"}
                  name="password"
                  placeholder="Enter your password"
                  autoComplete="current-password"
                  value={loginData.password}
                  onChange={handleInputChange}
                  required
                />
                <button
                  type="button"
                  className="eye-btn"
                  aria-label={showPassword ? "Hide password" : "Show password"}
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? <FiEyeOff /> : <FiEye />}
                </button>
              </div>

              <label className="remember-option">
                <input
                  type="checkbox"
                  checked={rememberMe}
                  onChange={(e) => setRememberMe(e.target.checked)}
                />
                <span>Remember me on this browser</span>
              </label>

              {/* Login Error Notification */}
              {loginError && (
                <p className="form-warning" role="alert">
                  {loginError}
                  {loginError.includes("sign up") && (
                    <button
                      type="button"
                      onClick={() => {
                        if (onSwitchToSignup) {
                          onSwitchToSignup();
                        } else {
                          navigate("/login?mode=signup");
                        }
                      }}
                    >
                      Go to Sign Up
                    </button>
                  )}
                </p>
              )}

              <button
                type="submit"
                className="continue-btn"
                disabled={isLoading}
              >
                {isLoading ? "Signing In..." : "Sign In to Member Dashboard"}
                <FiArrowRight />
              </button>
            </form>

            <p className="login-text">
              Don&apos;t have a FITGUIDE account yet?
              <button
                type="button"
                onClick={() => {
                  if (onSwitchToSignup) {
                    onSwitchToSignup();
                  } else {
                    navigate("/login?mode=signup");
                  }
                }}
              >
                Create Account &amp; Join Now
              </button>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default UserLogin;
