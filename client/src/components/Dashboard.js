import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import { HomeIcon, ChartGanttIcon, BankIcon, AccountMultipleIcon, ForumIcon } from "mdi-react";

import "./styles/media.css";
import "./styles/dashboard.css";
import "./styles/global.css";
import * as actions from '../actions/index';
import Summary from './Summary';
import MyPools from './MyPools';
import Friends from './Friends';
import Messages from './Messages';
import Banking from './Banking';

class Dashboard extends Component {
  state = { section: "summary" };

  componentDidMount() {
    if (this.props.pool.chart) {
      this.props.reset();
    }
  }

  handleSection = () => {
    switch (this.state.section) {
      case "summary":
        return <Summary history={this.props.history} />;
      case "myPools":
        return <MyPools />;
      case "bank":
				return <Banking />;  
			case "friends":
				return <Friends />;
      case "messages":
        return <Messages />;
      default:
        return <p>ERROR</p>;
    }
  };

  isActiveIcon = button => {
    if (this.state.section === button) {
			return "#00868B";
		}
		return "#DDD";
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
            onClick={() => this.setState({ section: "summary" })}
          >
            <HomeIcon size={44} color={this.isActiveIcon("summary")} />
          </button>
          <button
            className="dash__button"
            onClick={() => this.setState({ section: "myPools" })}
          >
            <ChartGanttIcon size={44} color={this.isActiveIcon("myPools")} />
          </button>
          <button
            className="dash__button"
            onClick={() => this.setState({ section: "bank" })}
          >
            <BankIcon size={44} color={this.isActiveIcon("bank")} />
          </button>
          <button
            className="dash__button"
            onClick={() => this.setState({ section: "friends" })}
          >
            <AccountMultipleIcon
              size={44}
              color={this.isActiveIcon("friends")}
            />
          </button>
          <button
            className="dash__button"
            onClick={() => this.setState({ section: "messages" })}
          >
            <ForumIcon size={44} color={this.isActiveIcon("messages")} />
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
