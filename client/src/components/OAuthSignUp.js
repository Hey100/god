import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as actions from '../actions/index';

class OAuthSignUp extends Component {
  componentDidMount() {
		this.props.oAuthSignUp(this.props.history);
  }

  render() {
    return <div />;
  }
}

export default connect(null, actions)(OAuthSignUp);
