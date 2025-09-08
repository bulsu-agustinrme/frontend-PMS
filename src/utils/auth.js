export const getToken = () =>
  localStorage.getItem("authToken") || sessionStorage.getItem("authToken");

export const getUserName = () =>
  localStorage.getItem("userName") || sessionStorage.getItem("userName");

// Write (token + userName) and respect Remember Me
export const setAuth = (token, userName = "", remember = false) => {
  if (remember) {
    // persist across browser restarts
    localStorage.setItem("authToken", token);
    localStorage.setItem("userName", userName);
    localStorage.setItem("rememberMe", "true");
    // keep session clean
    sessionStorage.removeItem("authToken");
    sessionStorage.removeItem("userName");
  } else {
    // session-only
    sessionStorage.setItem("authToken", token);
    sessionStorage.setItem("userName", userName);
    // clear any persisted data
    localStorage.removeItem("authToken");
    localStorage.removeItem("userName");
    localStorage.removeItem("rememberMe");
  }
};

// Clear everything
export const clearAuth = () => {
  localStorage.removeItem("authToken");
  localStorage.removeItem("userName");
  localStorage.removeItem("rememberMe");
  sessionStorage.removeItem("authToken");
  sessionStorage.removeItem("userName");
};
