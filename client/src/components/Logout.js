import React, { Component } from 'react';
import * as actions from '../actions'
import { connect } from 'react-redux'

class Logout extends Component {
	componentDidMount() {
		this.props.onLogOut()
	}
	
	render() {
		return (
			<div>
				You have been successfully logged out.
			</div>
		);
	}
}

export default connect(null, actions)(Logout);
