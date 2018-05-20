import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as actions from '../actions/index';

class OAuthSignIn extends Component {
	componentDidMount() {
		this.props.oAuthSignIn(this.props.history);
	}

	render() {
		return <div />;
	}
}

export default connect(null, actions)(OAuthSignIn);
