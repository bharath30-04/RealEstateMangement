import React, { useState, useEffect } from 'react';
import './login.css'; // Your existing CSS
import { IonIcon } from '@ionic/react';
import { mail, lockClosed, personCircle, close } from 'ionicons/icons';
import axios from 'axios';
import { useAuth } from './../auth.js';
import Cookies from "js-cookie";// Import the custom hook for authentication

const LoginPage = ({ onClose }) => {
	const { isLoggedIn, setIsLoggedIn,user,setuser } = useAuth();
  const [isRegister, setIsRegister] = useState(false);
  const [currentMode, setCurrentMode] = useState('user'); // Default to 'user'

  const [data, setData] = useState([]);

  // Access the isLoggedIn state and setIsLoggedIn function from the AuthContext
  if(isLoggedIn)
  {
    setuser(null);
  }
  useEffect(() => {
    console.log("Updated user:", user);
  }, [user]);
	
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    mode: 'user',
  });
 if(isLoggedIn)
    {	setIsLoggedIn(false);
    	return;
    }
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const toggleForm = () => {
    setIsRegister(!isRegister);
  };

  const login = (e) => {
    e.preventDefault();
    console.log(`${currentMode} Logged in`);
  

  

    axios
      .get('http://localhost:5000/login',{params:{email:formData.email,password:formData.password,mode:currentMode},withCredentials: true,})
      .then((response) => {
        setData(response.data);
       // console.log(data);
	if(response.data.length===1)
	{
        // Assuming login is successful, set isLoggedIn to true
       		 /* Cookies.set("user", JSON.stringify(response.data[0]), {
          expires: 1, // 1 day expiration
        });*/
        setuser({email:formData.email,password:formData.password,mode:currentMode});	

       		 setIsLoggedIn(true);
           //console.log(user); 
       	}	// Update the context to reflect the login status

        onClose();  // Close the login modal after successful login
      })
      .catch(() => {
        console.log('Error in posting the data');
      });
  };

  const register = (e) => {
    e.preventDefault();
    console.log(`${currentMode} Registered`);
    console.log(formData);

    axios
      .post('http://localhost:5000/register', formData)
      .then(() => {
        console.log('Data posted successfully');
      })
      .catch(() => {
        console.log('Error in posting the data');
      });
    onClose(); // Close the register modal after registration
  };

  const handleModeChange = (mode) => {
    setCurrentMode(mode);
  };

  return (
    <div className="popup">
      <div className="wrapper">
        <span className="icon-close" onClick={onClose}>
          <IonIcon icon={close} />
        </span>

        {/* Show mode selection only when not in register mode */}
        {!isRegister && (
          <div className="mode-toggle">
            <button
              onClick={() => handleModeChange('user')}
              className={currentMode === 'user' ? 'active' : ''}
            >
              User
            </button>
            <button
              onClick={() => handleModeChange('agent')}
              className={currentMode === 'agent' ? 'active' : ''}
            >
              Agent
            </button>
            <button
              onClick={() => handleModeChange('admin')}
              className={currentMode === 'admin' ? 'active' : ''}
            >
              Admin
            </button>
          </div>
        )}

        <h2 className="login-mode">{!isRegister ? `Login as ${currentMode}` : 'Register'}</h2>

        <div className="form-box">
          <form onSubmit={isRegister ? register : login}>
            {/* Show username input only for Agent and Admin in Login Mode */}
            {isRegister && (
              <div className="input-box">
                <span className="icon">
                  <IonIcon icon={personCircle} />
                </span>
                <input
                  type="text"
                  name="username"
                  id="username"
                  onChange={handleChange}
                  required
                />
                <label>
                  <b>Username</b>
                </label>
              </div>
            )}

            {/* Email Input */}
            <div className="input-box">
              <span className="icon">
                <IonIcon icon={mail} />
              </span>
              <input
                type="email"
                name="email"
                id="email"
                onChange={handleChange}
                required
              />
              <label>
                <b>Email</b>
              </label>
            </div>

            {/* Password Input */}
            <div className="input-box">
              <span className="icon">
                <IonIcon icon={lockClosed} />
              </span>
              <input
                type="password"
                name="password"
                id="password"
                onChange={handleChange}
                required
              />
              <label>
                <b>Password</b>
              </label>
            </div>

            {/* Conditional Terms Checkbox (shown for Agent or Admin only in register mode) */}
            {isRegister && currentMode !== 'user' && (
              <div className="remember-forgot">
                <label style={{ color: '#fff' }}>
                  <input type="checkbox" />{/* Agree to the terms & conditions */}
                </label>
              </div>
            )}

            <div className="remember-forgot">
              <label style={{ color: '#fff' }}>
                <input type="checkbox" />{/* Remember Me */}
              </label>
              <a href="#" style={{ color: '#fff' }}>
                Forgot Password
              </a>
            </div>

            <button type="submit" className="btn">
              {isRegister ? 'Register' : 'Login'}
            </button>

            <div className="login-register">
              <p>
                {isRegister ? 'Already have an account?' : "Don't have an account?"}{' '}
                <a href="#" onClick={toggleForm}>
                  {isRegister ? 'Login' : 'Register'}
                </a>
              </p>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;

