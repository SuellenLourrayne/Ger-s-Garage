import React from "react";
import { BrowserRouter as Router } from 'react-router-dom';
import SideBar from '../../components/Sidebar';
import sidebar_menu from '../../constants/sidebar-menu';

import './BookingList.css';

function BookingList () {
    return(
        <Router>
          <div className='dashboard-container'>
            <SideBar menu={sidebar_menu} />
              
            <div className='dashboard-body'>
            <div className='BookingList-content'>
            <div className='BookingList-content-container'>
            <div className='BookingList-content-header'>
                        <h2>Booking List</h2>
            </div>
            </div>
            </div>
              </div>
          </div>
        </Router>
    )
  }
  
  export default BookingList;
