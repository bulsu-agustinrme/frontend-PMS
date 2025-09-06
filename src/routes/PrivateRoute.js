import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import PrivateRoute from "./PrivateRoute";
import Dashboard from "./pages/Dashboard";
import SignIn from "./pages/SignIn";

function App() {
  return (
    <Router>
      <Routes>
        {/* Public route */}
        <Route path="/sign-in" element={<SignIn />} />

        {/* Protected routes */}
        <Route element={<PrivateRoute />}>
          <Route path="/dashboard" element={<Dashboard />} />
          {/* Add more protected routes here */}
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
