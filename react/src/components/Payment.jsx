
import React, { useState } from "react";
import {
  FiArrowRight,
  FiExternalLink,
  FiUser,
  FiMail,
  FiPhone,
  FiLock,
  FiEye,
  FiEyeOff,
  FiCheck,
} from "react-icons/fi";

import "../styles/Payment.css";

function Payment() {
  const [activeTab, setActiveTab] = useState("signup");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    password: "",
    confirmPassword: "",
  });

  const [accepted, setAccepted] = useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (formData.password !== formData.confirmPassword) {
      alert("Passwords do not match!");
      return;
    }

    if (!accepted) {
      alert("Please accept the membership rules.");
      return;
    }

    alert("Account details submitted successfully!");
  };

  return (
    <div className="gym-page">
      <div className="gym-container">

        <a href="#" className="public-link">
          <FiExternalLink />
          Public Site
        </a>

        <h1 className="gym-heading">JOIN UNISEX GYM</h1>

        {/* Steps */}
        <div className="steps">
          <div className="step active">
            1. Account
          </div>
          <div className="step">2. Plan</div>
          <div className="step">3. Payment</div>
          <div className="step">4. Done</div>
        </div>

        {/* Form Card */}
        <div className="signup-card">

          {/* Login / Signup Tabs */}
          <div className="auth-tabs">
            <button
              type="button"
              className={activeTab === "login" ? "tab active-tab" : "tab"}
              onClick={() => setActiveTab("login")}
            >
              <FiExternalLink />
              Sign In (Login)
            </button>

            <button
              type="button"
              className={activeTab === "signup" ? "tab active-tab" : "tab"}
              onClick={() => setActiveTab("signup")}
            >
              <FiUser />
              Create Account (Sign Up)
            </button>
          </div>

          {activeTab === "signup" ? (
            <>
              <div className="step-label">
                STEP 01 OF 3: ACCOUNT CREATION
              </div>

              <h2>Join FitGuide Arena</h2>

              <p className="description">
                Create your account to choose a membership plan
                and unlock your digital guidance portal.
              </p>

              <form onSubmit={handleSubmit}>

                <label>FULL NAME *</label>
                <div className="input-box">
                  <FiUser />
                  <input
                    type="text"
                    name="name"
                    placeholder="e.g. Rahul Sharma"
                    value={formData.name}
                    onChange={handleChange}
                    required
                  />
                </div>

                <div className="form-row">
                  <div className="form-group">
                    <label>EMAIL ADDRESS *</label>
                    <div className="input-box">
                      <FiMail />
                      <input
                        type="email"
                        name="email"
                        placeholder="rahul@domain.com"
                        value={formData.email}
                        onChange={handleChange}
                        required
                      />
                    </div>
                  </div>

                  <div className="form-group">
                    <label>MOBILE NUMBER *</label>
                    <div className="input-box">
                      <FiPhone />
                      <input
                        type="tel"
                        name="phone"
                        placeholder="+91 98765 43210"
                        value={formData.phone}
                        onChange={handleChange}
                        required
                      />
                    </div>
                  </div>
                </div>

                <div className="form-row">
                  <div className="form-group">
                    <label>CREATE PASSWORD *</label>
                    <div className="input-box">
                      <FiLock />
                      <input
                        type={showPassword ? "text" : "password"}
                        name="password"
                        placeholder="Min 6 characters"
                        value={formData.password}
                        onChange={handleChange}
                        minLength="6"
                        required
                      />

                      <button
                        type="button"
                        className="eye-btn"
                        onClick={() => setShowPassword(!showPassword)}
                      >
                        {showPassword ? <FiEyeOff /> : <FiEye />}
                      </button>
                    </div>
                  </div>

                  <div className="form-group">
                    <label>CONFIRM PASSWORD *</label>
                    <div className="input-box">
                      <FiLock />
                      <input
                        type={showConfirmPassword ? "text" : "password"}
                        name="confirmPassword"
                        placeholder="Re-enter password"
                        value={formData.confirmPassword}
                        onChange={handleChange}
                        minLength="6"
                        required
                      />

                      <button
                        type="button"
                        className="eye-btn"
                        onClick={() =>
                          setShowConfirmPassword(!showConfirmPassword)
                        }
                      >
                        {showConfirmPassword ? <FiEyeOff /> : <FiEye />}
                      </button>
                    </div>
                  </div>
                </div>

                <div className="terms">
                  <input
                    type="checkbox"
                    checked={accepted}
                    onChange={(e) => setAccepted(e.target.checked)}
                  />

                  <p>
                    I accept the <strong>FITGUIDE Gym Membership Rules</strong>,
                    facility safety policies, and digital workout terms.
                  </p>
                </div>

                <button type="submit" className="continue-btn">
                  Continue to Package Selection
                  <FiArrowRight />
                </button>

              </form>

              <p className="login-text">
                Already registered as a member?
                <span onClick={() => setActiveTab("login")}>
                  Sign In to Dashboard
                </span>
              </p>
            </>
          ) : (
            <div className="login-placeholder">
              <h2>Welcome Back!</h2>
              <p>Login form can be added here.</p>
              <button
                className="continue-btn"
                onClick={() => setActiveTab("signup")}
              >
                Create New Account
              </button>
            </div>
          )}

        </div>
      </div>
    </div>
  );
}

export default Payment;
