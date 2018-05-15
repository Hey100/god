import React, { Component } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";

import * as actions from "../actions";
import './styles/header.css';
import './styles/global.css';
import './styles/media.css';

class Header extends Component {
	state = { menu: false };

  // renderProfile = () => {
  //   if (this.props.auth.user) {
  //     const { first_name, last_name } = this.props.auth.user;
  //     const name = first_name + " " + last_name.charAt(0) + ".";
  //     return (
  //       <Link to="/dashboard">
  //         <span className="glyphicon glyphicon-user" /> {name}
  //       </Link>
  //     );
  //   }
  //   return null;
	// };
	
	toggleMenu = () => {
		this.setState({ menu: !this.state.menu });
	}

 render() {
    const loginStatus = this.props.auth.user;
    const button = !loginStatus ? (
      <Link className="head__nav-button" to={"/signin"}>
        Sign In
      </Link>
    ) : (
      [
        <Link key={1} className="head__nav-button" to={"/dashboard"}>
          My Profile
        </Link>,
        <Link key={2} className="head__nav-button" to={"/logout"}>
          Logout
        </Link>
      ]
    );
    return <div className="head__nav">
        {loginStatus ? <Link id="title" to={"/dashboard"}>
            CommunityCapital
          </Link> : <Link id="title" to={"/"}>
            CommunityCapital
          </Link>}
        <div className="head__nav-right">
          <Link className="head__nav-button" to={"/pools"}>
            All Pools
          </Link>
          <Link className="head__nav-button" to={"/create"}>
            Start a pool
          </Link>
					{button}
        </div>
      </div>;
  }
}

const mstp = state => {
  return { auth: state.auth };
};

export default connect(mstp, actions)(Header);