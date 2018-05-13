import React, { Component } from "react";
import axios from "axios";
import _ from "lodash";

import "./styles/messages.css";
import "./styles/global.css";
import "./styles/media.css";

class Messages extends Component {
  state = { friends: null, error: null, input: null };

  componentDidMount() {
    axios
      .get("https://randomuser.me/api/?results=10")
      .then(response => {
        this.setState({ friends: response.data.results });
      })
      .catch(error => {
        this.setState({ error });
      });
  }

  first(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
  }

  updateValue = input => {
    this.setState({ input });
  };

  handleMessages = () => {
    if (this.state.error) {
      return (
        <div className="message__tab-box">
          <h1 className="text-1">There was an error try again...</h1>
        </div>
      );
    }
    if (!this.state.friends) {
      return (
        <div className="message__tab-box">
          <h1 className="text-1">Messges Loading...</h1>
        </div>
      );
    }
    return (
      <div className="message__tab-box">
        <div className="message__list">
          {_.map(this.state.friends, friend => {
            return (
              <div className="message__list-item" onClick={() => {}}>
                <img
                  className="message__thumb"
                  src={friend.picture.thumbnail}
                  alt=""
                />
                <h1 className="text-2">{this.first(friend.name.first)}</h1>
              </div>
            );
          })}
        </div>
        <div className="message__box">
          <div className="message__chat-container" />
          <form className="message__chat-form">
            <input
              type="text"
              className="message__chat-input"
              value={this.state.input}
              onTextChange={newVal => this.updateValue(newVal)}
              placeholder="send a message..."
            />
            <button className="message__chat-button" type="suybmit">
              SEND
            </button>
          </form>
        </div>
      </div>
    );
  };

  render() {
    return (
      <div className="tab">
        <h1 className="tab-title">Messages</h1>
        {this.handleMessages()}
      </div>
    );
  }
}

export default Messages;
