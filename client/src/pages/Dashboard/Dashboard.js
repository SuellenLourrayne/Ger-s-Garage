import React from 'react';
import { BrowserRouter as Router, Routes, Route  } from 'react-router-dom';

import SideBar from '../../components/Sidebar';
import sidebar_menu from '../../constants/sidebar-menu';

import './Dashboard.css';

function Dashboard () {
  return(
    <Router>
      <div className='dashboard-container'>
        <SideBar menu={sidebar_menu} />
      </div>
    </Router>
  )
}

export default Dashboard;