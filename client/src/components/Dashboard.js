import React, { Component } from 'react';
import { connect } from 'react-redux'
import { Link } from "react-router-dom";
import * as actions from '../actions/index';
import MyPools from './MyPools';
import AllPools from './AllPools';

class Dashboard extends Component {

	render() {
		if (this.props.auth.user) {
			const { first_name, last_name, ccScore, mlimit } = this.props.auth.user
			const name = first_name + ' ' + last_name.charAt(0) + '.'
			return (
				<div className="section1">
					Hello, {name}, CC Score:{ccScore}, Monthly Limit:{mlimit}
					<Link className="button" to={"/mypools"}>MY POOLS</Link>
					<Link className="button" to={"/pools"}>ALL POOLS</Link>
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
