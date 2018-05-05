import React, { Component } from 'react';
import { connect } from 'react-redux'
import { Redirect } from "react-router-dom";
import * as actions from '../actions/index';
import Summary from './Summary';
import MyPools from './MyPools';
import Friends from './Friends';
import Messages from './Messages';

class Dashboard extends Component {
	state = { section: 'summary' };

	handleSection = () => {
		switch (this.state.section) {
			case 'summary':
				return (
					<Summary />
				)
			case 'myPools':
				return (
					<MyPools />
				)
			case 'friends':
				return (
					<Friends />
				)
			case 'messages':
				return (
					<Messages />
				)
			default:
				return <p>ERROR</p>;
		}
	}

	isActive = button => {
		if(this.state.section === button){
			return {color: 'skyblue'}
		}
		return
	}

	render() {
		if (!this.props.auth.user){return <Redirect to="/" />};
		return <div className="section1" id="dash">
        <div className="sub-nav">
					<button
						className="sub-button"
						style={this.isActive('summary')}
						onClick={() => this.setState({ section: 'summary'})}
					>Summary</button>
					<button
						className="sub-button"
						style={this.isActive('myPools')}
						onClick={() => this.setState({ section: 'myPools'})}
					>My pools</button>
					<button
						className="sub-button"
						style={this.isActive('friends')}
						onClick={() => this.setState({ section: 'friends'})}
					>Friends</button>
					<button
						className="sub-button"
						style={this.isActive('messages')}
						onClick={() => this.setState({ section: 'messages'})}
					>Messages</button>
				</div>
				{this.handleSection()}
      </div>;
	}
}

const mstp = (state) => {
	return { auth: state.auth }
}

export default connect(mstp, actions)(Dashboard);
