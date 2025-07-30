import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import 'assets/forgotpassword.css';

function ForgotPassword() {
  const [email, setEmail] = useState('');
  const [codeSent, setCodeSent] = useState(false);
  const [code, setCode] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [message, setMessage] = useState('');
  const [messageType, setMessageType] = useState(''); // success or error

  const handleSendCode = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post('http://localhost:8000/api/forgot-password', {
        email,
      });

      setCodeSent(true);
      setMessage('✅ Code sent to your email. Use it to reset your password.');
      setMessageType('success');

      // Log the code for now (until email is implemented)
      console.log('Reset Code:', response.data.code);
    } catch (error) {
      const backendMsg = error.response?.data?.message || 'Failed to send reset code.';
      setMessage(`❌ ${backendMsg}`);
      setMessageType('error');
    }
  };

  const handleResetPassword = async (e) => {
    e.preventDefault();

    if (newPassword !== confirmPassword) {
      setMessage('❌ Passwords do not match.');
      setMessageType('error');
      return;
    }

    try {
      await axios.post('http://localhost:8000/api/reset-password', {
        email,
        token: code,
        password: newPassword,
        password_confirmation: confirmPassword,
      });

      setMessage('✅ Password reset successful! You may now log in.');
      setMessageType('success');
      setTimeout(() => {
        window.location.href = '/admin/sign-in'; // or use navigate if using useNavigate()
      }, 2000);
    } catch (error) {
      const backendMsg = error.response?.data?.message || 'Failed to reset password.';
      setMessage(`❌ ${backendMsg}`);
      setMessageType('error');
    }
  };

  return (
    <div className="forgot-wrapper">
      <div className="forgot-container">
        <div className="forgot-left">
          <div className="forgot-form-container">
            <img
              src={require('assets/logo.png')}
              alt="BulSU Logo"
              className="forgot-logo"
            />
            <h2 className="forgot-title">Forgot Password</h2>
            <p className="forgot-subtitle">
              {codeSent ? 'Enter the code sent to your email and reset your password.' : 'Enter your email to receive a code.'}
            </p>

            <form onSubmit={codeSent ? handleResetPassword : handleSendCode}>
              <input
                type="email"
                placeholder="Email address"
                className="forgot-input"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                disabled={codeSent}
              />

              {codeSent && (
                <>
                  <input
                    type="text"
                    placeholder="Enter code"
                    className="forgot-input"
                    value={code}
                    onChange={(e) => setCode(e.target.value)}
                    required
                  />
                  <input
                    type="password"
                    placeholder="New password"
                    className="forgot-input"
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                    required
                  />
                  <input
                    type="password"
                    placeholder="Confirm new password"
                    className="forgot-input"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    required
                  />
                </>
              )}

              {message && (
                <div className={`forgot-message ${messageType}`}>
                  {message}
                </div>
              )}

              <button
                type="submit"
                className={codeSent ? 'forgot-button' : 'send-code-button'}
              >
                {codeSent ? 'Reset Password' : 'Send Code'}
              </button>

              <div className="back-link">
                <Link to="/admin/sign-in">← Back to Login</Link>
              </div>
            </form>
          </div>
        </div>

        <div className="forgot-right">
          <div className="forgot-overlay">
            <h3 className="forgot-banner-title">BULACAN STATE UNIVERSITY</h3>
            <h4 className="forgot-banner-sub">PARKING MANAGEMENT SYSTEM</h4>
            <p className="forgot-banner-tagline">Drive In. Park Smart. Move On.</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ForgotPassword;
