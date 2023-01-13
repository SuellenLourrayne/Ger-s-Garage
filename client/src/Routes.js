import React from "react";
import { Route, BrowserRouter } from "react-router-dom";

import Home from './pages/Home/Home';
import Register from './pages/Register/Register';
import Login from './pages/Login/Login';
import Dashboard from './pages/Dashboard/Dashboard';
import BookingList from './pages/BookingList/BookingList';
import Products from './pages/Products/Products';
import Staff from './pages/Staff/Staff';
import Profile from './pages/Profile/Profile';
import BookingsClient from './pages/BookingsClient/BookingsClient';
import Clients from './pages/Clients/Clients';
import RecoverPassword from './pages/RecoverPassword/RecoverPassword';


const Routes = () => {
   return(
       <BrowserRouter>
           <Route component = { Home }  path="/" exact />
           <Route component = { Register }  path="/Register" />
           <Route component = { Login }  path="/Login" />
           <Route component = { Dashboard }  path="/Dashboard" />
           <Route component = { BookingList }  path="/BookingList" />
           <Route component = { Products }  path="/Products" />
           <Route component = { Staff }  path="/Staff" />
           <Route component = { Profile }  path="/Profile" />
           <Route component = { BookingsClient }  path="/BookingsClient" />
           <Route component = { Clients }  path="/Clients" />
           <Route component = { RecoverPassword }  path="/RecoverPassword" />
       </BrowserRouter>
   )
}

export default Routes;
