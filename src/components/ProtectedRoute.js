import { Navigate } from "react-router-dom";

function ProtectedRoute({ children }) {
  const token = localStorage.getItem("authToken") || sessionStorage.getItem("authToken");
  return token ? children : <Navigate to="/sign-in" />;
}

export default ProtectedRoute;
