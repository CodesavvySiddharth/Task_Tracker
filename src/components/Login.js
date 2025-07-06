import React, { useState } from 'react';
import { saveUser } from '../utils/localStorage';

const Login = ({ onLogin }) => {
  const [username, setUsername] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (username.trim()) {
      saveUser(username.trim());
      onLogin(username.trim());
    }
  };

  return (
    <div className="container">
      <div className="app-header">
        <h1 className="app-title">Personal Task Tracker</h1>
        <p className="app-subtitle">Stay organized and boost your productivity</p>
      </div>
      
      <div className="card login-form">
        <h2 style={{ textAlign: 'center', marginBottom: '30px', color: '#333' }}>
          Welcome to Task Tracker
        </h2>
        
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="username" className="form-label">
              Enter your username to get started
            </label>
            <input
              type="text"
              id="username"
              className="form-input"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="Your username"
              required
              autoFocus
            />
          </div>
          
          <button type="submit" className="btn" style={{ width: '100%' }}>
            Start Tracking Tasks
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login; 