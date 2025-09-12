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
  const [newProfilePic, setNewProfilePic] = useState(null);
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [currentPassword, setCurrentPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [messageType, setMessageType] = useState("");

  // Modals
  const [isNameModalOpen, setIsNameModalOpen] = useState(false);
  const [isEmailModalOpen, setIsEmailModalOpen] = useState(false);
  const [isPicModalOpen, setIsPicModalOpen] = useState(false);
  const [newName, setNewName] = useState("");
  const [newEmail, setNewEmail] = useState("");

  // Fetch account data
  useEffect(() => {
    api
      .get("/account")
      .then((res) => {
        if (res.data) {
          setName(res.data.name || "User");
          setEmail(res.data.email || "");
          setProfilePic(res.data.profile_pic || "");
        }
      })
      .catch((err) => {
        console.error("Failed to load account:", err);
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

  // Password
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
      setMessage(errors[0]);
      setMessageType("error");
      return;
    }

    setLoading(true);
    setMessage("");
    try {
      const res = await api.post("/account/password", {
        current_password: currentPassword,
        new_password: newPassword,
        new_password_confirmation: confirmPassword,
      });
      setMessage(res.data.message || "Password updated successfully!");
      setMessageType("success");
      setNewPassword("");
      setConfirmPassword("");
      setCurrentPassword("");
    } catch (err) {
      console.error("Password update failed:", err);
      setMessage(err.response?.data?.message || "Failed to update password");
      setMessageType("error");
    } finally {
      setLoading(false);
    }
  };

  // Name
  const handleSaveName = async () => {
    if (!newName.trim()) {
      setMessage("Name cannot be empty");
      setMessageType("error");
      return;
    }
    if (newName.trim() === name) {
      setMessage("You must change your name before saving");
      setMessageType("error");
      return;
    }

    setLoading(true);
    try {
      const res = await api.post("/account/update-name", { name: newName });
      setName(newName);
      setMessage(res.data.message || "Name updated successfully!");
      setMessageType("success");
      setIsNameModalOpen(false);
    } catch (err) {
      setMessage(err.response?.data?.message || "Failed to update name");
      setMessageType("error");
    } finally {
      setLoading(false);
    }
  };

  // Email
  const handleSaveEmail = async () => {
    if (!newEmail.trim()) {
      setMessage("Email cannot be empty");
      setMessageType("error");
      return;
    }
    if (newEmail.trim() === email) {
      setMessage("You must change your email before saving");
      setMessageType("error");
      return;
    }

    setLoading(true);
    try {
      const res = await api.post("/account/update-email", { email: newEmail });
      setEmail(newEmail);
      setMessage(res.data.message || "Email updated successfully!");
      setMessageType("success");
      setIsEmailModalOpen(false);
    } catch (err) {
      setMessage(err.response?.data?.message || "Failed to update email");
      setMessageType("error");
    } finally {
      setLoading(false);
    }
  };

  // Profile Pic
  const handleUploadProfilePic = async () => {
    if (!newProfilePic) {
      setMessage("Please select an image first");
      setMessageType("error");
      return;
    }

    const formData = new FormData();
    formData.append("profile_pic", newProfilePic);

    setLoading(true);
    try {
      const res = await api.post("/account/update-profile-pic", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      setProfilePic(res.data.profile_pic);
      setMessage(res.data.message || "Profile picture updated!");
      setMessageType("success");
      setIsPicModalOpen(false);
      setNewProfilePic(null);
    } catch (err) {
      console.error("Profile pic update failed:", err);
      setMessage(
        err.response?.data?.message || "Failed to update profile picture"
      );
      setMessageType("error");
    } finally {
      setLoading(false);
    }
  };

  // Delete account
  const handleDeleteAccount = async () => {
    if (
      !window.confirm(
        "Are you sure you want to delete your account? This action cannot be undone."
      )
    )
      return;

    setLoading(true);
    try {
      await deleteAccount();
    } catch (err) {
      setMessage(err.response?.data?.message || "Failed to delete account");
      setMessageType("error");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="settings-container">
      <h2>Account Settings</h2>

      <MessageAlert message={message} type={messageType} />

      {/* Profile Picture Section */}
      <section className="settings-section">
        <h3>Profile Picture</h3>
        <div className="profile-pic-container">
          {profilePic ? (
            <img src={profilePic} alt="Profile" className="profile-pic" />
          ) : (
            <div className="profile-pic-placeholder">No Image</div>
          )}
          <button
            className="link-btn"
            onClick={() => setIsPicModalOpen(true)}
          >
            Change
          </button>
        </div>
      </section>

      {/* Name Section */}
      <section className="settings-section">
        <h3>Name</h3>
        <p>
          Your name is <span className="highlight">{name}</span>.
          <button
            className="link-btn"
            onClick={() => {
              setNewName(name);
              setIsNameModalOpen(true);
            }}
          >
            Change
          </button>
        </p>
      </section>

      {/* Email Section */}
      <section className="settings-section">
        <h3>Email address</h3>
        <p>
          Your email address is <span className="highlight">{email}</span>.
          <button
            className="link-btn"
            onClick={() => {
              setNewEmail(email);
              setIsEmailModalOpen(true);
            }}
          >
            Change
          </button>
        </p>
      </section>

      {/* Password Section */}
      <section className="settings-section">
        <h3>Password</h3>
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
          <a href="/settings-reset-password">Reset your password</a>
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
          to the system.
        </p>
        <button
          className="danger-link"
          onClick={handleDeleteAccount}
          disabled={loading}
        >
          I want to delete my account
        </button>
      </section>

      {/* Profile Picture Modal */}
      <Modal
        isOpen={isPicModalOpen}
        onClose={() => setIsPicModalOpen(false)}
        title="Update Profile Picture"
      >
        <input
          type="file"
          accept="image/*"
          onChange={(e) => setNewProfilePic(e.target.files[0])}
          className="modal-input"
        />
        <div className="modal-actions">
          <button
            className="primary-btn"
            onClick={handleUploadProfilePic}
            disabled={loading || !newProfilePic}
          >
            Upload
          </button>
        </div>
      </Modal>

      {/* Name Modal */}
      <Modal
        isOpen={isNameModalOpen}
        onClose={() => setIsNameModalOpen(false)}
        title="Edit Name"
      >
        <input
          type="text"
          value={newName}
          onChange={(e) => setNewName(e.target.value)}
          className="modal-input"
        />
        <div className="modal-actions">
          <button
            className="primary-btn"
            onClick={handleSaveName}
            disabled={
              loading || newName.trim() === "" || newName.trim() === name
            }
          >
            Save
          </button>
        </div>
      </Modal>

      {/* Email Modal */}
      <Modal
        isOpen={isEmailModalOpen}
        onClose={() => setIsEmailModalOpen(false)}
        title="Edit Email"
      >
        <input
          type="email"
          value={newEmail}
          onChange={(e) => setNewEmail(e.target.value)}
          className="modal-input"
        />
        <div className="modal-actions">
          <button
            className="primary-btn"
            onClick={handleSaveEmail}
            disabled={
              loading || newEmail.trim() === "" || newEmail.trim() === email
            }
          >
            Save
          </button>
        </div>
      </Modal>
    </div>
  );
};

export default Settings;
