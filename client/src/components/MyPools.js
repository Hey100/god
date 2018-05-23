import React, { Component } from 'react';
import { connect } from 'react-redux';
import moment from 'moment';
import { Link } from 'react-router-dom';

import './styles/global.css';
import './styles/loader.css';
import './styles/mypools.css';
import './styles/media.css';
import * as actions from '../actions/index';

class MyPools extends Component {
  componentDidMount() {
    const header = {
      headers: { Authorization: localStorage.getItem('token') }
    };
    this.props.fetchMyPools(header);
	}
	parse = num => {
		return parseFloat(num).toLocaleString('USD', {
			style: 'currency',
			currency: 'USD',
			minimumFractionDigits: 0,
			maximumFractionDigits: 0
		});
	};
  handlePools() {
    if (this.props.pools && !this.props.pools[0]) {
      return <h1 className="text-1">You are not part of any pool yet...</h1>;
    }
    if (this.props.pools && this.props.auth.user) {
      return this.props.pools.reverse().map(pool => {
        const endDate = moment(pool.startDate)
          .add(pool.numOfContributors, 'months')
				const now = moment();
				const status = endDate < now ? "Finished" : moment(pool.startDate) < now ? "Active" : "Pending"
        return (
          <Link className="my__card" key={pool._id} to={`/pools/${pool._id}`}>
            <div
              className="my__thumb"
              style={{ backgroundImage: `url(${pool.poolPic})` }}
            />
            <div className="my__content">
              <h2>{pool.title}</h2>
              <div>
                <h2>{pool.numOfContributors} conts.</h2>
                <h2>{this.parse(pool.amount)}</h2>
                <h2>Start Date: {moment(pool.startDate).format('L')}</h2>
								<h2>End Date:{endDate.format('L')}</h2>
                <h2>Status: {status}</h2>
              </div>
            </div>
          </Link>
        );
      });
    }
    return (
      <div className="jumper">
        <div />
        <div />
        <div />
      </div>
    );
  }

  render() {
    return (
      <div className="tab">
        <h1 className="tab-title">My Pools</h1>
        <div className="tab-box">{this.handlePools()}</div>
      </div>
    );
  }
}

const mstp = state => {
  return { pools: state.pools.myPools, auth: state.auth };
};

export default connect(mstp, actions)(MyPools);
