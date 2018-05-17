import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom'

import "./styles/global.css";
import "./styles/loader.css";
import "./styles/mypools.css";
import "./styles/media.css";
import * as actions from '../actions/index';

class MyPools extends Component {
  componentDidMount() {
		this.props.fetchMyPools();
  }
  handlePools() {
		if (this.props.pools && !this.props.pools[0]) {
      return <h1 className="text-1">
          You are not part of any pool yet...
        </h1>;
    }
		if (this.props.pools && this.props.auth.user) {
			return this.props.pools.reverse().map(pool => {
				let desc = pool.description;
				let abbr = desc.slice(0,100) + "...";
				return (
					<Link className="my__card" key={pool._id} to={`/pools/${pool._id}`}>
						<div 
							className="my__thumb"
							style={{ backgroundImage: `url(${pool.poolPic})` }}
						></div>
						<div className="my__content">
							<h2>{pool.title}</h2>
							<h2>{abbr}</h2>
							<div>
								<h2>{pool.numOfContributors} conts.</h2>
								<h2>${pool.amount}</h2>
							</div>
						</div>
					</Link>
				);
			});
		}
		return (
			<div className="jumper">
				<div></div>
				<div></div>
				<div></div>
			</div>
		)
  }

  render() {
		return <div className="tab">
			<h1 className="tab-title">
				My Pools
			</h1>
			<div className="tab-box">
				{this.handlePools()}
			</div>
		</div>;
  }
}

const mstp = state => {
  return { pools: state.pools.myPools, auth: state.auth };
};

export default connect(mstp, actions)(MyPools);
