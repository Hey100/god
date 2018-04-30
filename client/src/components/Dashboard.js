import React, { Component } from 'react';
import { connect } from 'react-redux'
import * as actions from '../actions/index'

class Dashboard extends Component {

	render() {
		if (this.props.auth.user) {
			const { first_name, last_name, ccScore, mlimit } = this.props.auth.user
			const name = first_name + ' ' + last_name.charAt(0) + '.'
			return (
				<div>
					Hello, {name}, CC Score:{ccScore}, Monthly Limit:{mlimit}
				</div>
			);
		}
		else {
			return (
				<div>
					Profile
				</div>
			)
		}
	}
}

const mstp = (state) => {
	return { auth: state.auth }
}

export default connect(mstp, actions)(Dashboard);
