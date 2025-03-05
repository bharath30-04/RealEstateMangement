import React,{useState,useEffect} from 'react';
import Cards from "./../cards/cards";
import axios from 'axios';
import {Link} from 'react-router-dom';
import "./search.css";
/*arr=[{"id":"1","village":"nellore","img":"v1.jpeg","cost":"20,00,000","pin":"524400","mode":"buy"},
		{"id":"2","village":"kadapa","img":"v3.jpg","cost":"25,00,000","pin":"524401","mode":"rent"},
		{"id":"3","village":"tirupati","img":"images.jpeg","cost":"10,00,000","pin":"524402","mode":"buy"},
		{"id":"4","village":"kurnool","img":"images.jpeg","cost":"15,00,000","pin":"524403","mode":"rent"},
		{"id":"4","village":"kurnool","img":"disha.jpg","cost":"15,00,000","pin":"524403","mode":"buy"}];
*/


function Search()
{	const [state,setstate]=useState("");
	const [pin,setpin]=useState([]);
	const [active,setactive]=useState('');	
	const [filter,dofilter]=useState([]);
	
	const [Data,setData]=useState([]);
	
	useEffect(() => {
        axios.get('http://localhost:5000/search')
            .then(response => {
                setData((response.data));

            })
            .catch(error => {
                console.error('Error fetching data:', error);
            });
    }, []);
	console.log(Data[0]);
	const arr=Data;
	
	function change(event)
	{	setstate(event.target.value);
		console.log(state);
		
	}

    
	function Test()
	{	//arr.map((i)=>{console.log(i.pin)})
		console.log(state)
		console.log("arr:",arr);
		 const filteredPins = arr.filter(i => state === i.pin);
        setpin(filteredPins);
        filteredProperties();
        dofilter(filteredPins);
		setstate("");

		
		/*arr.filter((i)=>{ 
		if(state==i.pin) 
		{	setpin((pre)=>{ return [...pre,i]});
			setstate("");
		}
		
			
		})*/
		
		//console.log(pin);
		
			
	}
    const filteredProperties=async()=>{
        const filtered = pin.filter(i=>i.mode=== active);
            console.log({filtered});
            dofilter(filtered);
            console.log("useEffect");
    }
	useEffect(()=>{
	const filtered = pin.filter(i=>i.mode=== active);
        console.log({filtered});
        dofilter(filtered);
        console.log("useEffect");
	},[active]); 
	
	



	
	function handle(button)
	{	
		
	setactive(button);
	}	
	
	function Button(props) {
		const isActive = active === props.mode;
		const buttonStyle = isActive 
			? { backgroundColor: '#343a40', color: 'white' } 
			: { backgroundColor: 'white', color: 'black' };
	
		return (
			<input 
				type="button" 
				value={props.mode} 
				className="button" 
				style={buttonStyle} 
				onClick={() => handle(props.mode)} 
			/>
		);
		
	
	}
	

	return(
	<div className="search">
		<div className="video-background">
        <video autoPlay width="100%" height="100%" >
            <source src="http://localhost:5000/upload/real.mp4" type="video/mp4" />
        </video>
    	</div>

    	<div className="hero">
    
        	<div className="hero-content">
            	<h2>Find Your Dream Home</h2>
            	<p>Explore the best properties available in your area.</p>
            
            	<div className="search-bar">
               		 <input type="text" placeholder="PIN code" name="search" value={state} onChange={change}/>
                <Link to="/search">	<button onClick={Test}>Search</button></Link>
           		 </div>
            
        	</div>
    	</div>

        <div>
			 	<div className="option">
            	
				<h1>Featured Listings</h1>
				<div>
				
            	<Button mode='sale' />
				<Button mode='rent' />
				</div>
				</div>
   		 <Cards data={filter} />
	</div>
    
	</div>
	);
}

export default Search; 



/*import React, { useState, useEffect } from 'react';
import Cards from './../cards/cards';
import axios from 'axios';
import { Link } from 'react-router-dom';
import './search.css';

function Search() {
    const [state, setstate] = useState(''); // PIN code input value
    const [pin, setpin] = useState([]); // Filtered results by PIN
    const [active, setactive] = useState(''); // Active mode (sale/rent)
    const [filter, dofilter] = useState([]); // Filtered results by active mode
    const [Data, setData] = useState([]); // Fetched data

    // Fetch data on component mount
    useEffect(() => {
        axios
            .get('http://localhost:5000/search')
            .then((response) => {
                setData(response.data || []); // Ensure data is an array
            })
            .catch((error) => {
                console.error('Error fetching data:', error);
            });
    }, []);

    // Handle input change for the PIN code search
    function change(event) {
        setstate(event.target.value);
    }

    // Filter data by PIN code
    function Test() {
        if (!Array.isArray(Data)) return; // Ensure Data is valid
        const filteredPins = Data.filter((item) => state === item.pin); // Match entered PIN
        setpin(filteredPins); // Update filtered PIN results
        dofilter(filteredPins); // Set the same filtered results for the cards
        setstate(''); // Clear input
    }

    // Update the filter when the active mode changes
    useEffect(() => {
        if (Array.isArray(pin)) {
            const filtered = pin.filter((item) => item.mode === active);
            dofilter(filtered);
        }
    }, [active, pin]);

    // Handle mode button click
    function handle(button) {
        setactive(button);
    }

    // Button component to handle mode selection
    function Button({ mode }) {
        const isActive = active === mode;
        const buttonStyle = isActive
            ? { backgroundColor: '#343a40', color: 'white' }
            : { backgroundColor: 'white', color: 'black' };

        return (
            <input
                type="button"
                value={mode}
                className="button"
                style={buttonStyle}
                onClick={() => handle(mode)}
            />
        );
    }

    return (
        <div className="search">
            <div className="video-background">
                <video autoPlay width="100%" height="100%">
                    <source src="real.mp4" type="video/mp4" />
                </video>
            </div>

            <div className="hero">
                <div className="hero-content">
                    <h2>Find Your Dream Home</h2>
                    <p>Explore the best properties available in your area.</p>

                    <div className="search-bar">
                        <input
                            type="text"
                            placeholder="PIN code"
                            name="search"
                            value={state}
                            onChange={change}
                        />
                        <Link to="/search">
                            <button onClick={Test}>Search</button>
                        </Link>
                    </div>
                </div>
            </div>

            <div>
                <div className="option">
                    <h1>Featured Listings</h1>
                    <div>
                        <Button mode="buy" />
                        <Button mode="rent" />
                    </div>
                </div>
                <Cards filters={filter} />
            </div>
        </div>
    );
}

export default Search;*/

