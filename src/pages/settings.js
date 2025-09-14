import React, { useState, useEffect } from "react";
import "assets/Settings.css";
import api from "utils/api";
import { deleteAccount } from "utils/auth";
import MessageAlert from "components/MessageAlert";
import Modal from "components/Modal";
import { FaEye, FaEyeSlash } from "react-icons/fa";

const PasswordInput = ({ value, onChange, placeholder, name }) => {
  const [show, setShow] = useState(false);

  return (
    <div className="password-input-wrapper">
      <input
        type={show ? "text" : "password"}
        value={value}
        onChange={onChange}
        name={name}
        required
        className={value ? "filled" : ""}
      />
      <label>{placeholder}</label>
      <button
        type="button"
        className="password-toggle-btn"
        aria-label={show ? "Hide password" : "Show password"}
        onClick={() => setShow(!show)}
      >
        {show ? <FaEyeSlash /> : <FaEye />}
      </button>
    </div>
  );
};

const Settings = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [profilePic, setProfilePic] = useState("");
  const [preview, setPreview] = useState(null);
  const [newProfilePic, setNewProfilePic] = useState(null);
  const [newName, setNewName] = useState("");
  const [newEmail, setNewEmail] = useState("");
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  // Loading states
  const [profileLoading, setProfileLoading] = useState(false);
  const [passwordLoading, setPasswordLoading] = useState(false);
  const [resetLoading, setResetLoading] = useState(false);
  const [deleteLoading, setDeleteLoading] = useState(false);

  // Alerts
  const [message, setMessage] = useState("");
  const [messageType, setMessageType] = useState("");

  // Modals
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isResetModalOpen, setIsResetModalOpen] = useState(false);
  const [isVerifyModalOpen, setIsVerifyModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);

  // Reset
  const [resetEmail, setResetEmail] = useState("");
  const [resetCode, setResetCode] = useState("");
  const [resetNewPassword, setResetNewPassword] = useState("");
  const [resetConfirmPassword, setResetConfirmPassword] = useState("");

  // Fetch account
  useEffect(() => {
    api
      .get("/account")
      .then((res) => {
        if (res.data) {
          setName(res.data.name || "User");
          setEmail(res.data.email || "");
          setProfilePic(res.data.profile_pic || "");
          setResetEmail(res.data.email || "");
        }
      })
      .catch(() => {
        setMessage("Failed to load account data");
        setMessageType("error");
      });
  }, []);

  // Auto-hide message
  useEffect(() => {
    if (!message) return;
    const timer = setTimeout(() => {
      setMessage("");
      setMessageType("");
    }, 4000);
    return () => clearTimeout(timer);
  }, [message]);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setNewProfilePic(file);
      setPreview(URL.createObjectURL(file));
    }
  };

  // Profile update
  const handleSaveProfile = async () => {
    if (!newName.trim() || !newEmail.trim()) {
      setMessage("Name and email cannot be empty");
      setMessageType("error");
      return;
    }

    const formData = new FormData();
    formData.append("name", newName);
    formData.append("email", newEmail);
    if (newProfilePic) formData.append("profile_pic", newProfilePic);

    setProfileLoading(true);
    try {
      const res = await api.post("/account/update-profile", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      const updatedUser = res.data.user;
      setName(updatedUser.name || newName);
      setEmail(updatedUser.email || newEmail);
      setProfilePic(updatedUser.profile_pic || profilePic);
      setMessage(res.data.message || "Profile updated successfully!");
      setMessageType("success");
      setIsEditModalOpen(false);
      setPreview(null);
      setNewProfilePic(null);
    } catch (err) {
      setMessage(err.response?.data?.message || "Failed to update profile");
      setMessageType("error");
    } finally {
      setProfileLoading(false);
    }
  };

  // Password update
  const handleSavePassword = async () => {
    const errors = [];
    if (!currentPassword) errors.push("Current password is required.");
    if (!newPassword) errors.push("New password is required.");
    if (!confirmPassword) errors.push("Please confirm your new password.");
    if (newPassword && confirmPassword && newPassword !== confirmPassword)
      errors.push("New password and confirmation do not match.");
    if (currentPassword && newPassword && currentPassword === newPassword)
      errors.push("New password cannot be the same as the current password.");

    if (errors.length > 0) {
      setMessage(errors.join("\n"));
      setMessageType("error");
      return;
    }

    setPasswordLoading(true);
    try {
      const res = await api.post("/account/password", {
        current_password: currentPassword,
        new_password: newPassword,
        new_password_confirmation: confirmPassword,
      });
      setMessage(res.data.message || "Password updated successfully!");
      setMessageType("success");
      setCurrentPassword("");
      setNewPassword("");
      setConfirmPassword("");
    } catch (err) {
      setMessage(err.response?.data?.message || "Failed to update password");
      setMessageType("error");
    } finally {
      setPasswordLoading(false);
    }
  };

  // Reset password
  const handleResetPassword = async () => {
    if (!resetEmail.trim()) {
      setMessage("Please enter your email");
      setMessageType("error");
      return;
    }
    setResetLoading(true);
    try {
      const res = await api.post("/forgot-password", { email: resetEmail });
      setMessage(res.data.message || "Password reset code sent!");
      setMessageType("success");
      setIsResetModalOpen(false);
      setIsVerifyModalOpen(true);
    } catch (err) {
      setMessage(err.response?.data?.message || "Failed to send reset code");
      setMessageType("error");
    } finally {
      setResetLoading(false);
    }
  };

  const handleVerifyResetCode = async () => {
    if (!resetCode || !resetNewPassword || !resetConfirmPassword) {
      setMessage("All fields are required");
      setMessageType("error");
      return;
    }
    if (resetNewPassword !== resetConfirmPassword) {
      setMessage("Passwords do not match");
      setMessageType("error");
      return;
    }

    setResetLoading(true);
    try {
      const res = await api.post("/reset-password", {
        email: resetEmail,
        token: resetCode,
        password: resetNewPassword,
        password_confirmation: resetConfirmPassword,
      });
      setMessage(res.data.message || "Password reset successfully!");
      setMessageType("success");
      localStorage.removeItem("token");
      sessionStorage.clear();
      setTimeout(() => (window.location.href = "/sign-in"), 2000);
    } catch (err) {
      setMessage(err.response?.data?.message || "Failed to reset password");
      setMessageType("error");
    } finally {
      setResetLoading(false);
    }
  };

  // Delete
  const handleDeleteAccount = async () => {
    setDeleteLoading(true);
    try {
      await deleteAccount();
    } catch (err) {
      setMessage(err.response?.data?.message || "Failed to delete account");
      setMessageType("error");
    } finally {
      setDeleteLoading(false);
    }
  };

  return (
    <div className="settings-container">
      <h2>Account Settings</h2>
      <MessageAlert
        message={message}
        type={messageType}
        renderMessage={(msg) =>
          msg.split("\n").map((line, i) => (
            <span key={i}>
              {line}
              <br />
            </span>
          ))
        }
      />
      <div className="settings-main">
    {/* Profile Card */}
    <section className="profile-card">
      <h3 className="profile-title">Account Information</h3>
      <div className="profile-pic-container">
        <label htmlFor="profilePicInput" className="profile-pic-label">
          <div className="profile-pic-wrapper">
            {profileLoading && (
              <div className="profile-pic-loading">
                <div className="spinner"></div>
              </div>
            )}

            {preview || profilePic ? (
              <img
                src={preview || `${profilePic}?t=${Date.now()}`}
                alt="Profile"
                className="profile-pic"
              />
            ) : (
              <div className="profile-fallback">
                {name
                  ?.split(" ")
                  .map((n) => n[0])
                  .join("")
                  .substring(0, 2)
                  .toUpperCase()}
              </div>
            )}
          </div>
        </label>

        <input
          id="profilePicInput"
          type="file"
          accept="image/*"
          onChange={handleImageChange}
          style={{ display: "none" }}
        />
      </div>

      <div className="profile-info">
        <h3>{name}</h3>
        <p>{email}</p>
        <button
          className="link-btn"
          onClick={() => {
            setNewName(name);
            setNewEmail(email);
            setIsEditModalOpen(true);
          }}
        >
          Edit Profile
        </button>
      </div>
    </section>

        {/* Password Section */}
        <section className="settings-section password-section">
          <h3>Change Password</h3>
          <div className="password-group">
            <PasswordInput
              name="currentPassword"
              placeholder="Current password"
              value={currentPassword}
              onChange={(e) => setCurrentPassword(e.target.value)}
            />
            <PasswordInput
              name="newPassword"
              placeholder="New password"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
            />
            <PasswordInput
              name="confirmPassword"
              placeholder="Confirm new password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
            />
          </div>
          <p className="small-text">
            Can't remember your current password?{" "}
            <button
              type="button"
              className="link-btn"
              onClick={() => setIsResetModalOpen(true)}
            >
              Reset your password
            </button>
          </p>
          <button
            className="primary-btn"
            onClick={handleSavePassword}
            disabled={passwordLoading}
          >
            {passwordLoading ? "Saving..." : "Save password"}
          </button>
        </section>
      </div>

      {/* Delete account */}
      <section className="settings-section">
        <h3>Delete Account</h3>
        <p>
          Deleting your account will permanently remove your profile and access to the system.
        </p>
        <button
          className="danger-link"
          onClick={() => setIsDeleteModalOpen(true)}
          disabled={deleteLoading}
        >
          I want to delete my account
        </button>
      </section>

      {/* Edit Profile Modal */}
      <Modal
        isOpen={isEditModalOpen}
        onClose={() => {
          setIsEditModalOpen(false);
          setPreview(null);
        }}
        title="Edit Profile"
      >
        <label htmlFor="editProfilePicInput" className="profile-pic-label">
          <img
            src={preview || profilePic || "/default-avatar.png"}
            alt="Profile Preview"
            className="profile-pic"
          />
        </label>
        <input
          id="editProfilePicInput"
          type="file"
          accept="image/*"
          onChange={handleImageChange}
          style={{ display: "none" }}
        />
        <input
          type="text"
          value={newName}
          onChange={(e) => setNewName(e.target.value)}
          className="modal-input"
          placeholder="Enter new name"
        />
        <input
          type="email"
          value={newEmail}
          onChange={(e) => setNewEmail(e.target.value)}
          className="modal-input"
          placeholder="Enter new email"
        />
        <div className="modal-actions">
          <button className="secondary-btn" onClick={() => setIsEditModalOpen(false)}>
            Cancel
          </button>
          <button
            className="primary-btn"
            onClick={handleSaveProfile}
            disabled={profileLoading || !newName.trim() || !newEmail.trim()}
          >
            {profileLoading ? "Saving..." : "Save"}
          </button>
        </div>
      </Modal>

      {/* Reset Modal */}
      <Modal
        isOpen={isResetModalOpen}
        onClose={() => setIsResetModalOpen(false)}
        title="Reset Password"
      >
        <p className="small-text">Enter your email to receive a password reset code.</p>
        <input
          type="email"
          value={resetEmail}
          onChange={(e) => setResetEmail(e.target.value)}
          className="modal-input"
          placeholder="Enter your email"
        />
        <div className="modal-actions">
          <button className="secondary-btn" onClick={() => setIsResetModalOpen(false)}>
            Cancel
          </button>
          <button
            className="primary-btn"
            onClick={handleResetPassword}
            disabled={resetLoading || !resetEmail.trim()}
          >
            {resetLoading ? "Sending..." : "Send Reset Code"}
          </button>
        </div>
      </Modal>

      {/* Verify Reset Code */}
      <Modal
        isOpen={isVerifyModalOpen}
        onClose={() => setIsVerifyModalOpen(false)}
        title="Enter Reset Code"
      >
        <p className="small-text">Check your email for the reset code.</p>
        <input
          type="text"
          value={resetCode}
          onChange={(e) => setResetCode(e.target.value)}
          className="modal-input"
          placeholder="Enter reset code"
        />
        <PasswordInput
          name="resetNewPassword"
          placeholder="New password"
          value={resetNewPassword}
          onChange={(e) => setResetNewPassword(e.target.value)}
        />
        <PasswordInput
          name="resetConfirmPassword"
          placeholder="Confirm new password"
          value={resetConfirmPassword}
          onChange={(e) => setResetConfirmPassword(e.target.value)}
        />
        <div className="modal-actions">
          <button className="secondary-btn" onClick={() => setIsVerifyModalOpen(false)}>
            Cancel
          </button>
          <button
            className="primary-btn"
            onClick={handleVerifyResetCode}
            disabled={resetLoading}
          >
            {resetLoading ? "Saving..." : "Reset Password"}
          </button>
        </div>
      </Modal>

      {/* Delete Confirmation Modal */} 
      <Modal
        isOpen={isDeleteModalOpen}
        onClose={() => setIsDeleteModalOpen(false)}
        title="Confirm Account Deletion"
      >
        <p>
          Are you sure you want to <strong>delete your account</strong>? This action
          cannot be undone.
        </p>
        <div className="modal-actions">
          <button
            className="secondary-btn"
            onClick={() => setIsDeleteModalOpen(false)}
            disabled={deleteLoading}
          >
            Cancel
          </button>
          <button
            className="danger-btn"
            onClick={handleDeleteAccount}
            disabled={deleteLoading}
          >
            {deleteLoading ? "Deleting..." : "Delete Account"}
          </button>
        </div>
      </Modal>
    </div>
  );
};

export default Settings;
