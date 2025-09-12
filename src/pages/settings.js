import React, { useState, useEffect } from "react";
import "assets/Settings.css";
import api from "utils/api";
import { deleteAccount } from "utils/auth";

const Settings = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [currentPassword, setCurrentPassword] = useState("");
  const [loading, setLoading] = useState(false);

  // Fetch account data
  useEffect(() => {
    api
      .get("/account")
      .then((res) => {
        if (res.data) {
          setName(res.data.name || "User");
          setEmail(res.data.email || "");
        }
      })
      .catch((err) => {
        console.error("Failed to load account:", err);
      });
  }, []);

  // Update password
  const handleSavePassword = async () => {
    if (!currentPassword || !newPassword || !confirmPassword) {
      alert("Please fill out all password fields.");
      return;
    }

    if (newPassword !== confirmPassword) {
      alert("New password and confirmation do not match.");
      return;
    }

    setLoading(true);
    try {
      const res = await api.post("/account/password", {
        current_password: currentPassword,
        new_password: newPassword,
        new_password_confirmation: confirmPassword,
      });

      alert(res.data.message || "Password updated successfully!");
      setNewPassword("");
      setConfirmPassword("");
      setCurrentPassword("");
    } catch (err) {
      console.error("Password update failed:", err);
      alert(err.response?.data?.message || "Failed to update password");
    } finally {
      setLoading(false);
    }
  };

  // Delete account
  const handleDeleteAccount = async () => {
    if (
      !window.confirm(
        "Are you sure you want to delete your account? This will remove your profile and access, but certain records may remain for audit purposes."
      )
    )
      return;

    setLoading(true);
    try {
      await deleteAccount(); // ✅ uses auth.js
    } catch (err) {
      alert(err.response?.data?.message || "Failed to delete account");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="settings-container">
      <h2>Account settings</h2>

      {/* Name Section */}
      <section className="settings-section">
        <h3>Name</h3>
        <p>
          Your name is <span className="highlight">{name}</span>.
          <button className="link-btn">Change</button>
        </p>
      </section>

      {/* Email Section */}
      <section className="settings-section">
        <h3>Email address</h3>
        <p>
          Your email address is <span className="highlight">{email}</span>.
          <button className="link-btn">Change</button>
        </p>
      </section>

      {/* Password Section */}
      <section className="settings-section">
        <h3>Password</h3>
        <div className="password-group">
          <input
            type="password"
            placeholder="Current password"
            value={currentPassword}
            onChange={(e) => setCurrentPassword(e.target.value)}
          />
          <input
            type="password"
            placeholder="New password"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
          />
          <input
            type="password"
            placeholder="Confirm new password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
          />
        </div>
        <p className="small-text">
          Can't remember your current password?{" "}
          <a href="/forgot-password">Reset your password</a>
        </p>
        <button
          className="primary-btn"
          onClick={handleSavePassword}
          disabled={loading}
        >
          {loading ? "Saving..." : "Save password"}
        </button>
      </section>

      {/* Delete Account Section */}
      <section className="settings-section">
        <h3>Delete account</h3>
        <p>
          Would you like to delete your account? <br />
          Deleting your account will permanently remove your profile and access
          to the system. Some records may still be kept for audit and security.
        </p>
        <button
          className="danger-link"
          onClick={handleDeleteAccount}
          disabled={loading}
        >
          I want to delete my account
        </button>
      </section>
    </div>
  );
};

export default Settings;
