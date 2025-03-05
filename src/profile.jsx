


import React from "react";
import "./profile.css";
import { IonIcon } from "@ionic/react";
import { close } from "ionicons/icons";
//import axios from "axios";
import { useAuth } from './auth.js';
import { Link } from 'react-router-dom';


const ProfilePopup = ({ onClose }) => {
 // const [user, setUser] = useState(null);
  const {user } = useAuth();

  /*useEffect(() => {
    // Fetch user session details
    axios.get("http://localhost:5000/session")
      .then((res) => {
      console.log(res.data.valid);
        if (res.data.valid) {
          setUser(res.data.user); 
          // Set the logged-in user details
        }
      })
      .catch((err) => console.error("Error fetching session:", err));
  }, []);

  const logout = () => {
    // Clear cookies on logout
    document.cookie = "user=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
    setUser(null);
    onClose(); // Close the profile popup
  };
*/
  return (
    <div className="profile-popup">
      <div className="popup-circle">
        <div className="popup-part profile-section">
          <h3>Profile</h3>
          {user ? (
            <>
              <p><b>Email:</b> {user.email}</p>
              <p><b>Role:</b> {user.mode}</p>
            </>
          ) : (
            <p>Loading user details...</p>
          )}
        </div>
        <div className="popup-part settings-section">
          <h3>Settings</h3>
         {user?.mode==='admin' && <Link to="/admin" className="links"><div className="admins buttons">Admin</div></Link> }
         {(user?.mode ==='admin'||user?.mode==='agent')&& <Link to="/agent" className="links"><div className="agts buttons">Agent</div> </Link>}
          <Link to="/" className="links"><div className="users buttons">User</div></Link>
        </div>
        <div className="popup-part logout-section">
          <p>click on logout to get Sign out of your account.</p>
        </div>
      </div>
      <span className="close-btn" onClick={onClose}>
        <IonIcon icon={close} />
      </span>
    </div>
  );
};

export default ProfilePopup;


