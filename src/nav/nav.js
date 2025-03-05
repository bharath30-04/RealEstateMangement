

import React,{useState} from 'react';
import { Link } from 'react-router-dom';
import './nav.css';
import { IonIcon } from '@ionic/react';
import { personCircleOutline } from 'ionicons/icons';
import { useAuth } from './../auth.js';
import ProfilePopup from '../profile';



const Navbar = ({ openLoginPopup }) => {

 const { isLoggedIn, setIsLoggedIn } = useAuth();    
 
  const [showProfilePopup, setShowProfilePopup] = useState(false);

  const toggleProfilePopup = () => {
    setShowProfilePopup((prev) => !prev);
  };
  return (
    <div className="header">
      <div className="cont">
        <div className="logo">
          <h1>Homely</h1>
        </div>
        <div className="nav">
        
            <ul>
              <li><Link to="/" className="link ">Home</Link></li>
              <li><Link to="/" className="link">Listings</Link></li>
              <li><Link to="/about" className="link">About Us</Link></li>
              <li><Link to="/contact" className="link">Contact Us</Link></li>
              <li> <Link to="/" className="btnLogin-popup " onClick={openLoginPopup}>{!isLoggedIn ?'Login':'Logout'}</Link></li>
              <li>
                <span className="icon">
                  <IonIcon icon={personCircleOutline} style={{ width: "40px", height: "40px", cursor: "pointer" }} onClick={toggleProfilePopup}/>
                </span>
              </li>
            </ul>
         
        </div>
      </div>
      {showProfilePopup && <ProfilePopup onClose={toggleProfilePopup} />}
    </div>
  );
};

export default Navbar;

