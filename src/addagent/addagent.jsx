import React, { useState} from 'react';
import './addagent.css';
import axios from "axios";
import { useAuth } from './../auth.js';
import { Link } from 'react-router-dom';
import Log from './../log.jsx';

const AddAgent = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    pincode: '',
    phone: '',
    address: '',
    password: '',
    photo: [],
  });
 
  const { isLoggedIn } = useAuth();
  console.log(isLoggedIn);
  if(!isLoggedIn)
  {	return <Log />;
  }

  /*const handleChange = (e) => {
    const { name, value, type, files } = e.target;
    setFormData({
      ...formData,
      [name]: type === 'file' ? Array.from(files): value
    });
  };*/
  
   const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (name === 'photo') {
      setFormData({ ...formData, [name]: Array.from(files) });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  /*function handleSubmit(e)
  {
	    e.preventDefault();
	    // Handle form submission logic here
	    console.log(formData);
	    useEffect(()=>
	    {	axios.post('http://localhost:5000/addagent',formData)
	    	.then(()=>{console.log("data posted successfull")})
	    	.catch(()=>{console.log("error in posting the data")});
    	
	   }
  };
  */
  
 
/*  function handleSubmit(e) {
    e.preventDefault();
    // Handle form submission logic here
    console.log(formData);

    axios.post('http://localhost:5000/addagent', formData)
        .then(() => {
            console.log("data posted successfully");
        })
        .catch(() => {
            console.log("error in posting the data");
        });
        
  }*/

   const handleSubmit = async (e) => {
  e.preventDefault();

  const form = new FormData();
  form.append('name', formData.name);
  form.append('email', formData.email);
  form.append('pincode', formData.pincode);
  form.append('phone', formData.phone);
  form.append('address', formData.address);
  form.append('password', formData.password);

  // Append photo(s)
  formData.photo.forEach((file) => {
    form.append('photo', file);
  });

  try {
    const response = await axios.post('http://localhost:5000/addagent', form, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });

    // Handle the response from the server
    console.log('Success:', response.data);
    alert("agent added successfully.");
  } catch (error) {
    console.error('Error:', error);
  }
};

   
   
 

  return (
    <div className="frm-box" >
      <h2>Add an Agent</h2>
      <form onSubmit={handleSubmit}>
        <div className="input-bx">
          <label>Name:</label>
          <input 
            type="text" 
            name="name" 
            value={formData.name} 
            onChange={handleChange} 
            required 
          />
        </div>
        <div className="input-bx">
          <label>Email:</label>
          <input 
            type="email" 
            name="email" 
            value={formData.email} 
            onChange={handleChange} 
            required 
          />
        </div>
        <div className="input-bx">
          <label>Location (Pincode):</label>
          <input 
            type="number" 
            name="pincode" 
            value={formData.pincode} 
            onChange={handleChange} 
            required 
          />
        </div>
        <div className="input-bx">
          <label>Phone Number:</label>
          <input 
            type="number" 
            name="phone" 
            value={formData.phone} 
            onChange={handleChange} 
            required 
          />
        </div>
        <div className="input-bx">
          <label>Address:</label>
          <textarea 
            cols="25" 
            rows="3" 
            name="address" 
            value={formData.address} 
            onChange={handleChange} 
            required 
          />
        </div>
        <div className="input-bx">
          <label>Password:</label>
          <input 
            type="password" 
            name="password" 
            value={formData.password} 
            onChange={handleChange} 
            required 
          />
        </div>
        <div style={{ color: '#343a40', padding: '0 35px 0 5px', height: '50px' }}>
          <label>Upload Photo:</label>
          <input 
            type="file" 
            name="photo" 
            accept="image/*" 
            onChange={handleChange} 
            required 
          />
        </div>
        <button type="submit" className="btn">Register</button>
      </form>
    </div>
  );
};

export default AddAgent;






