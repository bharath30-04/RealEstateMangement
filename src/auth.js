// src/context/AuthContext.js

import React, { createContext, useState, useContext } from 'react';

// Create Context
const AuthContext = createContext();

// Create a Provider Component
export const AuthProvider = ({ children }) => {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [user,setuser]=useState({
        email:'email',
        password:'password',
        mode:'mode',
    });

    const Login = () => {
        setIsLoggedIn(true);
    };

    const Logout = () => {
        setIsLoggedIn(false);
    };

    return (
        <AuthContext.Provider value={{ isLoggedIn,setIsLoggedIn,user,setuser}}>
            {children}
        </AuthContext.Provider>
    );
};

// Custom hook to use the AuthContext
export const useAuth = () => useContext(AuthContext);

