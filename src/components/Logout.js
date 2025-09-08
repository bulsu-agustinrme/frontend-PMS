export function logout(navigate) {
  // remove token and user info
  localStorage.removeItem("authToken");
  localStorage.removeItem("userName");
  sessionStorage.removeItem("authToken");
  sessionStorage.removeItem("userName");

  // redirect to login
  if (navigate) {
    navigate("/sign-in");
  }
}
