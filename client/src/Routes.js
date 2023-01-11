import React from "react";
import { Route, BrowserRouter } from "react-router-dom";

import Home from './pages/Home/Home';
import Register from './pages/Register/Register';
import Login from './pages/Login/Login';
import Dashboard from './pages/Dashboard/Dashboard';
import BookingList from './pages/BookingList/BookingList';


const Routes = () => {
   return(
       <BrowserRouter>
           <Route component = { Home }  path="/" exact />
           <Route component = { Register }  path="/Register" />
           <Route component = { Login }  path="/Login" />
           <Route component = { Dashboard }  path="/Dashboard" />
           <Route component = { BookingList }  path="/BookingList" />
       </BrowserRouter>
   )
}

export default Routes;
