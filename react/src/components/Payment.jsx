
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
  const [activeTab, setActiveTab] = useState("login");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(true);
  const [currentStep, setCurrentStep] = useState(1);
  const [selectedPlan, setSelectedPlan] = useState("");

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

    setCurrentStep(2);
  };

  const plans = [
    { id: "monthly", name: "Monthly", duration: "1 Month", price: "₹1,500" },
    { id: "quarterly", name: "Quarterly", duration: "3 Months", price: "₹4,000" },
    { id: "annual", name: "Annual", duration: "12 Month", price: "₹14,000" },
  ];

  return (
    <div className="gym-page">
      <div className={`gym-container ${activeTab === "login" ? "login-mode" : ""}`}>

        {activeTab === "signup" && currentStep === 1 && (
          <a href="#" className="public-link">
            <FiExternalLink />
            Public Site
          </a>
        )}

        {activeTab === "signup" && currentStep === 1 && (
          <>
            <h1 className="gym-heading">JOIN UNISEX GYM</h1>

            <div className="steps">
              <button type="button" className="step active" onClick={() => setCurrentStep(1)}>1. Account</button>
              <button type="button" className="step" onClick={() => setCurrentStep(2)}>2. Plan</button>
              <div className="step">3. Payment</div>
              <div className="step">4. Done</div>
            </div>
          </>
        )}

        {/* Form Card */}
        <div className={`signup-card ${activeTab === "login" ? "login-card" : ""} ${activeTab === "signup" && currentStep === 2 ? "plan-card" : ""}`}>
          {activeTab === "login" && (
            <a href="#" className="public-link login-public-link">
              <FiExternalLink />
              Public Site
            </a>
          )}

          {activeTab === "signup" && currentStep === 2 ? (
            <div className="plan-selection">
              <h1 className="gym-heading">JOIN UNISEX GYM</h1>
              <div className="steps plan-steps">
                <button type="button" className="step" onClick={() => setCurrentStep(1)}>1. Account</button>
                <button type="button" className="step active" onClick={() => setCurrentStep(2)}>2. Plan</button>
                <div className="step">3. Payment</div>
                <div className="step">4. Done</div>
              </div>

              <div className="plan-options" role="radiogroup" aria-label="Membership plan">
                {plans.map((plan) => (
                  <label className={`plan-option ${selectedPlan === plan.id ? "selected" : ""}`} key={plan.id}>
                    <input
                      type="radio"
                      name="membership-plan"
                      value={plan.id}
                      checked={selectedPlan === plan.id}
                      onChange={() => setSelectedPlan(plan.id)}
                    />
                    <span className="plan-name">{plan.name}</span>
                    <span className="plan-duration">{plan.duration}</span>
                    <span className="plan-price">{plan.price}</span>
                  </label>
                ))}
              </div>

              <div className="plan-actions">
                <button type="button" className="plan-back" onClick={() => setCurrentStep(1)}>
                  Back
                </button>
                <button
                  type="button"
                  className="plan-continue"
                  disabled={!selectedPlan}
                  onClick={() => alert(`Selected plan: ${plans.find((plan) => plan.id === selectedPlan)?.name}`)}
                >
                  Continue
                </button>
              </div>
            </div>
          ) : (
          <>
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
            <div className="login-view">
              <h2>MEMBER LOGIN</h2>
              <p className="login-description">
                Only paid members can enter the portal. Demo: use an account
                you create via Join Now, or the demo member below.
              </p>

              <form className="login-form" onSubmit={(e) => e.preventDefault()}>
                <label htmlFor="login-email">EMAIL ADDRESS OR MOBILE NUMBER</label>
                <div className="input-box">
                  <FiMail />
                  <input
                    id="login-email"
                    type="text"
                    name="login"
                    placeholder="e.g. arjun.kapoor@example.com"
                    autoComplete="username"
                    required
                  />
                </div>

                <div className="login-password-heading">
                  <label htmlFor="login-password">PASSWORD</label>
                  <button type="button" className="forgot-password">
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

                <button type="submit" className="continue-btn">
                  Sign In to Member Dashboard
                  <FiArrowRight />
                </button>
              </form>

              <p className="login-text">
                Don&apos;t have a FITGUIDE account yet?
                <button type="button" onClick={() => setActiveTab("signup")}>
                  Create Account &amp; Join Now
                </button>
              </p>
            </div>
          )}

          </>
          )}
        </div>
      </div>
    </div>
  );
}

export default Payment;
