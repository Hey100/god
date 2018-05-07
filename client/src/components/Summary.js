import React from 'react';
import { Doughnut } from 'react-chartjs-2';

const Summary = () => {
	
	let data = { 
		labels: ['Spent', 'Remaining'],
		datasets: [{ 
			data: [600, 400],
			backgroundColor: ['#72E5BE', '#FAFAFA'],
			borderColor: ['transparent', 'transparent']
		}]
	},
	options = { 
		cutoutPercentage: 70,
		responsive: true,
		animation: { animateRotate: true },
		legend: { display: false },
		title: { display: true, position: 'bottom', text: 'Usage: 60%', fontSize: 40, fontStyle: 'lighter' }
	};

	return <div className="tab">
			<div className="sumary-card" id="sc1">
				<h2 className="text-1">Your CC Score:</h2>
				<h1 className="big-btn">80</h1>
			</div>
			<div className="sumary-card" id="sc2">
				<div className="canvas-wrap">
					<Doughnut data={data} options={options} height="300px" />
				</div>
				<div className="info">
					<h2 className="text-2">TOTAL ALLOWED: $7,000</h2>
					<h2 className="text-2">TOTAL USED: $4,564</h2>
					<hr />
					<h2 className="text-2">TOTAL LEFT: $2,436</h2>
				</div>
			</div>
		</div>;
}

export default Summary;