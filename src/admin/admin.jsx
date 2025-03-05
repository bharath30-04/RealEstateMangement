import React from 'react';
//import 'bootstrap/dist/css/bootstrap.min.css';
import './admin.css';

const AdminPage = () => {
  return (
    <div className="admin">
      <div className="box">
        <h1>Admin</h1>
        <div className="top-buttons">
        
            <a href="addagent.js" ><button className="butn">ADD Agent</button></a>
            <button className="butn">Progress of Agent</button>
          
        </div>
        <div className="bottom-buttons">
          
            <a href="agents.jsx"><button className="butn" >Agents</button></a>
            <button className="butn">Approve Houses</button>
          
        </div>
     </div>
    </div>
  );
};

export default AdminPage;
