import React, { Component } from 'react';
import { MenuIcon } from 'mdi-react';
import "../styles.css";

class Header extends Component {
  render() {
    return <div className="header">
        <div className="nav-left">
          <button type="button" className="button" id="title">
            COLLECTIVE CAPITAL
          </button>
        </div>
        <div className="nav-right">
          <button type="button" className="button">
            SIGN IN
          </button>
          <button type="button" className="button">
            START A POOL
          </button>
          <input type="text" className="input" placeholder="search pools.." />
        </div>
      </div>;
  }
}

export default Header
