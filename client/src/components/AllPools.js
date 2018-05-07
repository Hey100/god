import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as actions from '../actions/index';
import { Link } from 'react-router-dom';

class AllPools extends Component {
  componentDidMount() {
    this.props.fetchAllPools();
  }

  render() {
    const { allPools } = this.props.pools;
    if (!allPools) {
      return <p>LOADING...</p>;
    }
    return allPools.map(pool => {
      return (
				<div key={pool._id} className="form-sec">
          <h1>{pool.title}</h1>
          <Link to={`pools/${pool._id}`}>View</Link>
        </div>
      );
    });
  }
}

const mstp = ({ pools }) => {
  return { pools };
};
export default connect(mstp, actions)(AllPools);
