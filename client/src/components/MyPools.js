import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom'

import "./styles/global.css";
import "./styles/media.css";
import * as actions from '../actions/index';

class MyPools extends Component {
  componentDidMount() {
		this.props.fetchMyPools();
  }
  handlePools() {
		if (this.props.pools && this.props.auth.user) {
			if (!this.props.pools[0]) {
				return (
					<h1 className="text-1">
						Your are not part of any pool yet...
					</h1>
				);
			}
			return this.props.pools.reverse().map(pool => {
				return (
					<div className="card" key={pool._id}>
						<Link to={`/pools/${pool._id}`}>
							{pool.title}
						</Link>
						<p>{pool.title}</p>
						<p>{pool.category}</p>
						<p>{pool.description}</p>
						<p>{pool.numOfContributors}</p>
						<p>{pool.rate}</p>
						<p>{this.props.auth.user.first_name}</p>
						<p>{pool.amount}</p>
					</div>
				);
			});
		} else {
			return (
				<h1 className="text-1">Your pools are loading...</h1>
			)
		}
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
