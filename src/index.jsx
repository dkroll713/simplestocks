// Bring React in to build a component.
import React from "react";
// Import from react-dom the ability to create a root render
import { createRoot } from "react-dom/client";
import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom";

// const

import HomePage from './components/HomePage/HomePage.jsx'

import './_global.scss'

// create the root of the app by selection where the app should be mounted in the dom
const root = createRoot(document.getElementById("root"));

// Here is out base App component.
// Notice we are NOT using jsx here. This is because we have not set up babel yet.
const App = () => {

  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<HomePage />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
};

root.render(<App />);