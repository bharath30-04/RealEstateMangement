import React from 'react';
import House from './../house/house.jsx';
import './cards.css';
//import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
/*cards(id serial primary key,pin varchar(10),location varchar(250),cost int,mode varchar(25),img varchar(250));*/



function Card({data1})
{	const navigate = useNavigate();
	function Details()
	{	console.log("house function");
		//console.log(data1.pin);
		  
	 navigate('/house',{state:{pin:data1?.pin,location:data1?.location,cost:data1?.cost}});
	 }
	 console.log(data1?.id);

	return(
		<div key={data1?.id} className="listing">
			 <img src={`http://localhost:5000/upload/${data1?.img}`} alt="img" style={{cursor:"pointer"}} onClick={Details} />
			<p className="location">{data1?.location}</p>
			<h2>for {data1?.mode}</h2>			
			<p className="price"> &#8377; {data1?.cost}</p>
			
		</div>		
	);
}

function cards({data})
{	//console.log(props.filters);
console.log("cards function");
    if (data.length==0) {
        return <p className="noresults">No results found.</p>;
    }
	return(
	<div className="listings">
	{data.map((data,k)=>{
		return <Card data1={data} />
	})}
	
	
	</div>
);
}

export default cards;
