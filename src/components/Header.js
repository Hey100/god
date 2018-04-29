import React, { Component } from 'react';
import { MenuIcon } from 'mdi-react';
import "../styles.css";

class Header extends Component {
  render() {
    return <div className="header">
        <div className="nav-left">
          <button type="button" className="button title">
            WEB PAGE
          </button>
        </div>
        <div className="nav-right">
          <button type="button" className="button">
            LINK
          </button>
          <button type="button" className="button">
            LINK
          </button>
          <input type="text" className="input" placeholder="text..." />
        </div>
      </div>;
  }
}

export default Header
