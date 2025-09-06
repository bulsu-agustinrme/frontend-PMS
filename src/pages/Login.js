import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import axios from 'axios';
import FormInput from 'components/FormInput';
import PasswordInput from 'components/PasswordInput';
import MessageAlert from 'components/MessageAlert';
import 'assets/Login.css';

function Login() {
  const [values, setValues] = useState({ email: '', password: '' });
  const [rememberMe, setRememberMe] = useState(false);
  const [message, setMessage] = useState('');
  const [messageType, setMessageType] = useState('');
  const navigate = useNavigate();

  // ✅ Auto-redirect if already logged in
  useEffect(() => {
    const token = localStorage.getItem("authToken") || sessionStorage.getItem("authToken");
    if (token) {
      navigate("/dashboard");
    }
  }, [navigate]);

  // ✅ Clear alerts after 4s
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
        remember: rememberMe 
      });

      const backendMessage = response.data?.message;
      const token = response.data?.data?.token; // ✅ fixed: nested in "data"
      const userName = response.data?.data?.name;

      if (backendMessage === 'Login Successfully' && token) {
        // ✅ Save token depending on Remember Me
        if (rememberMe) {
          localStorage.setItem("authToken", token);
          localStorage.setItem("userName", userName);
        } else {
          sessionStorage.setItem("authToken", token);
          sessionStorage.setItem("userName", userName);
        }

        setMessage('Login Successfully!');
        setMessageType('success');
        setTimeout(() => navigate('/dashboard'), 1500);
      } else {
        setMessage('Unexpected response. Please try again.');
        setMessageType('error');
      }
    } catch (error) {
      const backendMessage = error.response?.data?.message;
      setMessage(
        backendMessage === 'No records found'
          ? 'No records found.'
          : backendMessage === 'Email or Password is incorrect.'
          ? 'Email or Password is incorrect.'
          : 'Something went wrong. Please try again.'
      );
      setMessageType('error');
    }
  };

  return (
    <div className="login-wrapper">
      <div className="login-container">
        <div className="login-left">
          <div className="login-form-container">
            <img src={require('assets/images/logo.png')} alt="Logo" className="login-logo" />
            <h2 className="login-title">Welcome back!</h2>
            <p className="login-subtitle">Enter your credentials to access your account</p>

            <form onSubmit={handleSubmit}>
              <FormInput
                type="email"
                name="email"
                placeholder="Email address"
                value={values.email}
                onChange={handleInput}
                className="login-input"
              />

              <PasswordInput
                name="password"
                value={values.password}
                onChange={handleInput}
                className="login-input"
              />

              <MessageAlert message={message} type={messageType} />

              <div className="login-options">
                <label>
                  <input 
                    type="checkbox" 
                    checked={rememberMe} 
                    onChange={(e) => setRememberMe(e.target.checked)} 
                  /> Remember me
                </label>
              </div>

              <button type="submit" className="login-button">➔ Sign In</button>
              <p className="forgot-link">
                <Link to="/forgot-password">Forgot Password?</Link>
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
