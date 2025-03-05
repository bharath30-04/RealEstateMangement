
import React from 'react';
import ReactDOM from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { AuthProvider } from './auth.js';
import Search from './search/search';
import Footer from './footer/footer.jsx';
import House from './house/house.jsx';
import App from "./App.js";
import Nav from "./nav/nav.js";
import Login from "./login/login.jsx";
import Admin from "./admin/admin.jsx";
import Agent from "./agent/agent.jsx";
import Addagent from "./addagent/addagent.jsx";
import Addproperty from "./addproperty/addproperty.jsx";
import Appadmin from "./appadmin.jsx";
import Appagent from "./appagent.jsx";
import About from "./about/about.jsx";
import Contact from "./contact/contact.jsx";

const router = createBrowserRouter([
    {
        path: "/",
        element: <>
          <App />
          <Search />
            <Footer />
        </>
    },
    {
        path: "/house",
        element: <>
           <App />
            <House />
            <Footer />
        </>
    },
    {
        path: "/about",
        element: <>
           <App />
            <About />
            <Footer />
        </>
    },
    {
        path: "/contact",
        element: <>
           <App />
            <Contact />
            <Footer />
        </>
    },
    
    
    {
        path: "/search",
        element: <>
           <App />
            <Search />
            <Footer />
        </>
    },
     {
        path: "/admin/addagent",
        element: <>
           <Appadmin />
            <Addagent />
            <Footer />
        </>
    },
    {
        path: "/admin/agents",
        element: <>
          <Appadmin />
            <Agent />
            <Footer />
        </>
    },
    {
        path: "/agent/addproperty",
        element: <>
           <Appagent />
            <Addproperty />
            <Footer />
        </>
    },
    {
        path: "/admin/addproperty",
        element: <>
           <Appadmin />
            <Addproperty />
            <Footer />
        </>
    },
    {
        path: "/admin",
        element: <>
           <Appadmin />
            <Search />
            <Footer />
        </>
    }
    ,{
        path: "/agent",
        element: <>
           <Appagent />
            <Search />
            <Footer />
        </>
    }
  




    // Add additional routes as needed
]);

const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
       <AuthProvider> 
    <RouterProvider router={router} />
    </AuthProvider>
);


