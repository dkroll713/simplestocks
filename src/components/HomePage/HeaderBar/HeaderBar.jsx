import React, {useState, useEffect} from 'react';

const axios = require('axios');

import LoginButton from './LoginButton.jsx'
import LogoutButton from './LogoutButton.jsx'
import Profile from './Profile.jsx';

const HeaderBar = (props) => {
  return (
    <div className="headerBar">
      <div className="centerHeader">
        <h3 className="headerContents">Welcome to the money zone</h3>
      </div>
      <div className="rightHeader">
        <Profile />
        <LogoutButton />
      </div>
    </div>
  )
}

export default HeaderBar;