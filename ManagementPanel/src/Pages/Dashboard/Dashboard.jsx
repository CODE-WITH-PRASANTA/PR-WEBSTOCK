import React from 'react';
import { useAuth } from '../../Components/AuthContext'; // Adjust path if needed
import DashboardHome from '../../Components/DashboardHome/DashboardHome';
import DashboardSection from '../../Components/DashboardSection/DashboardSection';
import DashboardProject from '../../Components/DashboardProject/DashboardProject';
import Projectlist from '../../Components/Projectlist/Projectlist';
import { FaShieldAlt, FaSignOutAlt, FaUser } from 'react-icons/fa';

const Dashboard = () => {
  const { logout } = useAuth();

  return (
    <div style={{ position: 'relative', width: '100%', minHeight: '100vh', backgroundColor: '#f8fafc' }}>
      
      {/* Top Protected Control Bar */}
      <header
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          padding: '1rem 2rem',
          backgroundColor: '#ffffff',
          borderBottom: '1px solid #e2e8f0',
          boxShadow: '0 4px 12px rgba(0, 0, 0, 0.03)',
          position: 'sticky',
          top: 0,
          zIndex: 100,
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.8rem' }}>
          <div
            style={{
              padding: '0.5rem',
              borderRadius: '12px',
              backgroundColor: '#dbeafe',
              color: '#2563eb',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <FaShieldAlt style={{ fontSize: '1.2rem' }} />
          </div>
          <div>
            <h3 style={{ margin: 0, fontSize: '1.1rem', color: '#0f172a', fontWeight: '800' }}>
              Admin Panel
            </h3>
            <span
              style={{
                fontSize: '0.75rem',
                color: '#16a34a',
                fontWeight: '700',
                letterSpacing: '0.5px',
              }}
            >
              ● PROTECTED SESSION ACTIVE
            </span>
          </div>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: '1.2rem' }}>
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '0.5rem',
              fontSize: '0.9rem',
              fontWeight: '600',
              color: '#334155',
            }}
          >
            <FaUser style={{ color: '#2563eb' }} />
            <span>prwebstock</span>
          </div>

          <button
            onClick={logout}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '0.5rem',
              padding: '0.6rem 1.2rem',
              backgroundColor: '#ef4444',
              color: '#ffffff',
              border: 'none',
              borderRadius: '12px',
              fontWeight: '700',
              cursor: 'pointer',
              fontSize: '0.85rem',
              transition: 'all 0.2s ease',
              boxShadow: '0 4px 12px rgba(239, 68, 68, 0.25)',
            }}
            onMouseOver={(e) => (e.currentTarget.style.backgroundColor = '#dc2626')}
            onMouseOut={(e) => (e.currentTarget.style.backgroundColor = '#ef4444')}
          >
            <FaSignOutAlt />
            <span>Logout</span>
          </button>
        </div>
      </header>

      {/* Main Dashboard Components */}
      <main>
        <DashboardHome />
        <DashboardSection />
        <DashboardProject />
        <Projectlist />
      </main>
    </div>
  );
};

export default Dashboard;