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
import { useNavigate } from "react-router-dom";

import "../styles/Payment.css";

/* ---------- DEMO USER STORAGE (browser localStorage) ----------
   Real project la idhu backend/database la irukkanum. */
const USERS_KEY = "fitguideUsers";

const getUsers = () => {
  try {
    return JSON.parse(localStorage.getItem(USERS_KEY)) || [];
  } catch {
    return [];
  }
};

const saveUsers = (users) => {
  localStorage.setItem(USERS_KEY, JSON.stringify(users));
};

const findUser = (identifier) => {
  const id = identifier.trim().toLowerCase();
  return getUsers().find((u) => u.email === id || u.phone === id);
};

function Payment({ initialTab = "signup" }) {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState(initialTab);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [showLoginPassword, setShowLoginPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(true);
  const [currentStep, setCurrentStep] = useState(1);
  const [selectedPlan, setSelectedPlan] = useState("");
  const [paymentMethod, setPaymentMethod] = useState("UPI");
  const [paid, setPaid] = useState(false); // Pay click pannina appuram true

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    password: "",
    confirmPassword: "",
  });
  const [accepted, setAccepted] = useState(false);

  const [loginData, setLoginData] = useState({ login: "", password: "" });

  // Warning messages
  const [signupError, setSignupError] = useState("");
  const [loginError, setLoginError] = useState("");

  const switchTab = (tab) => {
    setSignupError("");
    setLoginError("");
    setActiveTab(tab);
  };

  /* ---------- SIGN UP ---------- */

  const handleChange = (e) => {
    const { name, value } = e.target;
    setSignupError("");
    setFormData({
      ...formData,
      [name]: name === "phone" ? value.replace(/\D/g, "").slice(0, 10) : value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (formData.password !== formData.confirmPassword) {
      alert("Passwords do not match!");
      return;
    }

    if (!/^[6-9]\d{9}$/.test(formData.phone)) {
      alert("Enter a valid 10-digit mobile number.");
      return;
    }

    if (!accepted) {
      alert("Please accept the membership rules.");
      return;
    }

    // Already registered user ah nu check
    if (findUser(formData.email) || findUser(formData.phone)) {
      setSignupError(
        "This email or mobile number is already registered. Please login."
      );
      return;
    }

    // New user: Plan page ku pogalaam
    setSignupError("");
    setCurrentStep(2);
  };

  // Payment mudinjadhum user ah save pannum (paid member aagiduvaanga)
  const handlePay = () => {
    const email = formData.email.trim().toLowerCase();
    const users = getUsers();

    if (!users.some((u) => u.email === email || u.phone === formData.phone)) {
      users.push({
        name: formData.name.trim(),
        email,
        phone: formData.phone,
        password: formData.password, // DEMO ONLY: real project la password hash pannanum
        plan: chosenPlan?.name,
      });
      saveUsers(users);
    }

    setPaid(true);
    setCurrentStep(4);
  };

  /* ---------- LOGIN ---------- */

  const handleLoginChange = (e) => {
    setLoginError("");
    setLoginData({ ...loginData, [e.target.name]: e.target.value });
  };

  const handleLogin = (e) => {
    e.preventDefault();

    const user = findUser(loginData.login);

    if (!user) {
      setLoginError(
        "No account found with this email or mobile number. Please sign up first."
      );
      return;
    }

    if (user.password !== loginData.password) {
      setLoginError("Incorrect password. Please try again.");
      return;
    }

    setLoginError("");
    navigate("/dashboard"); // unga dashboard route ku maathikonga
  };

  const plans = [
    { id: "monthly", name: "Monthly", duration: "1 Month", price: "₹1,500" },
    { id: "quarterly", name: "Quarterly", duration: "3 Months", price: "₹4,000" },
    { id: "annual", name: "Annual", duration: "12 Month", price: "₹14,000" },
  ];
  const chosenPlan = plans.find((plan) => plan.id === selectedPlan);

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
              {/* Plan pill lock: Continue button dhaan Plan ku kootitu pogum */}
              <button type="button" className="step" disabled>2. Plan</button>
              <div className="step">3. Payment</div>
              <div className="step">4. Done</div>
            </div>
          </>
        )}

        {/* Form Card */}
        <div className={`signup-card ${activeTab === "login" ? "login-card" : ""} ${activeTab === "signup" && currentStep >= 2 ? "plan-card" : ""}`}>
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
                <button type="button" className="step active">2. Plan</button>
                <button type="button" className="step" disabled={!selectedPlan} onClick={() => setCurrentStep(3)}>3. Payment</button>
                <button type="button" className="step" disabled={!paid} onClick={() => setCurrentStep(4)}>4. Done</button>
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
                  onClick={() => setCurrentStep(3)}
                >
                  Continue
                </button>
              </div>
            </div>
          ) : activeTab === "signup" && currentStep === 3 ? (
            <div className="payment-selection">
              <h1 className="gym-heading">JOIN UNISEX GYM</h1>
              <div className="steps plan-steps">
                <button type="button" className="step" onClick={() => setCurrentStep(1)}>1. Account</button>
                <button type="button" className="step" onClick={() => setCurrentStep(2)}>2. Plan</button>
                <button type="button" className="step active">3. Payment</button>
                <button type="button" className="step" disabled={!paid} onClick={() => setCurrentStep(4)}>4. Done</button>
              </div>

              <div className="payment-panel">
                <h2>Payment</h2>
                <div className="payment-summary">
                  <span>{chosenPlan?.name} Plan . {chosenPlan?.duration}</span>
                  <strong>{chosenPlan?.price}</strong>
                </div>

                <fieldset className="payment-methods">
                  <legend className="visually-hidden">Choose a payment method</legend>
                  {["UPI", "Card", "Net Banking"].map((method) => (
                    <label className="payment-method" key={method}>
                      <input
                        type="radio"
                        name="payment-method"
                        value={method}
                        checked={paymentMethod === method}
                        onChange={() => setPaymentMethod(method)}
                      />
                      <span>{method}</span>
                    </label>
                  ))}
                </fieldset>

                <p className="payment-disclaimer">
                  Demo only: no real payment is taken and the result below is simulated. In production the payment provider collects payment details and your account activates only after the server verifies it.
                </p>

                <div className="payment-actions">
                  <button type="button" className="plan-back" onClick={() => setCurrentStep(2)}>
                    Back
                  </button>
                  <button type="button" className="demo-pay-button" onClick={handlePay}>
                    Pay {chosenPlan?.price} with {paymentMethod} (demo)
                  </button>
                </div>
              </div>
            </div>
          ) : activeTab === "signup" && currentStep === 4 ? (
            <div className="payment-success">
              <h1 className="gym-heading">JOIN UNISEX GYM</h1>
              <div className="steps plan-steps">
                <div className="step">1. Account</div>
                <div className="step">2. Plan</div>
                <div className="step">3. Payment</div>
                <div className="step active">4. Done</div>
              </div>
              <div className="success-panel">
                <h2>Welcome to UNISEX GYM</h2>
                <p><FiCheck /> Payment verified</p>
                <button type="button" className="demo-pay-button" onClick={() => navigate("/onboarding")}>
                  Next
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
                  onClick={() => switchTab("login")}
                >
                  <FiExternalLink />
                  Sign In (Login)
                </button>

                <button
                  type="button"
                  className={activeTab === "signup" ? "tab active-tab" : "tab"}
                  onClick={() => switchTab("signup")}
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
                            inputMode="numeric"
                            maxLength={10}
                            pattern="[6-9][0-9]{9}"
                            title="Enter a 10-digit mobile number"
                            name="phone"
                            placeholder="98765 43210"
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

                    {/* Already registered warning */}
                    {signupError && (
                      <p className="form-warning" role="alert">
                        {signupError}
                        <button type="button" onClick={() => switchTab("login")}>
                          Go to Login
                        </button>
                      </p>
                    )}

                    <button type="submit" className="continue-btn">
                      Continue to Package Selection
                      <FiArrowRight />
                    </button>

                  </form>

                  <p className="login-text">
                    Already registered as a member?
                    <span onClick={() => switchTab("login")}>
                      Sign In to Dashboard
                    </span>
                  </p>
                </>
              ) : (
                <div className="login-view">
                  <h2>MEMBER LOGIN</h2>
                  <p className="login-description">
                    Only paid members can enter the portal. Use the account
                    you created via Join Now.
                  </p>

                  <form className="login-form" onSubmit={handleLogin}>
                    <label htmlFor="login-email">EMAIL ADDRESS OR MOBILE NUMBER</label>
                    <div className="input-box">
                      <FiMail />
                      <input
                        id="login-email"
                        type="text"
                        name="login"
                        placeholder="e.g. arjun.kapoor@example.com"
                        autoComplete="username"
                        value={loginData.login}
                        onChange={handleLoginChange}
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
                        type={showLoginPassword ? "text" : "password"}
                        name="password"
                        placeholder="Enter your password"
                        autoComplete="current-password"
                        value={loginData.password}
                        onChange={handleLoginChange}
                        required
                      />
                      <button
                        type="button"
                        className="eye-btn"
                        aria-label={showLoginPassword ? "Hide password" : "Show password"}
                        onClick={() => setShowLoginPassword(!showLoginPassword)}
                      >
                        {showLoginPassword ? <FiEyeOff /> : <FiEye />}
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

                    {/* Account illa / password thappu warning */}
                    {loginError && (
                      <p className="form-warning" role="alert">
                        {loginError}
                        {loginError.includes("sign up") && (
                          <button type="button" onClick={() => switchTab("signup")}>
                            Go to Sign Up
                          </button>
                        )}
                      </p>
                    )}

                    <button type="submit" className="continue-btn">
                      Sign In to Member Dashboard
                      <FiArrowRight />
                    </button>
                  </form>

                  <p className="login-text">
                    Don&apos;t have a FITGUIDE account yet?
                    <button type="button" onClick={() => switchTab("signup")}>
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