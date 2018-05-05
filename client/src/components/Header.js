import React, { Component } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import * as actions from "../actions";

class Header extends Component {

  renderProfile = () => {
    if (this.props.auth.user) {
      const { first_name, last_name } = this.props.auth.user;
      const name = first_name + " " + last_name.charAt(0) + ".";
      return (
        <Link to="/dashboard" className="btn btn-info btn-md">
          <span className="glyphicon glyphicon-user" /> {name}
        </Link>
      );
    }
    return null;
  };

 render() {
    const loginStatus = this.props.auth.user;
    const button = !loginStatus ? (
      <Link className="button" to={"/signin"}>
        Sign In
      </Link>
    ) : (
      [
        <Link key={1} className="button" to={"/dashboard"}>
          My Profile
        </Link>,
        <Link key={2} className="button" to={"/logout"}>
          Logout
        </Link>
      ]
    );
    return <div className="header">
        <div className="nav-left">
          {loginStatus ? <Link className="button" id="title" to={"/dashboard"}>
              CommunityCapital
            </Link> : <Link className="button" id="title" to={"/"}>
              CommunityCapital
            </Link>}
        </div>
        <div className="nav-right">
          <Link className="button" to={"/pools"}>
						POOLS
          </Link>
          {button}
          <input type="text" className="input" placeholder="search pools.." />
          {this.renderProfile()}
        </div>
      </div>;
  }
}

const mstp = state => {
  return { auth: state.auth };
};

export default connect(mstp, actions)(Header);