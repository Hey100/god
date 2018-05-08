import React, { Component } from 'react';
import { connect } from 'react-redux'

import "./styles/global.css";
import "./styles/media.css";
import * as actions from '../actions'

class Logout extends Component {
	componentDidMount() {
		this.props.onLogOut()
	}
	
	render() {
		return (
			<div className="tab">
				<h1 className="text-1">You have been successfully logged out.</h1>
			</div>
		);
	}
}

export default connect(null, actions)(Logout);
