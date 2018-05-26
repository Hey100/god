import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

import * as actions from '../actions';
import './styles/header.css';
import './styles/global.css';
import './styles/media.css';

class Header extends Component {
  state = { menu: false };

  toggleMenu = () => {
    this.setState({ menu: !this.state.menu });
  };

  render() {
    const { user } = this.props.auth;
    const button = !user ? (
      <Link className="head__nav-button" to={'/signin'}>
        Sign In
      </Link>
    ) : (
      <div className="head__dropdown">
        <img
          src={
            user.profilePic ||
            'https://www.acspri.org.au/sites/acspri.org.au/files/profile-placeholder.png'
          }
          className="head__dropbtn"
          alt=""
        />
        <div className="head__dropdown-content">
          <Link className="head__drop-item" to={'/dashboard'}>
            My Dash
          </Link>
          <Link className="head__drop-item" to={'/settings'}>
            Settings
          </Link>
          <Link className="head__drop-item" to={'/logout'}>
            Logout
          </Link>
        </div>
      </div>
    );
    return (
      <div className="head__nav">
        <div className="head__nav-content">
          {
            <Link id="title" className="" to={user ? '/dashboard' : '/'}>
              POOLI
            </Link>
          }
          <div className="head__nav-right">
            <Link className="head__nav-button" to={'/pools'}>
              All Pools
            </Link>
            {user ? (
              <Link className="head__nav-button" to={'/create'}>
                Start a pool
              </Link>
            ) : null}
            {button}
          </div>
        </div>
      </div>
    );
  }
}

const mstp = ({ auth }) => {
  return { auth };
};

export default connect(mstp, actions)(Header);
