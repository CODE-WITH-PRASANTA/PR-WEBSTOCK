import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaUser, FaLock, FaEye, FaEyeSlash, FaArrowRight } from 'react-icons/fa';
import { useAuth } from '../AuthContext'; // Adjust path if AuthContext is located elsewhere
import './Login.css'; // Make sure path matches your CSS location

const LoginPage = () => {
  const [userId, setUserId] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');

  const { login, isLocked, lockTimer } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    setError('');

    // Call the global login logic
    const result = login(userId, password);

    if (result.success) {
      // Navigate directly to protected dashboard upon successful authentication
      navigate('/management/dashboard', { replace: true });
    } else {
      setError(result.message);
    }
  };

  return (
    <div className="Login-wrapper">
      {/* Background Soft Glows */}
      <div className="Login-bg-glow-top" />
      <div className="Login-bg-glow-bottom" />

      {/* Floating 3D Background Decorative Elements */}
      <div className="Login-float-element Login-3d-lock">
        <div className="Login-3d-lock-shackle" />
        <div className="Login-3d-lock-hole" />
      </div>

      <div className="Login-float-element Login-3d-user-badge">
        <FaUser className="Login-3d-user-icon" />
      </div>

      <div className="Login-float-element Login-sphere-top" />
      <div className="Login-float-element Login-sphere-left" />
      <div className="Login-float-element Login-sphere-right" />

      {/* Bottom Podium Platform */}
      <div className="Login-podium" />

      {/* Glassmorphic Login Card */}
      <div className="Login-card">
        <div className="Login-shield-icon">
          <FaUser style={{ fontSize: '1.8rem' }} />
        </div>

        <h1 className="Login-title">Welcome Back</h1>
        <p className="Login-subtitle">Login to continue</p>

        <form className="Login-form" onSubmit={handleSubmit}>
          {/* User ID Field */}
          <div className="Login-input-group">
            <FaUser className="Login-input-icon" />
            <input
              type="text"
              className="Login-input"
              placeholder="User ID"
              value={userId}
              onChange={(e) => setUserId(e.target.value)}
              disabled={isLocked}
              required
              autoComplete="off"
            />
          </div>

          {/* Password Field */}
          <div className="Login-input-group">
            <FaLock className="Login-input-icon" />
            <input
              type={showPassword ? 'text' : 'password'}
              className="Login-input"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              disabled={isLocked}
              required
            />
            <button
              type="button"
              className="Login-eye-btn"
              onClick={() => setShowPassword(!showPassword)}
              disabled={isLocked}
              aria-label="Toggle password visibility"
            >
              {showPassword ? <FaEyeSlash /> : <FaEye />}
            </button>
          </div>

          {/* Error Message Display */}
          {error && (
            <div className="Login-error">
              {error} {isLocked && `(${lockTimer}s)`}
            </div>
          )}

          {/* Login Action Button */}
          <button
            type="submit"
            className="Login-submit-btn"
            disabled={isLocked}
            style={isLocked ? { opacity: 0.6, cursor: 'not-allowed' } : {}}
          >
            <span>{isLocked ? `Locked (${lockTimer}s)` : 'Login'}</span>
            {!isLocked && <FaArrowRight />}
          </button>
        </form>
      </div>
    </div>
  );
};

export default LoginPage;