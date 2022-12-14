import React from 'react';

import './_global.scss'

import LoginButton from './components/HomePage/HeaderBar/LoginButton.jsx'
import Logout from './components/HomePage/HeaderBar/LogoutButton.jsx'

const Welcome = (props) => {
  return (
    <div>
      <div>
        <h3>Welcome to the Money Zone!</h3>
        <h4>Sign in or continue as a guest</h4>
        <LoginButton />
      </div>
    </div>
  )
}

export default Welcome;