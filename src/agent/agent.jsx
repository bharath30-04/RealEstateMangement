import React, { useState, useEffect } from 'react';
import './agents.css';
import axios from "axios";
//import upload from './../upload';



//const agentsData = [{},{}];


function AgentsList() {
	const [agents, setagent] = useState([]);


	useEffect(() => {
		axios.get('http://localhost:5000/agent')
			.then(res => { setagent(res.data); })
			.catch((err) => { console.log("error in fetching the data") });
	},
		[]);

	const Agent = ({ agent }) => (
		<div className="agent">
			{console.log(agent.img)}
			<img src={`http://localhost:5000/upload/${agent.img}`} alt="Agent" />
			{agent.id && <h3>ID:{agent.id}</h3>}
			<p className="name">{agent.name}</p>
			<p className="phno">{agent.phone}</p>
			<p className="location">{agent.pin}</p>
		</div>
	);

	const agentsData = agents;

	return (<section className="agnts">
		<div className="con">
			<h2>List of Agents</h2>
			<div className="agents">
				{agentsData.map((agent1, index) =>
				(
					<Agent key={index} agent={agent1} />
				)
				)}
			</div>
		</div>
	</section>
	);
}

export default AgentsList;

