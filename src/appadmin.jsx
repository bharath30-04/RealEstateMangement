import Login from './login/login.jsx';
//import Nav from './nav/nav.js';
//import Nav1 from './nav/navagent.jsx';
import Navadmin from './nav/navadmin.jsx';

import React, { useState } from 'react';
//import Navbar from './Navbar'; // Assuming Navbar is a separate component
//import LoginPage from './LoginPage'; // Import the LoginPage component

const App = () => {
  const [isPopupOpen, setIsPopupOpen] = useState(false);

  const openLoginPopup = () => {
    setIsPopupOpen(true);
  };

  const closeLoginPopup = () => {
    setIsPopupOpen(false);
  };

  return (
    <div className={`app-container ${isPopupOpen ? 'blurred' : ''}`}>
      <Navadmin openLoginPopup={openLoginPopup} />
      {isPopupOpen && <Login onClose={closeLoginPopup} />}
    </div>
  );
};

export default App;


