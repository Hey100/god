import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as actions from '../actions/index';
import { Link } from 'react-router-dom'

class MyPools extends Component {
  componentDidMount() {
		this.props.fetchMyPools();
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
      return (
        <div className="card darken-1" key={pool._id}>
          <div className="card-content">
						<Link 
							to={`/pools/${pool._id}`}
						>
							{pool.title}
						</Link>
            <p>{pool.title}</p>
            <p>{pool.category}</p>
            <p>{pool.description}</p>
            <p>{pool.numOfParticipants}</p>
            <p>{pool.rate}</p>
            <p>{this.props.auth.user.first_name}</p>
            <p>{pool.amount}</p>
          </div>
        </div>
      );
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
