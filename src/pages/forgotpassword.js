import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import 'assets/forgotpassword.css';

function ForgotPassword() {
  const [email, setEmail] = useState('');
  const [codeSent, setCodeSent] = useState(false);
  const [code, setCode] = useState('');
  const [newPassword, setNewPassword] = useState('');

  const handleSendCode = (e) => {
    e.preventDefault();
    // Normally, you'd call backend API here
    setCodeSent(true);
  };

  const handleResetPassword = (e) => {
    e.preventDefault();
    console.log('Resetting password for:', email, 'with code:', code, 'and new password:', newPassword);
    // Backend reset logic here
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
            <p className="forgot-subtitle">Enter your email to receive a code</p>

            <form onSubmit={codeSent ? handleResetPassword : handleSendCode}>
              <input
                type="email"
                placeholder="Email address"
                className="forgot-input"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
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
                </>
              )}

              <button type="submit" className={codeSent ? 'forgot-button' : 'send-code-button'}>
                {codeSent ? 'Reset Password' : 'Send Code'}
              </button>

              <div className="back-link">
                <Link to="/admin/sign-in">Back to Login</Link>
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
