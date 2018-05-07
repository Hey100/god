import React,{ Component } from 'react';
import axios from "axios";
import _ from "lodash";

class Messages extends Component {
	state = { friends: null, error: null, input: null };
	

  componentDidMount() {
    axios.get("https://randomuser.me/api/?results=10")
      .then(response => {
        console.log(response.data);
        this.setState({ friends: response.data.results });
      })
      .catch(error => {
        this.setState({ error });
      });
  }

  first(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
	}

	updateValue = (input) => {
		this.setState({ input });
	}
	
  render() {
		if (this.state.error) {
			return <div className="tab">
				<h1 className="text-1">there was an error! try again</h1>
			</div>;
		}
		if (!this.state.friends) {
			return <div className="tab">
				<h1 className="text-1">LOADING...</h1>
			</div>;
		}
    return (
			
      <div className="tab" style={{ padding: "0" }}>
        <div className="msg-left">
					{
						_.map(this.state.friends, friend => {
							return (
								<div className="msglst-item">
									<img className="user-thumb" src={friend.picture.thumbnail} alt="" />
									<h1 className="text-2">{this.first(friend.name.first)}</h1>
									<button className="profile-button">MESSAGE</button>
								</div>
							);
						})
					}
				</div>
        <div className="msg-right">
					<div className="chat-container"></div>
					<form className="chat-form">
						<input
							type="text"
							className="chat-input"
							value={this.state.input}
							onTextChange={(newVal) => this.updateValue(newVal)}
							placeholder="send a message..."
						/>
						<button className="chat-button" type="suybmit">SEND</button>
					</form>
				</div>
      </div>
    );
  }
}

export default Messages;