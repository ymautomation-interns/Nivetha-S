import { useState } from 'react';
import Login from './components/Login';
import Dashboard from './components/Dashboard';

function App() {
  const [currentUser, setCurrentUser] = useState(null);

  const handleLogin = (username) => {
    // Determine role based on username. 
    // If username includes 'admin', make them admin. Otherwise they are a user.
    const role = username.toLowerCase() === 'admin' ? 'admin' : username;
    setCurrentUser(role);
  };

  const handleLogout = () => {
    setCurrentUser(null);
  };

  return (
    <div className="app-container">
      {!currentUser ? (
        <Login onLogin={handleLogin} />
      ) : (
        <Dashboard currentUser={currentUser} onLogout={handleLogout} />
      )}
    </div>
  );
}

export default App;
