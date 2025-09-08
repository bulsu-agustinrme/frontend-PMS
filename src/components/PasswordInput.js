import React, { useState } from 'react';
import { FaEye, FaEyeSlash } from 'react-icons/fa';

function PasswordInput({ name, value, onChange, className, placeholder }) {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <div className="password-container">
      <input
        type={showPassword ? 'text' : 'password'}
        name={name}
        placeholder={placeholder || "Password"}   
        value={value}
        onChange={onChange}
        className={`${className} password-input`}
      />
      <span
        className="toggle-password-icon"
        onClick={() => setShowPassword(!showPassword)}
        title={showPassword ? 'Hide password' : 'Show password'}
      >
        {showPassword ? <FaEyeSlash /> : <FaEye />}
      </span>
    </div>
  );
}

export default PasswordInput;
