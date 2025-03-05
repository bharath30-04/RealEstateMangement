

import React, { useState, useEffect } from 'react';
import './house.css';
import { IonIcon } from '@ionic/react';
import { star,starOutline,bulbOutline,starHalf,rainyOutline,barbellOutline,carSportOutline,balbOutline,bedOutline,waterOutline} from 'ionicons/icons';
import { useLocation } from "react-router-dom";
import axios from 'axios';


  

/*const images = [
  { img: "mainhouse.jpg" },
  { img: "hall.jpg" },
  { img: "dinning.jpg" },
  { img: "bedroom.jpg" },
  { img: "bathroom.jpg" },
  { img: "carparking.jpg" },
  { img: "swimmingpool.jpg" }
];
*/
const HouseSelection = () => {
	const [len,setlen]=useState(1);
	const[Data,setdata]=useState([
	{
    id:0,
    name: '',
    specifications: '',
    cost:'',
    mode: '',
    doorno: '',
    street: '',
    city: '',
    state: '',
    pin: '',
    ownername: '',
    ownerphone: '',
    p_id:0 
  }
	]);
	const [images,setimg]=useState([
	  { img: "mainhouse.jpg" },
  

]);
	console.log(images);
	const location = useLocation();
  const data = location.state;
  //console.log(data);
	
	
	useEffect(()=>{
	setdata(Data);}
	,[Data]);
	
useEffect(() => {
  axios
    .get("http://localhost:5000/house", {
      params: {
        pin: data.pin,
        location: data.location,
        cost: data.cost,
      },
    })
    .then((res) => {
      setimg(res.data);
      console.log(res.data.length);
      setlen(res.data.length);
       
      console.log(res.data[0].img);
    })
    .catch((err) => {
      console.log("Error in fetching the data", err);
    });
}, [data.pin, data.location, data.cost]);


useEffect(() => {
  axios
    .get("http://localhost:5000/houseData", {
      params: {
        pin: data.pin,
        location: data.location,
        cost: data.cost,
      },
    })
    .then((res) => {
     setdata(res.data);
     console.log(res.data);
    })
    .catch((err) => {
      console.log("Error in fetching the data", err);
    });
}, [data.pin, data.location, data.cost]);





/*	 axios
  .get("http://localhost:5000/house", {
    params: {
      pin: data.pin,
      location: data.location,
      cost: data.cost,
    },
  })
  .then((res) => {
    setimg(res.data);
    console.log(images);
    console.log(res.data[0].img);// Handle the response data
  })
  .catch((err) => {
    console.log("Error in fetching the data", err); // Log any errors
  });*/
  
  
  

  useEffect(() => {
  if (images.length > 0) {
    setSelectedImage(images[0]?.img);
  }
}, [images]); 
	//console.log(images);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedImage, setSelectedImage] = useState(images[0]?.img || '');
	
	
	
	
  // Carousel logic
 
  const itemsToShow =len;

  const handleImageClick = (img) => {
    setSelectedImage(img);
  };
  
  const moveCarousel = (direction) => {
    setCurrentIndex((prevIndex) => (prevIndex + direction + images.length) % images.length);
  };

  /*useEffect(() => {
    const intervalId = setInterval(() => {
      setSelectedImage(images[(currentIndex + 1) % images.length].img);
    }, 20000); // Change image every 20 seconds
    return () => clearInterval(intervalId);
  }, [currentIndex]);
*/
  const populateCarousel = () => {
    const items = [];
    for (let i = currentIndex; i < currentIndex + itemsToShow; i++) {
      const image = images[i % images.length];
      items.push(
        <img
          key={image.img}
          src={`http://localhost:5000/upload/${image.img}`}
          alt={image.img}
          className="carousel-item"
          onClick={() => handleImageClick(image.img)}
        />
      );
    }
    return items;
  };

  return (
  
    <div className="house">
      <h1 style={{ textAlign: 'center' }}>Your Dream Home</h1>
      <div className="big">
        <div className="big-image-container">
          <img
            id="selectedImage"
            src={`http://localhost:5000/upload/${selectedImage}`}
            alt="Selected Home"
          />
        </div>
        <div>
          <p className="detail">
           { !Array.isArray(Data) || Data.length === 0 
  ? 'Modern 3BHK House: <br />Spacious Living, Gourmet Kitchen, Elegant Bathrooms, Master Suite, Home Office, Utility Room, Landscaped Garden, Secure Parking'
  : `${Data[0].name} ${Data[0].specifications}`
}
          </p>
          <br />
          <h2>&#8377; { !Array.isArray(Data) || Data.length === 0 ?'not available': Data[0].cost
          }</h2>
          <br />
          <p className="ver"> Verified&#10003;</p>
          <p style={{ fontWeight: 600 ,padding:'10px'}}>
        
          
            Inclusive of all taxes<br />
            EMI starts at ₹1,00,000 per month.
          </p>
          <h2 style={{color:'red'}}>Contact:</h2>
          <p style={{fontSize:'20px'}}> Agent: v.charan </p>
          <p style={{fontSize:'20px'}}>Phone: +919784636538</p>
        </div>
      </div>

      {/* Carousel */}
      <div className="carousel-container">
        <button
          className="carousel-button prev"
          onClick={() => moveCarousel(-1)}
        >
          &#10094;
        </button>
        <div className="carousel" id="imageGallery">
          {len ? populateCarousel():'no images available'}
        </div>
        <button
          className="carousel-button next"
          onClick={() => moveCarousel(1)}
        >
          &#10095;
        </button>
      </div>

      {/* Address and Details */}
     {!Array.isArray(Data) || Data.length === 0 ?'no data available' : <div className="address">
        <h2>More Details:</h2>
        <div className="moredetail">
           <div className="add">
            <h3>Address:)</h3>
            <h4>Pin:{Data[0].pin}</h4>
            <h4>Road No: 05</h4>
            <h4>Street: {Data[0].street}</h4>
            <h4>Village: {Data[0].street}</h4>
            <h4>City: {Data[0].city}</h4>
            <h4>State: {Data[0].state}</h4>
          </div>
          <div className="des">
            <h3>Details:)</h3>
            <ol>
              <li><strong>Spacious Living Area: </strong>Open-plan design with abundant natural light, perfect for family gatherings.</li>
              <li><strong>Gourmet Kitchen: </strong>Fully equipped with high-end appliances, ample storage, and sleek countertops.</li>
              <li><strong>Elegant Bathrooms: </strong> Modern fittings, walk-in showers, and luxurious fixtures for ultimate comfort.</li>
              <li><strong>Master Suite: </strong>Private, expansive room with built-in wardrobes and an en-suite bathroom for added luxury.</li>
              <li><strong>Landscaped Garden & Secure Parking: </strong>Beautiful outdoor space and dedicated parking area for multiple vehicles.</li>
            </ol>
          </div>
        </div>
      </div>
      
      }

      {/* Furnishing Details */}
      <section className="how-it-works">
        <div className="container">
          <h2>Semifurnished:)</h2>
          <h3>Furnishing Details</h3>
          <div className="steps">
            <div className="step">
              <div className="icon"><IonIcon icon={waterOutline} /></div>
              <div className="text">Water Tank</div>
            </div>
            <div className="step">
              <div className="icon">🗄️</div>
              <div className="text">3 Wardrobe</div>
            </div>
            <div className="step">
              <div className="icon"><IonIcon icon={bedOutline} /></div>
              <div className="text">3 Bed</div>
            </div>
            <div className="step">
              <div className="icon"><IonIcon icon={bulbOutline} /></div>
              <div className="text">6 Light</div>
            </div>
          </div>
          <div className="steps">
            <div className="step">
              <div className="icon"><IonIcon icon={carSportOutline} /></div>
              <div className="text">Car Parking</div>
            </div>
            <div className="step">
              <div className="icon"><IonIcon icon={barbellOutline} /></div>
              <div className="text">GYM</div>
            </div>
            <div className="step">
              <div className="icon"><IonIcon icon={rainyOutline }/></div>
              <div className="text">Rain Water Harvesting</div>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="testimonials">
        <div className="container">
          <h2>What Our Clients Say</h2>
          <div className="testimonial">
            <p>"The best real estate service I’ve ever used!"</p>
            <p><strong>4.5</strong><strong style={{ color: 'rgb(207, 161, 10)' }}>
              <IonIcon icon={star} /><IonIcon icon={star} /><IonIcon icon={star} /><IonIcon icon={star} /><IonIcon icon={starHalf} />
            </strong></p>
            <p><strong>-Disha Patani</strong></p>
 <IonIcon icon={starOutline} />         </div>
          <div className="testimonial">
            <p>"Highly recommend. Professional and efficient."</p>
            <p><strong>4.0</strong><strong style={{ color: 'rgb(207, 161, 10)' }}>
             <IonIcon icon={star} /><IonIcon icon={star} /><IonIcon icon={star} /><IonIcon icon={star} /><IonIcon icon={starOutline} />
            </strong></p>
            <p><strong>-Priyanka Mohan</strong></p>
          </div>
        </div>
      </section>
    </div>
  );
};

export default HouseSelection;






