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

const MainRoutes = () =>{
    return(
        <Router>
            <Routes>
            <Route path="/admin/sign-in" element={<Login />}/>
            <Route path="/forgot-password" element={<ForgotPassword />} />
            <Route path="/" element={<Home />}>
            <Route path="/dashboard" element={<Dashboard />}/>
            <Route path="/parking-spaces" element={<Parkingspaces />}/>
            <Route path="/user-list" element={<UserList />}/>
            <Route path="/edit-parking-space" element={<EditParking />}/>
            <Route path="/messages" element={<Messages />}/>
            <Route path="/pending-list" element={<PendingList />}/>
            <Route path="/settings" element={<Settings />}/>
            <Route path="/notifications" element={<Notifications />}/>
            <Route path="/customized-parking" element={<CustomizedParking />}/>
            </Route>
            
    </Routes>
</Router>

    )
}
export default MainRoutes;

