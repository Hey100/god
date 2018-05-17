import React,{ Component } from 'react';

import "./styles/loader.css";
import "./styles/global.css";
import "./styles/media.css";

class Friends extends Component {
	state = { loading: true};

	componentDidMount() {
		setTimeout(() => {
			this.setState({ loading: false })
		}, 2000);
	}

	render() {
		if(this.state.loading){
			return(
				<div className="tab">
					<h1 className="tab-title">
						Banking Information
						</h1>
					<div className="tab-box">
						<div className="jumper">
							<div></div>
							<div></div>
							<div></div>
						</div>
					</div>
				</div>
			);
		}
		return (
			<div className="tab">
				<h1 className="tab-title">
					Banking Information
						</h1>
				<div className="tab-box">
					<h1 className="text-1">
						No Information has been added yet...
					</h1>
				</div>
			</div>
		);
	}
}
export default Friends;