import React, { Component } from 'react';
import * as actions from '../actions'
import { connect } from 'react-redux'

class Logout extends Component {
	componentDidMount() {
		this.props.onLogOut()
	}
	
	render() {
		return (
			<div className="section1 sign">
				<h1 className="text-1">You have been successfully logged out.</h1>
			</div>
		);
	}
}

export default connect(null, actions)(Logout);
