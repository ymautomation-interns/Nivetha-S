import { useState } from 'react';
import { getUsers } from '../utils/store';

function Login({ onLogin }) {
  const [activeTab, setActiveTab] = useState('user'); // 'admin' or 'user'
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const [error, setError] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    setError(''); // clear previous errors

    const users = getUsers();
    const foundUser = users.find(u => u.username.toLowerCase() === username.toLowerCase() && u.password === password);

    if (activeTab === 'admin') {
      if (foundUser && foundUser.role === 'admin') {
        onLogin(foundUser.username);
      } else {
        setError('Invalid Admin credentials. (Hint: admin / admin123)');
      }
    } else {
      if (foundUser && foundUser.role === 'user') {
        onLogin(foundUser.username);
      } else {
        setError('Invalid User credentials. Try user1 or user2 / password123');
      }
    }
  };

  return (
    <div className="login-page">
      <div className="login-card-container">
        
        {/* Leftmost Navigation Sidebar (The Tabs) */}
        <div className="login-nav-sidebar">
          <div className="nav-logo">
            <svg viewBox="0 0 24 24" width="40" height="40" stroke="var(--primary)" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round"><path d="M22 12h-4l-3 9L9 3l-3 9H2"></path></svg>
            <span>MediCare</span>
          </div>

          <div className="nav-tabs">
            <button 
              type="button"
              className={`nav-tab ${activeTab === 'admin' ? 'active' : ''}`}
              onClick={() => setActiveTab('admin')}
            >
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="11" width="18" height="11" rx="2" ry="2"></rect><path d="M7 11V7a5 5 0 0 1 10 0v4"></path></svg>
              <span>Admin</span>
            </button>
            <button 
              type="button"
              className={`nav-tab ${activeTab === 'user' ? 'active' : ''}`}
              onClick={() => setActiveTab('user')}
            >
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path><circle cx="12" cy="7" r="4"></circle></svg>
              <span>User</span>
            </button>
          </div>
        </div>

        {/* The main login card with split blue/white */}
        <div className="login-card">
          
          {/* Blue Side with Image */}
          <div className="login-left">
            <h1>Welcome Back</h1>
            <p>Please Enter Your Credentials.</p>
            <div className="login-left-illustration">
              <img src="/login_illustration.jpg" alt="Login Illustration" />
            </div>
          </div>

          {/* White Side Form */}
          <div className="login-right">
            <h2>{activeTab === 'admin' ? 'Admin Login' : 'User Login'}</h2>
            
            {error && (
              <div style={{ color: '#ef4444', backgroundColor: '#fef2f2', padding: '10px', borderRadius: '6px', marginBottom: '1.5rem', fontSize: '14px', border: '1px solid #f87171' }}>
                {error}
              </div>
            )}

            <form onSubmit={handleSubmit}>
              <div className="form-group">
                <label>User Name</label>
                <div style={{ position: 'relative' }}>
                  <input 
                    type="text" 
                    className="form-control" 
                    placeholder="Enter User Name" 
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    required
                    style={{ paddingRight: '40px' }}
                  />
                  <svg style={{ position: 'absolute', right: '12px', top: '50%', transform: 'translateY(-50%)', color: '#9ca3af' }} width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path><circle cx="12" cy="7" r="4"></circle></svg>
                </div>
              </div>
              
              <div className="form-group">
                <label>Password</label>
                <div style={{ position: 'relative' }}>
                  <input 
                    type="password" 
                    className="form-control" 
                    placeholder="Enter your password" 
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    style={{ paddingRight: '40px' }}
                  />
                  <svg style={{ position: 'absolute', right: '12px', top: '50%', transform: 'translateY(-50%)', color: '#9ca3af' }} width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path><circle cx="12" cy="12" r="3"></circle></svg>
                </div>
              </div>

              <div className="login-options">
                <label style={{ display: 'flex', alignItems: 'center', gap: '5px' }}>
                  <input type="checkbox" /> Remember me
                </label>
                <a href="#" className="forgot-password">Forgot Password?</a>
              </div>

              <button type="submit" className="btn primary">Login</button>
            </form>

            <div className="footer-text">
              Developed by <strong>YM Automation Private Limited</strong>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}

export default Login;
