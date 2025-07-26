import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import {
  FaTachometerAlt,
  FaCar,
  FaUsers,
  FaEnvelope,
  FaCog,
  FaSignOutAlt,
} from 'react-icons/fa';
import 'assets/sidebar.css';

const Sidebar = () => {
  const location = useLocation();

  return (
    <div className="sidebar">
      <div>
        {/* Logo */}
        <Link to="/dashboard" className="sidebar-logo">
          <img
            src={require('assets/logo.png')}
            alt="Logo"
            className="logo-image"
          />
          <div className="logo-title">
            <div className="logo-line1">PARKING MANAGEMENT</div>
            <div className="logo-line2">SYSTEM</div>
          </div>
        </Link>

        {/* Menu */}
        <ul className="sidebar-menu">
          <li className={location.pathname === '/dashboard' ? 'active' : ''}>
            <Link to="/dashboard">
              <FaTachometerAlt className="sidebar-icon" />
              DASHBOARD
            </Link>
          </li>
          <li className={location.pathname === '/parkingspaces' ? 'active' : ''}>
            <Link to="/parkingspaces">
              <FaCar className="sidebar-icon" />
              PARKING SPACES
            </Link>
          </li>
          <li className={location.pathname === '/userlist' ? 'active' : ''}>
            <Link to="/userlist">
              <FaUsers className="sidebar-icon" />
              USER LIST
            </Link>
          </li>
          <li className={location.pathname === '/messages' ? 'active' : ''}>
            <Link to="/messages">
              <FaEnvelope className="sidebar-icon" />
              MESSAGES
            </Link>
          </li>
          <li className={location.pathname === '/settings' ? 'active' : ''}>
            <Link to="/settings">
              <FaCog className="sidebar-icon" />
              SETTINGS
            </Link>
          </li>
        </ul>
      </div>

      {/* Logout Button */}
              <ul className="sidebar-menu">
          {/* Logout item styled like the rest */}
          <li>
              <Link to="/admin/sign-in">
                <FaSignOutAlt className="sidebar-icon" />
                <strong>LOGOUT</strong>
              </Link>
            </li>
        </ul>
    </div>
  );
};

export default Sidebar;