import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as actions from '../actions/index';
import Chart from '../components/Chart';
import moment from 'moment';

class PoolDetail extends Component {
  componentDidMount() {
    this.props.fetchPool(this.props.match.params.id);
  }
  componentWillUnmount() {
    this.props.reset();
  }

  render() {
    const { pools } = this.props;
    if (!pools.pool || !pools.chart) {
			return <p>Loading...</p>;
    }
		const date = moment(pools.pool.date).calendar();
    return (
      <div>
        <h1 className="text-1">Title: {pools.pool.title}</h1>
        <h5>Start Date: {date}</h5>
        <Chart
          chart={pools.chart}
          user={this.props.auth.user}
          params={this.props.match.params.id}
        />
				<div>
				<p>Leave a comment</p>
				<textarea name="" id="" cols="30" rows="10"></textarea>
				</div>
      </div>
    );
  }
}

const mstp = ({ pools, auth }) => {
  return { pools, auth };
};

export default connect(mstp, actions)(PoolDetail);
