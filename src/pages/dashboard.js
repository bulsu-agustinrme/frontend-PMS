import React from 'react';
import { useNavigate } from 'react-router-dom';
import {
  FaParking,
  FaUsers,
  FaClock,
  FaEnvelope,
  FaCog,
  FaBell,
} from 'react-icons/fa';
import { getUserName } from 'utils/auth'; //  import helper
import 'assets/Dashboard.css';

const Dashboard = () => {
  const navigate = useNavigate();
  const userName = getUserName() || "User"; // fallback if no name found

  return (
    <div className="dashboard">
      <h2 className="dashboard-title">
        Welcome back, <strong>{userName}!</strong>
      </h2>

      <div className="dashboard-grid">
        <div className="card" onClick={() => navigate('/parking-spaces')}>
          <FaParking className="card-icon" />
          <h3>Parking Spaces</h3>
        </div>

        <div className="card" onClick={() => navigate('/user-list')}>
          <FaUsers className="card-icon" />
          <h3>User List</h3>
        </div>

        <div className="card" onClick={() => navigate('/pending-list')}>
          <FaClock className="card-icon" />
          <h3>Pending List</h3>
        </div>

        <div className="card" onClick={() => navigate('/notifications')}>
          <FaBell className="card-icon" />
          <h3>Notifications</h3>
        </div>

        <div className="card" onClick={() => navigate('/messages')}>
          <FaEnvelope className="card-icon" />
          <h3>Messages</h3>
        </div>

        <div className="card" onClick={() => navigate('/settings')}>
          <FaCog className="card-icon" />
          <h3>Settings</h3>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
