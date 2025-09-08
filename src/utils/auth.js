// Get token with expiry check
export const getToken = () => {
  const authData =
    JSON.parse(localStorage.getItem("authData")) ||
    JSON.parse(sessionStorage.getItem("authData"));

  if (!authData) return null;

  // Check expiry if set
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

// Save (token + userName) with optional expiry (30 days if remember = true)
export const setAuth = (token, userName = "", remember = false) => {
  const authData = {
    token,
    userName,
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
