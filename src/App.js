// src/App.js
/*import React, { useEffect, useState } from 'react';
import axios from 'axios';

function App() {
    const [data, setData] = useState(null);

    useEffect(() => {
        axios.get('http://localhost:5000/main')
            .then(response => {
                setData((response.data));

            })
            .catch(error => {
                console.error('Error fetching data:', error);
            });
    }, []);

    return (
        <div className="App">
            <h1>Data from Backend:</h1>
            {data ? <pre>{JSON.stringify(data, null, 2)}</pre> : 'Loading...'}
            {data ? <h1> {data[0].name}</h1>: 'Loading...'}
        </div>
    );
}

export default App;

*/
import Login from './login/login.jsx';
import Nav from './nav/nav.js';
//import Nav1 from './nav/navagent.jsx';
//import Nav2 from './nav/navadmin.jsx';

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
      <Nav openLoginPopup={openLoginPopup} />
      {isPopupOpen && <Login onClose={closeLoginPopup} />}
    </div>
  );
};

export default App;


