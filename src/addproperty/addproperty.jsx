import React, { useState } from 'react';
import './addproperty.css';
import axios from "axios";
import { useAuth } from './../auth.js';
 import Log from './../log.jsx';
 

const AddProperty = () => {

	
	
  const [formData, setFormData] = useState({
    agentId: '',
    property_id: '',
    propertyName: '',
    specifications: '',
    cost: '',
    mode: 'sale',
    doorNo: '',
    streetName: '',
    townCityName: '',
    state: 'Andhra Pradesh',
    pincode: '',
    photos: [],
    ownerName: '',
    ownerPhoneNumber: ''
  });

 const { isLoggedIn } = useAuth();
  console.log(isLoggedIn);
  if(!isLoggedIn)
  {	return <Log />;
  }
  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (name === 'photos') {
      setFormData({ ...formData, [name]: Array.from(files) });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    const formDataToSend = new FormData();
    for (const key in formData) {
      if (key === 'photos') {
        formData[key].forEach(file => formDataToSend.append('photos', file));
      } else {
        formDataToSend.append(key, formData[key]);
      }
    }

    try {
      await axios.post('http://localhost:5000/addproperty', formDataToSend, {
        headers: { 'Content-Type': 'multipart/form-data' }
      });
      console.log("Data posted successfully");
      alert("Property added successfully.");
    } catch (error) {
      console.log("Error in posting the data", error);
    }
  };

  return (
    <div className="addproperty">
      <form onSubmit={handleSubmit}>
        <div><h1>Add Property</h1></div>
        
        <div>
          <label>Agent Id</label>
          <input type="text" name="agentId" value={formData.agentId} onChange={handleChange} required />
        </div>
        
        <div>
          <label>Property Id</label>
          <input type="text" name="property_id" value={formData.property_id} onChange={handleChange} required />
        </div>
        
        <div><h2>Property Details</h2></div>
        
        <div>
          <label>Property Name:</label>
          <input type="text" name="propertyName" value={formData.propertyName} onChange={handleChange} required />
        </div>
        
        <div>
          <label>Specifications:</label>
          <textarea rows="5" cols="30" name="specifications" value={formData.specifications} onChange={handleChange} required />
        </div>
        
        <div>
          <label>Cost:</label>
          <input type="text" name="cost"  value={formData.cost} onChange={handleChange} required />
        </div>
        
        <div>
          <label>Mode:</label>
          <select name="mode" value={formData.mode} onChange={handleChange} required>
            <option>sale</option>
            <option>rent</option>
          </select>
        </div>
        
        <div><h3>Address</h3></div>
        
        <div>
          <label>Door No:</label>
          <input type="text" name="doorNo" value={formData.doorNo} onChange={handleChange} required />
          
          <label>Street Name:</label>
          <input type="text" name="streetName" value={formData.streetName} onChange={handleChange} required />
          
          <label>Town/City Name:</label>
          <input type="text" name="townCityName" value={formData.townCityName} onChange={handleChange} required />
          
          <label>State:</label>
          <select name="state" value={formData.state} onChange={handleChange} required>
            <option>Andhra Pradesh</option>
            <option>Tamilnadu</option>
            <option>Telangana</option>
            <option>Karnataka</option>
            <option>Goa</option>
          </select>
        </div>
        
        <div>
          <label>Pincode:</label>
          <input type="tel" name="pincode" pattern="[0-9]{6}" maxLength="6" value={formData.pincode} onChange={handleChange} required />
        </div>
        
        <div>
          <label>Upload Photos:</label>
          <input type="file" name="photos" multiple onChange={handleChange} required />
        </div>
        
        <div><h2>Property Owner Details</h2></div>
        
        <div>
          <label>Name:</label>
          <input type="text" name="ownerName" value={formData.ownerName} onChange={handleChange} required />
        </div>
        
        <div>
          <label>Phone Number:</label>
          <input type="tel" name="ownerPhoneNumber" pattern="[0-9]{10}" maxLength="10" value={formData.ownerPhoneNumber} onChange={handleChange} required />
        </div>
        
        <div>
          <button type="submit">Submit</button>
        </div>
      </form>
    </div> 
  );
};

export default AddProperty;

