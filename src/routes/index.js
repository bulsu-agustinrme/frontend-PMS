import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Login from "pages/Login";
import Dashboard from 'pages/Dashboard';
import Home from 'pages/Home';
import Parkingspaces from 'pages/ParkingSpaces';
import UserList from 'pages/UserList';
import EditParking from 'pages/EditParkingSpace';
import ForgotPassword from 'pages/ForgotPassword'; 
import Messages from 'pages/Messages';
import PendingList from 'pages/PendingList';
import Settings from 'pages/Settings';
import Notifications from 'pages/Notifications';
import CustomizedParking from 'pages/CustomizedParking';
import SettingsResetPassword from 'pages/SettingsResetPassword';

import ProtectedRoute from "components/ProtectedRoute";

const MainRoutes = () =>{
    return(
        <Router>
            <Routes>
                <Route path="/sign-in" element={<Login />}/>
                <Route path="/forgot-password" element={<ForgotPassword />} />

                {/* All protected routes */}
                <Route path="/" element={<Home />}>
                    <Route path="/dashboard" element={
                        <ProtectedRoute><Dashboard /></ProtectedRoute>
                    }/>
                    <Route path="/parking-spaces" element={
                        <ProtectedRoute><Parkingspaces /></ProtectedRoute>
                    }/>
                    <Route path="/user-list" element={
                        <ProtectedRoute><UserList /></ProtectedRoute>
                    }/>
                    <Route path="/edit-parking-space" element={
                        <ProtectedRoute><EditParking /></ProtectedRoute>
                    }/>
                    <Route path="/messages" element={
                        <ProtectedRoute><Messages /></ProtectedRoute>
                    }/>
                    <Route path="/pending-list" element={
                        <ProtectedRoute><PendingList /></ProtectedRoute>
                    }/>
                    <Route path="/settings" element={
                        <ProtectedRoute><Settings /></ProtectedRoute>
                    }/>
                    <Route path="/notifications" element={
                        <ProtectedRoute><Notifications /></ProtectedRoute>
                    }/>
                    <Route path="/customized-parking" element={
                        <ProtectedRoute><CustomizedParking /></ProtectedRoute>
                    }/>
                   <Route path="/settings-reset-password" element={
                        <ProtectedRoute><SettingsResetPassword /></ProtectedRoute>
                    }/>
                </Route>
            </Routes>
        </Router>
    )
}
export default MainRoutes;
