import api from "./api"; // axios instance

// Get token with expiry check
export const getToken = () => {
  const authData =
    JSON.parse(localStorage.getItem("authData")) ||
    JSON.parse(sessionStorage.getItem("authData"));

  if (!authData) return null;

  if (authData.expiry && Date.now() > authData.expiry) {
    clearAuth();
    return null;
  }

  return authData.token;
};

// Get username with expiry check
export const getUserName = () => {
  const authData =
    JSON.parse(localStorage.getItem("authData")) ||
    JSON.parse(sessionStorage.getItem("authData"));

  if (!authData) return null;

  if (authData.expiry && Date.now() > authData.expiry) {
    clearAuth();
    return null;
  }

  return authData.userName;
};

// Get email with expiry check
export const getUserEmail = () => {
  const authData =
    JSON.parse(localStorage.getItem("authData")) ||
    JSON.parse(sessionStorage.getItem("authData"));

  if (!authData) return null;

  if (authData.expiry && Date.now() > authData.expiry) {
    clearAuth();
    return null;
  }

  return authData.email;
};

// Save (token + userName + email) with optional expiry (30 days if remember = true)
export const setAuth = (token, userName = "", email = "", remember = false) => {
  const authData = {
    token,
    userName,
    email,
    expiry: remember ? Date.now() + 30 * 24 * 60 * 60 * 1000 : null, // 30 days
  };

  if (remember) {
    localStorage.setItem("authData", JSON.stringify(authData));
    sessionStorage.removeItem("authData");
  } else {
    sessionStorage.setItem("authData", JSON.stringify(authData));
    localStorage.removeItem("authData");
  }
};

// Clear everything
export const clearAuth = () => {
  localStorage.removeItem("authData");
  sessionStorage.removeItem("authData");
};

// Logout (frontend only)
export const logout = (navigate) => {
  clearAuth();
  if (navigate) {
    navigate("/sign-in");
  } else {
    window.location.href = "/sign-in";
  }
};

//  Delete account + auto logout
export const deleteAccount = async () => {
  try {
    await api.delete("/account/delete");
    clearAuth();
    window.location.href = "/sign-in";
  } catch (error) {
    console.error("❌ Failed to delete account:", error);
    throw error;
  }
};
