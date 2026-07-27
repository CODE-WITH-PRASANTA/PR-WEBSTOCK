import React from 'react';
import { useAuth } from './AuthContext';
import { FaShieldAlt, FaLock } from 'react-icons/fa';

const ProtectedRoute = ({ children, fallbackComponent }) => {
  const { isAuthenticated } = useAuth();

  if (!isAuthenticated) {
    // If a custom fallback (like Login component) is passed, render it
    if (fallbackComponent) {
      return fallbackComponent;
    }

    // Default Unauthorized View
    return (
      <div
        style={{
          minHeight: '100vh',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          background: '#f8fafc',
          fontFamily: 'sans-serif',
          color: '#1e293b',
          textAlign: 'center',
          padding: '2rem',
        }}
      >
        <div
          style={{
            fontSize: '3rem',
            color: '#ef4444',
            marginBottom: '1rem',
          }}
        >
          <FaLock />
        </div>
        <h1 style={{ margin: '0 0 0.5rem 0', fontSize: '2rem' }}>Access Denied</h1>
        <p style={{ color: '#64748b', maxWidth: '400px' }}>
          You do not have active security credentials to view this panel. Please authenticate to continue.
        </p>
      </div>
    );
  }

  return children;
};

export default ProtectedRoute;