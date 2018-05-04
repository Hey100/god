import React, { Component } from 'react';
import Welcome from "./Welcome";
import Questions from "./Questions";

class Landing extends Component {
	render() {
		return (
			<div>
				<Welcome />
				<Questions className="section3"/>
			</div>
		);
	}
}

export default Landing;
