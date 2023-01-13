import React from 'react';
import { BrowserRouter as Router, Routes, Route  } from 'react-router-dom';

import SideBar from '../../components/Sidebar';
import sidebar_menu from '../../constants/sidebar-menu';

import './Profile.css';

function Profile () {
  return(
    <Router>
        <div className='dashboard-container'>
            <SideBar menu={sidebar_menu} />

            <div className='dashboard-body'>
            <div className='Profile-content'>
            <div className='Profile-content-container'>
            <div className='Profile-content-header'>
              <h2>Profile</h2>
            </div>
            </div>
            </div>
            </div>
        </div>
    </Router>
  )
}

export default Profile;