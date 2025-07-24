import React, { useState } from 'react';
import 'assets/settings.css';

const Settings = () => {
  const [darkMode, setDarkMode] = useState(false);
  const [notifications, setNotifications] = useState(true);

  const handleToggleDarkMode = () => setDarkMode(!darkMode);
  const handleToggleNotifications = () => setNotifications(!notifications);

  return (
    <div className="settings-container">
      <h2>Settings</h2>

      <section className="settings-section">
        <h3>Profile Settings</h3>
        <div className="settings-group">
          <label>Full Name</label>
          <input type="text" placeholder="Enter your name" />
        </div>
        <div className="settings-group">
          <label>Email</label>
          <input type="email" placeholder="Enter your email" />
        </div>
        <div className="settings-group">
          <label>Change Password</label>
          <input type="password" placeholder="New password" />
        </div>
      </section>

      <section className="settings-section">
        <h3>Notifications</h3>
        <div className="settings-toggle">
          <label>Enable Notifications</label>
          <input type="checkbox" checked={notifications} onChange={handleToggleNotifications} />
        </div>
      </section>

      <section className="settings-section">
        <h3>System Preferences</h3>
        <div className="settings-toggle">
          <label>Dark Mode</label>
          <input type="checkbox" checked={darkMode} onChange={handleToggleDarkMode} />
        </div>
      </section>

      <section className="settings-section">
        <h3>Account Actions</h3>
        <button className="danger-btn">Deactivate Account</button>
        <button className="reset-btn">Reset Settings</button>
      </section>
    </div>
  );
};

export default Settings;
