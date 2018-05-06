import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as actions from '../actions/index';

class MyPools extends Component {
  componentDidMount() {
    this.props.fetchPools();
  }
  renderPools() {
		if(!this.props.pools[0]){
			return(
				<div className="tab">
					<h1 className="text-1">You don't have pools yet...</h1>
				</div>
			);
		}
    return this.props.pools.reverse().map(pool => {
      return <div className="card" key={pool._id} onClick={() => alert("card2")}>
					<div
						className="thumbnail"
						style={{
							backgroundImage: "url(http://www.backpaco.com/wp-content/uploads/2015/04/yosemite-waterfall.jpg)"
						}}
						alt=""
					/>
					<div className="card-content">
						<h1>{pool.title}</h1>
						<div className="meter">
							<span style={{ width: '80%' }}></span>
						</div>
						<h3>{pool.description}</h3>
						<h3>{pool.numOfParticipants}</h3>
						<h3>{pool.rate}</h3>
						<h3>{this.props.auth.user.first_name}</h3>
						<h3>{pool.amount}</h3>
					</div>
				</div>
    });
  }

  render() {
    if (this.props.pools && this.props.auth.user) {
      return <div className="tab">{this.renderPools()}</div>;
    } else {
      return <div className="tab">
				<h1 className="text-1">Loading...</h1>
			</div>;
    }
  }
}

const mstp = state => {
  return { pools: state.pools.myPools, auth: state.auth };
};

export default connect(mstp, actions)(MyPools);
