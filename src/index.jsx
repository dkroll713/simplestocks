// Bring React in to build a component.
import React from "react";
// Import from react-dom the ability to create a root render
import reactDom from "react-dom";
import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom";
import {Auth0Provider} from "@auth0/auth0-react";

const {auth0client, auth0domain} = require('../config.js')

import HomePage from './components/HomePage/HomePage.jsx'
import CardDetails from './components/DetailedView/CardDetails.jsx'

import './_global.scss'

// create the root of the app by selection where the app should be mounted in the dom
const root = document.getElementById("root");

// Here is out base App component.
// Notice we are NOT using jsx here. This is because we have not set up babel yet.
class App extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/detailedView/:ticker" element={<CardDetails />} />
          </Routes>
        </BrowserRouter>
      </div>
    );
  }
};

reactDom.render(
  <Auth0Provider
    domain={auth0domain}
    clientId={auth0client}
    redirectUri={window.location.origin}
  >
    <App />
  </Auth0Provider>,
  document.getElementById('root')
);