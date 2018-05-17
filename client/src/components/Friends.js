import React,{ Component } from 'react';
import axios from "axios";
import _ from "lodash";
import { MessageIcon, InformationIcon } from "mdi-react";

import "./styles/friends.css";
import "./styles/loader.css";
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
				<h1 className="tab-title" style={{ textAlign: "center" }}>
					Friends
				</h1>
				<div className="tab-box">
          <h1 className="text-1">There was an error! please try again</h1>
				</div>
			</div>;
		}
		if (!this.state.friends) {
			return <div className="tab">
				<h1 className="tab-title" style={{ textAlign: "center" }}>
					Friends
				</h1>
				<div className="tab-box">
					<div className="jumper">
						<div></div>
						<div></div>
						<div></div>
					</div>
				</div>
			</div>;
		}
		return <div className="tab">
			<h1 className="tab-title" style={{ textAlign: "center" }}>
				Friends
			</h1>
			<div className="tab-box">
				{_.map(this.state.friends, friend => {
					return (
						<div className="friend__card" style={{ textAlign: 'center' }}>
							<div
								className="friend__image"
								style={{ backgroundImage: `url(${friend.picture.large})`}}
								alt=""
							/>
							<h1 className="text-2">{this.first(friend.name.first)}</h1>
							<button className="friend__card-button"><MessageIcon size={44} color="dodgerblue" /></button>
							<button className="friend__card-button"><InformationIcon size={44} color="dodgerblue" /></button>
						</div>
					)
				})}
			</div>
		</div>;
	}
}
export default Friends;