import React, { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext(null);

const AUTH_CREDENTIALS = {
  USER_ID: 'prwebstock',
  PASSWORD: '63725',
};

const MAX_FAILED_ATTEMPTS = 3;

export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(() => {
    return sessionStorage.getItem('prwebstock_auth_token') === 'SECURE_ACTIVE_SESSION';
  });

  const [failedAttempts, setFailedAttempts] = useState(0);
  const [isLocked, setIsLocked] = useState(false);
  const [lockTimer, setLockTimer] = useState(0);

  // Countdown timer for brute-force rate limiting
  useEffect(() => {
    let timer;
    if (isLocked && lockTimer > 0) {
      timer = setInterval(() => {
        setLockTimer((prev) => prev - 1);
      }, 1000);
    } else if (lockTimer === 0 && isLocked) {
      setIsLocked(false);
      setFailedAttempts(0);
    }
    return () => clearInterval(timer);
  }, [isLocked, lockTimer]);

  const login = (userId, password) => {
    if (isLocked) {
      return { success: false, message: `System locked. Wait ${lockTimer}s.` };
    }

    const sanitizedUser = userId.trim();
    const sanitizedPass = password.trim();

    if (
      sanitizedUser === AUTH_CREDENTIALS.USER_ID &&
      sanitizedPass === AUTH_CREDENTIALS.PASSWORD
    ) {
      setIsAuthenticated(true);
      sessionStorage.setItem('prwebstock_auth_token', 'SECURE_ACTIVE_SESSION');
      setFailedAttempts(0);
      return { success: true };
    } else {
      const attempts = failedAttempts + 1;
      setFailedAttempts(attempts);

      if (attempts >= MAX_FAILED_ATTEMPTS) {
        setIsLocked(true);
        setLockTimer(30);
        return {
          success: false,
          message: 'Too many failed attempts! Account temporarily locked for 30s.',
        };
      }

      return {
        success: false,
        message: `Invalid credentials! ${MAX_FAILED_ATTEMPTS - attempts} attempt(s) remaining.`,
      };
    }
  };

  const logout = () => {
    setIsAuthenticated(false);
    sessionStorage.removeItem('prwebstock_auth_token');
  };

  return (
    <AuthContext.Provider
      value={{
        isAuthenticated,
        login,
        logout,
        isLocked,
        lockTimer,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};