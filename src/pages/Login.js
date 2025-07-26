import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { FaEye, FaEyeSlash, FaCheckCircle, FaTimesCircle } from 'react-icons/fa';
import 'assets/Login.css';

function Login() {
  const [values, setValues] = useState({ email: '', password: '' });
  const [showPassword, setShowPassword] = useState(false);
  const [message, setMessage] = useState('');
  const [messageType, setMessageType] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    if (message) {
      const timer = setTimeout(() => setMessage(''), 4000);
      return () => clearTimeout(timer);
    }
  }, [message]);

  const handleInput = (e) => {
    setValues((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const { email, password } = values;

    if (!email && !password) {
      setMessage('Please enter your email address and password');
      setMessageType('error');
      return;
    }
    if (!email) {
      setMessage('Please enter your email address');
      setMessageType('error');
      return;
    }
    if (!password) {
      setMessage('Please enter your password');
      setMessageType('error');
      return;
    }

    try {
      const response = await axios.post('http://localhost:8000/api/login', {
        email,
        password,
      });

      const backendMessage = response.data?.message;

      if (backendMessage === 'Login Successfully') {
        setMessage('Login Successfully! Redirecting...');
        setMessageType('success');
        setTimeout(() => navigate('/dashboard'), 1500);
      } else {
        setMessage('Unexpected response. Please try again.');
        setMessageType('error');
      }
    } catch (error) {
      const backendMessage = error.response?.data?.message;

      if (backendMessage === 'No records found') {
        setMessage('No records found.');
      } else if (backendMessage === 'Email or Password is incorrect.') {
        setMessage('Email or Password is incorrect.');
      } else {
        setMessage('Something went wrong. Please try again.');
      }

      setMessageType('error');
    }
  };

  return (
    <div className="login-wrapper">
      <div className="login-container">
        <div className="login-left">
          <div className="login-form-container">
            <img src={require('assets/logo.png')} alt="Logo" className="login-logo" />
            <h2 className="login-title">Welcome back!</h2>
            <p className="login-subtitle">Enter your credentials to access your account</p>

            <form onSubmit={handleSubmit}>
              <input
                type="email"
                name="email"
                placeholder="Email address"
                value={values.email}
                onChange={handleInput}
                className="login-input"
              />

              <div className="password-container">
                <input
                  type={showPassword ? 'text' : 'password'}
                  name="password"
                  placeholder="Password"
                  value={values.password}
                  onChange={handleInput}
                  className="login-input password-input"
                />
                <span
                  className="toggle-password-icon"
                  onClick={() => setShowPassword(!showPassword)}
                  title={showPassword ? 'Hide password' : 'Show password'}
                >
                  {showPassword ? <FaEyeSlash /> : <FaEye />}
                </span>
              </div>

              {message && (
                <div className={`login-message ${messageType}`}>
                  {messageType === 'success' && <FaCheckCircle className="message-icon success-icon" />}
                  {messageType === 'error' && <FaTimesCircle className="message-icon error-icon" />}
                  <span>{message}</span>
                </div>
              )}

              <div className="login-options">
                <label>
                  <input type="checkbox" /> Remember me
                </label>
              </div>

              <button type="submit" className="login-button">➔ Sign In</button>
              <p className="forgot-link">
                <Link to="/forgotpassword">Forgot Password?</Link>
              </p>
            </form>
          </div>
        </div>

        <div className="login-right">
          <div className="login-overlay">
            <h3 className="login-banner-title">BULACAN STATE UNIVERSITY</h3>
            <h4 className="login-banner-sub">PARKING MANAGEMENT SYSTEM</h4>
            <p className="login-banner-tagline">Drive In. Park Smart. Move On.</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;
