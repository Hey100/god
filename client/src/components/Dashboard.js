import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';

import "./styles/dashboard.css";
import "./styles/global.css";
import "./styles/media.css";
import * as actions from '../actions/index';
import Summary from './Summary';
import MyPools from './MyPools';
import Friends from './Friends';
import Messages from './Messages';

class Dashboard extends Component {
  state = { section: 'summary' };

  componentDidMount() {
    if (this.props.pool.chart) {
      this.props.reset();
    }
  }

  handleSection = () => {
    switch (this.state.section) {
      case 'summary':
        return <Summary history={this.props.history} />;
      case 'myPools':
        return <MyPools />;
      case 'bank':
        return (
          <div className="tab">
            <h1 className="text-1">BANK INFO</h1>
          </div>
        );
      case 'friends':
        return <Friends />;
      case 'messages':
        return <Messages />;
      default:
        return <p>ERROR</p>;
    }
  };

  isActive = button => {
    if (this.state.section === button) {
      return { color: 'skyblue' };
    }
    return;
  };

  render() {
    if (!this.props.auth.user) {
      return <Redirect to="/" />;
    }
    return (
      <div className="dash__container">
        <div className="dash__nav">
          <button
            className="dash__button"
            style={this.isActive('summary')}
            onClick={() => this.setState({ section: 'summary' })}
					>Summary
          </button>
          <button
            className="dash__button"
            style={this.isActive('myPools')}
            onClick={() => this.setState({ section: 'myPools' })}
					>My pools
          </button>
          <button
            className="dash__button"
            style={this.isActive('bank')}
            onClick={() => this.setState({ section: 'bank' })}
					>Bank Info
          </button>
          <button
            className="dash__button"
            style={this.isActive('friends')}
            onClick={() => this.setState({ section: 'friends' })}
					>Friends
          </button>
          <button
            className="dash__button"
            style={this.isActive('messages')}
            onClick={() => this.setState({ section: 'messages' })}
					>Messages
          </button>
        </div>
        {this.handleSection()}
      </div>
    );
  }
}

const mstp = state => {
  return { auth: state.auth, pool: state.pools };
};

export default connect(mstp, actions)(Dashboard);
