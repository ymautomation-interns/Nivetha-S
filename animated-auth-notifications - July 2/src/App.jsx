import { useState, useRef } from 'react';
import { FiUser, FiEyeOff, FiPhone, FiMail, FiLogIn, FiUserPlus, FiChevronLeft } from 'react-icons/fi';
import Dashboard from './Dashboard';
import NotificationSidebar from './NotificationSidebar';
import './index.css';

// Import images
import logo from './assets/logo.png';
import loginImg from './assets/login.png';
import signupImg from './assets/signup.png';
import forgotImg from './assets/forget-pass.png';
import verifyImg from './assets/check-email.png';
import resetImg from './assets/reset-pass.png';

function App() {
  const [mode, setMode] = useState('login'); // 'login', 'signup', 'forgot', 'verify', 'reset', 'dashboard'
  const [notifications, setNotifications] = useState([]);
  const otpRefs = useRef([]);

  const addNotification = (title, description, type = "success") => {
    const id = Date.now();

    const newNotification = {
      id,
      title,
      description,
      type
    };

    // LIFO → newest comes FIRST (TOP)
    setNotifications((prev) => [newNotification, ...prev]);

    // auto remove after 4 sec
    setTimeout(() => {
      setNotifications((prev) =>
        prev.filter((n) => n.id !== id)
      );
    }, 4000);
  };

  const handleOtpChange = (index, e) => {
    const value = e.target.value;
    if (value && index < 5) {
      otpRefs.current[index + 1].focus();
    }
  };

  const handleOtpKeyDown = (index, e) => {
    if (e.key === 'Backspace' && !e.target.value && index > 0) {
      otpRefs.current[index - 1].focus();
    }
  };

  const handleVerify = (e) => {
    e.preventDefault();
    setMode('reset');
  };

  // If in dashboard mode, render the full Dashboard & Sidebar
  if (mode === 'dashboard') {
    return (
      <div className="dashboard-full-page">
        <Dashboard addNotification={addNotification} />
        <NotificationSidebar addNotification={addNotification} />
        <div className="notification-stack">
          {notifications.map((n) => (
            <div key={n.id} className={`toast ${n.type}`}>
              <h4>{n.title}</h4>
              <p>{n.description}</p>
            </div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className={`auth-container mode-${mode}`}>
      
      {/* Sidebar Navigation */}
      <div className="sidebar">
        <div className="logo-container">
        <img src={logo} alt="Logo" className="sidebar-logo" />
        </div>
        
        <div className={`nav-tabs ${mode !== 'login' && mode !== 'signup' ? 'hidden' : ''}`}>
          <div className="active-indicator" style={{ transform: `translateY(${mode === 'signup' ? '100%' : '0'})` }}></div>
          <div className={`nav-tab ${mode === 'login' ? 'active' : ''}`} onClick={() => setMode('login')}>
            <FiLogIn />
            <span>Login</span>
          </div>
          <div className={`nav-tab ${mode === 'signup' ? 'active' : ''}`} onClick={() => setMode('signup')}>
            <FiUserPlus />
            <span>Sign Up</span>
          </div>
        </div>
      </div>

      {/* Main Content Area */}
      <div className="main-content">
        
        {/* Blue Sliding Overlay */}
        <div className="overlay-container">
          <div className="overlay">
            
            <div className={`overlay-panel overlay-login`}>
              <h1>Welcome Back</h1>
              <p>Please Enter Your Credentials.</p>
              <div className="mockup-image">
                <img src={loginImg} alt="Login" />
              </div>
            </div>

            <div className={`overlay-panel overlay-signup`}>
              <h1>Sign Up Now.</h1>
              <p>Please Create Your Account.</p>
              <div className="mockup-image">
                <img src={signupImg} alt="Signup" />
              </div>
            </div>

            <div className={`overlay-panel overlay-forgot`}>
              <h1>Forgot password</h1>
              <p>Let's get you back into your account.</p>
              <div className="mockup-image">
                <img src={forgotImg} alt="Forgot Password" />
              </div>
            </div>

            <div className={`overlay-panel overlay-verify`}>
              <h1>Email Verification</h1>
              <p>Verify your email to continue.</p>
              <div className="mockup-image">
                <img src={verifyImg} alt="Verify Email" />
              </div>
            </div>

            <div className={`overlay-panel overlay-reset`}>
              <h1>Password Reset</h1>
              <p>Set a new password for your account.</p>
              <div className="mockup-image">
                <img src={resetImg} alt="Reset Password" />
              </div>
            </div>
            
          </div>
        </div>

        {/* Forms Section */}
        <div className="forms-container">
          {/* Back Button */}
          <button 
            className={`back-btn ${mode !== 'login' && mode !== 'signup' ? 'visible' : ''}`}
            onClick={() => setMode('login')}
          >
            <FiChevronLeft /> Back
          </button>
          
          {/* Login Form */}
          <div className="form-wrapper form-login">
            <h2>Login</h2>
            <form onSubmit={(e) => { e.preventDefault(); setMode('dashboard'); }}>
              <div className="input-group">
                <label>User Name</label>
                <div className="input-field">
                  <input type="text" placeholder="Enter User Name" />
                  <FiUser className="icon" />
                </div>
              </div>
              <div className="input-group">
                <label>Password</label>
                <div className="input-field">
                  <input type="password" placeholder="Enter your password" />
                  <FiEyeOff className="icon" />
                </div>
              </div>
              
              <div className="form-options">
                <div className="checkbox-group">
                  <input type="checkbox" id="remember" />
                  <label htmlFor="remember" style={{ margin: 0 }}>Remember me</label>
                </div>
                <a href="#" className="forgot-link" onClick={(e) => { e.preventDefault(); setMode('forgot'); }}>Forgot Password?</a>
              </div>
              
              <button type="submit" className="submit-btn">Login</button>
            </form>
          </div>

          {/* Sign Up Form */}
          <div className="form-wrapper form-signup">
            <h2>Sign Up</h2>
            <form onSubmit={(e) => { e.preventDefault(); setMode('dashboard'); }}>
              <div className="flex-row">
                <div className="input-group">
                  <label>First Name</label>
                  <div className="input-field">
                    <input type="text" />
                    <FiUser className="icon" />
                  </div>
                </div>
                <div className="input-group">
                  <label>Last Name</label>
                  <div className="input-field">
                    <input type="text" />
                    <FiUser className="icon" />
                  </div>
                </div>
              </div>

              <div className="input-group">
                <label>Contact Number</label>
                <div className="flex-row" style={{ gap: '10px' }}>
                  <div className="input-field" style={{ width: '100px' }}>
                    <select>
                      <option>IN 91</option>
                      <option>US 1</option>
                    </select>
                  </div>
                  <div className="input-field" style={{ flex: 1 }}>
                    <input type="tel" />
                    <FiPhone className="icon" />
                  </div>
                </div>
              </div>

              <div className="input-group">
                <label>Email ID</label>
                <div className="input-field">
                  <input type="email" />
                  <FiMail className="icon" />
                </div>
              </div>

              <div className="input-group">
                <label>User Name</label>
                <div className="input-field">
                  <input type="text" />
                  <FiUser className="icon" />
                </div>
              </div>

              <div className="input-group">
                <label>Password</label>
                <div className="input-field">
                  <input type="password" />
                  <FiEyeOff className="icon" />
                </div>
              </div>

              <button type="submit" className="submit-btn">Sign Up</button>
            </form>
          </div>

          {/* Forgot Password Form */}
          <div className="form-wrapper form-forgot">
            <h2>Forgot password</h2>
            <p className="form-description">Please enter your email address to receive a verification code.</p>
            <form onSubmit={(e) => { e.preventDefault(); setMode('verify'); }}>
              <div className="input-group">
                <label>Email ID</label>
                <div className="input-field">
                  <input type="email" required />
                  <FiMail className="icon" />
                </div>
              </div>
              <button type="submit" className="submit-btn">Send</button>
            </form>
          </div>

          {/* Email Verification Form */}
          <div className="form-wrapper form-verify">
            <h2>Enter your Verification code</h2>
            <p className="form-description">
              Please enter the 6-digit OTP sent to your registered email to verify your account.
            </p>
            <form onSubmit={handleVerify}>
              <div className="otp-container">
                {[0, 1, 2, 3, 4, 5].map(i => (
                  <input 
                    key={i} 
                    ref={el => otpRefs.current[i] = el}
                    type="text" 
                    maxLength={1} 
                    className="otp-input"
                    onChange={(e) => handleOtpChange(i, e)}
                    onKeyDown={(e) => handleOtpKeyDown(i, e)}
                  />
                ))}
              </div>
              
              <div style={{ textAlign: 'center', marginBottom: '20px' }}>
                <a href="#" className="resend-link">Resend Code</a>
              </div>
              <button type="submit" className="submit-btn">Verify</button>
            </form>
          </div>

          {/* Reset Password Form */}
          <div className="form-wrapper form-reset">
            <h2>Reset Password</h2>
            <form onSubmit={(e) => { e.preventDefault(); setMode('dashboard'); }}>
              <div className="input-group">
                <label>Password</label>
                <div className="input-field">
                  <input type="password" placeholder="Enter your password" required />
                  <FiEyeOff className="icon" />
                </div>
              </div>
              <div className="input-group">
                <label>Confirm Password</label>
                <div className="input-field">
                  <input type="password" placeholder="Enter your password" required />
                  <FiEyeOff className="icon" />
                </div>
              </div>
              <button type="submit" className="submit-btn">Continue</button>
            </form>
          </div>

          <div className="footer-text">
            Developed by <strong>YM Automation Private Limited</strong>
          </div>

        </div>
        
      </div>
    </div>
  );
}

export default App;