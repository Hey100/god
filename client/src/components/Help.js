import React, { Component } from "react";
import './help.css';

class Help extends Component {
	render(){
		return <div className="container">
        <div className="help__header">
          <h1>How can we help you?</h1>
          <form>
            <input type="text" placeholder="Type keywords to find answers" className="help__input" />
          </form>
          <h3>
            You can also browse the topics below to find what you are
            looking for.
          </h3>
        </div>
        <div className="help__questions">
          <h2>Frequently Asked Questions</h2>
          <div className="help__card-wrap">
            <div className="help__card">
              <h3 className="help__card-title">General</h3>
              <ul className="help__list">
                <li className="help__list-item">dshjkfklsdj</li>
                <li className="help__list-item">dshjkfklsdj</li>
                <li className="help__list-item">dshjkfklsdj</li>
                <li className="help__list-item">dshjkfklsdj</li>
              </ul>
            </div>
            <div className="help__card">
              <h3 className="help__card-title">Security</h3>
              <ul className="help__list">
                <li className="help__list-item">dshjkfklsdj</li>
                <li className="help__list-item">dshjkfklsdj</li>
                <li className="help__list-item">dshjkfklsdj</li>
                <li className="help__list-item">dshjkfklsdj</li>
              </ul>
            </div>
            <div className="help__card">
              <h3 className="help__card-title">Web</h3>
              <ul className="help__list">
                <li className="help__list-item">dshjkfklsdj</li>
                <li className="help__list-item">dshjkfklsdj</li>
                <li className="help__list-item">dshjkfklsdj</li>
                <li className="help__list-item">dshjkfklsdj</li>
              </ul>
            </div>
            <div className="help__card">
              <h3 className="help__card-title">Business</h3>
              <ul className="help__list">
                <li className="help__list-item">dshjkfklsdj</li>
                <li className="help__list-item">dshjkfklsdj</li>
                <li className="help__list-item">dshjkfklsdj</li>
                <li className="help__list-item">dshjkfklsdj</li>
              </ul>
            </div>
            <div className="help__card">
              <h3 className="help__card-title">Users</h3>
              <ul className="help__list">
                <li className="help__list-item">dshjkfklsdj</li>
                <li className="help__list-item">dshjkfklsdj</li>
                <li className="help__list-item">dshjkfklsdj</li>
                <li className="help__list-item">dshjkfklsdj</li>
              </ul>
            </div>
            <div className="help__card">
              <h3 className="help__card-title">Legal</h3>
              <ul className="help__list">
                <li className="help__list-item">dshjkfklsdj</li>
                <li className="help__list-item">dshjkfklsdj</li>
                <li className="help__list-item">dshjkfklsdj</li>
                <li className="help__list-item">dshjkfklsdj</li>
              </ul>
            </div>
            <div className="help__card">
              <h3 className="help__card-title">Users</h3>
              <ul className="help__list">
                <li className="help__list-item">dshjkfklsdj</li>
                <li className="help__list-item">dshjkfklsdj</li>
                <li className="help__list-item">dshjkfklsdj</li>
                <li className="help__list-item">dshjkfklsdj</li>
              </ul>
            </div>
            <div className="help__card">
              <h3 className="help__card-title">Legal</h3>
              <ul className="help__list">
                <li className="help__list-item">dshjkfklsdj</li>
                <li className="help__list-item">dshjkfklsdj</li>
                <li className="help__list-item">dshjkfklsdj</li>
                <li className="help__list-item">dshjkfklsdj</li>
              </ul>
            </div>
          </div>
        </div>
      </div>;
	}
}

export default Help;
