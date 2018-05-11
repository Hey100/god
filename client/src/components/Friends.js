import React,{ Component } from 'react';
import axios from "axios";
import _ from "lodash";

import "./styles/friends.css";
import "./styles/global.css";
import "./styles/media.css";

class Friends extends Component {
	state = { friends: null, error: null };

	componentDidMount() {
		axios.get("https://randomuser.me/api/?results=5")
			.then(response => {
				this.setState({ friends: response.data.results })
			})
			.catch(error => {
				this.setState({ error });
			});
	}

	first(string) {
		return string.charAt(0).toUpperCase() + string.slice(1);
	}

	render() {
		if (this.state.error) {
			return <div className="tab">
          <h1 className="text-1">there was an error! try again</h1>
        </div>;
		}
		if (!this.state.friends) {
			return <div className="tab">
          <h1 className="text-1">FRIENDS LOADING...</h1>
        </div>;
		}
		return<div className="tab" style={{ flexDirection: 'column', alignItems: 'center' }}>
			<h1 className="text-1" style={{ textAlign: "center" }}>
				FRIENDS
			</h1>
			<div className="results">
				{_.map(this.state.friends, (friend) => {
					return (
						<div className="friend__card" style={{ textAlign: 'center' }}>
							<div
								className="friend__image"
								style={{ backgroundImage: `url(${friend.picture.large})`}}
								alt=""
							/>
							<div className="card-content">
								<h1 className="text-2">{this.first(friend.name.first)}</h1>
								<button className="message-button">MESSAGE</button>
							</div>
						</div>
					)
				})}
			</div>
		</div>;
	}
}
export default Friends;