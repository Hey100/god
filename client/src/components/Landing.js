import React, { Component } from 'react';

class Landing extends Component {
	render() {
		return (
			<div>
				<div>
					<div className="column">
						<div className="half">
							<h1 className="text-1">Welcome to Collective Capital</h1>
							<h2 className="text-2">
								Zombie ipsum reversus ab viral inferno, nam rick grimes malum
								cerebro. De carne lumbering animata corpora quaeritis.
          </h2>
							<button type="button" className="big-btn">
								JOIN
          </button>
						</div>
						<div className="half">
							<img src="https://i.imgur.com/gLUEreC.png" alt="" />
						</div>
					</div>
					<div style={{ backgroundColor: "lightcyan" }}>
						<h1 className="text-1 column">Why Join Us ?</h1>
						<div className="column">
							<div className="half">
								<h2 className="text-1">Structured Savings Plan</h2>
								<p className="text-2">
									Zombie ipsum reversus ab viral inferno, nam rick grimes malum
									cerebro. De carne lumbering animata corpora quaeritis. Summus
									brains sit​​, morbo vel maleficia? De apocalypsi gorger omero
									undead survivor dictum mauris.
            </p>
							</div>
							<div className="half">
								<img src="https://i.imgur.com/7CglwrT.png" alt="" />
							</div>
						</div>

						<div className="column-r">
							<div className="half">
								<img src="https://i.imgur.com/ehjraf0.png" alt="" />
							</div>
							<div className="half">
								<h2 className="text-1">Build Credit and Develop Your Projects</h2>
								<p className="text-2">
									Zombie ipsum reversus ab viral inferno, nam rick grimes malum
									cerebro. De carne lumbering animata corpora quaeritis. Summus
									brains sit​​, morbo vel maleficia? De apocalypsi gorger omero
									undead survivor dictum mauris.
            </p>
							</div>
						</div>

						<div className="column">
							<div className="half">
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
							<div className="half">
								<img src="https://i.imgur.com/NEoy58l.png" alt="" />
							</div>
						</div>
					</div>
				</div>
			</div>
		);
	}
}

export default Landing;
