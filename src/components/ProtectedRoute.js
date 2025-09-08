import { Navigate } from "react-router-dom";
import { getToken } from "utils/auth"; //  use helper

function ProtectedRoute({ children }) {
  const token = getToken();
  return token ? children : <Navigate to="/sign-in" />;
}

export default ProtectedRoute;
