import React, { Component } from 'react';

import "./styles/landing.css";
import "./styles/global.css";
import "./styles/media.css";

class Landing extends Component {
	render() {
		return (
			<div>
				{/* TOP */}
				<div className="land__col">
					<div className="land__half">
						<h1 className="text-1">Welcome to Collective Capital</h1>
						<h2 className="text-2">
							Zombie ipsum reversus ab viral inferno, nam rick grimes malum
							cerebro. De carne lumbering animata corpora quaeritis.
						</h2>
						<button type="button" className="big-btn">
							JOIN
						</button>
					</div>
					<div className="land__half">
						<img src="https://i.imgur.com/gLUEreC.png" alt="" />
					</div>
				</div>
				{/* BODY */}
				<div>
					<div className="land__col">
						<div className="land__half">
							<h2 className="text-1">Structured Savings Plan</h2>
							<p className="text-2">
								Zombie ipsum reversus ab viral inferno, nam rick grimes malum
								cerebro. De carne lumbering animata corpora quaeritis. Summus
								brains sit​​, morbo vel maleficia? De apocalypsi gorger omero
								undead survivor dictum mauris.
							</p>
						</div>
						<div className="land__half">
							<img src="https://i.imgur.com/7CglwrT.png" alt="" />
						</div>
					</div>

					<div className="land__col-r">
						<div className="land__half">
							<img src="https://i.imgur.com/ehjraf0.png" alt="" />
						</div>
						<div className="land__half">
							<h2 className="text-1">Build Credit and Develop Your Projects</h2>
							<p className="text-2">
								Zombie ipsum reversus ab viral inferno, nam rick grimes malum
								cerebro. De carne lumbering animata corpora quaeritis. Summus
								brains sit​​, morbo vel maleficia? De apocalypsi gorger omero
								undead survivor dictum mauris.
							</p>
						</div>
					</div>

					<div className="land__col">
						<div className="land__half">
							<h2 className="text-1">
								Join a community of financially trustworthy users
							</h2>
							<p className="text-2">
								Zombie ipsum reversus ab viral inferno, nam rick grimes malum
								cerebro. De carne lumbering animata corpora quaeritis. Summus
								brains sit​​, morbo vel maleficia? De apocalypsi gorger omero
								undead survivor dictum mauris.
							</p>
						</div>
						<div className="land__half">
							<img src="https://i.imgur.com/NEoy58l.png" alt="" />
						</div>
					</div>

				</div>
			</div>
		);
	}
}

export default Landing;
