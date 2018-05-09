import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as actions from '../actions/index';
import moment from 'moment';

class AllPools extends Component {
  componentDidMount() {
    this.props.fetchAllPools();
  }

  renderDate = date => {
    let newDate = moment(date).format('L');
    return <h3 key={date}>Start Date: {newDate}</h3>;
  };

  handleClick = id => {
    this.props.history.push(`/pools/${id}`);
  };

  render() {
    const { allPools } = this.props.pools;
    if (!allPools) {
      return <p>LOADING...</p>;
    }
    return (
      <div>
        <h1 className="text-2" style={{ textAlign: 'center' }}>
          COMMUNITY
        </h1>
        <div className="search-bar">
          Filter by
          <form>
            <select className="nav-input">
              <option>Amount</option>
              <option value="1000">$1,000</option>
              <option value="2000">$2,000</option>
              <option value="3000">$3,000</option>
              <option value="4000">$4,000</option>
              <option value="5000">$5,000</option>
              <option value="6000">$6,000</option>
              <option value="7000">$7,000</option>
              <option value="8000">$8,000</option>
              <option value="9000">$9,000</option>
              <option value="10000">$10,000</option>
            </select>
            <select className="nav-input">
              <option>Number of Contributors</option>
              <option value="5">5</option>
              <option value="7">7</option>
              <option value="9">9</option>
              <option value="11">11</option>
              <option value="13">13</option>
            </select>
            <select className="nav-input">
              <option>Category</option>
              <option value="Sports">Sports</option>
              <option value="Business">Business</option>
              <option value="Home Improvement">Home Improvement</option>
              <option value="Travel">Travel</option>
            </select>
            <select className="nav-input">
              <option>Interest Rate</option>
              <option value="5">5%</option>
              <option value="7">7%</option>
              <option value="9">9%</option>
              <option value="10">10%</option>
            </select>
          </form>
          or
          <form>
            <input type="text" className="nav-input" placeholder="search" />
          </form>
        </div>
        <div className="results">
          {allPools.map(pool => {
						const num = pool.contributors.length;
            return (
              <div key={pool._id} className="card">
                <div
                  className="thumbnail"
                  onClick={() => this.handleClick(pool._id)}
                  style={{
                    backgroundImage:
                      'url(https://tribwxmi.files.wordpress.com/2013/05/mustache-web.jpeg)'
                  }}
                  alt=""
                />
                <div className="card-content">
                  <h1 onClick={() => this.handleClick(pool._id)}>
                    <button> {pool.title}</button>
                  </h1>
                  <h1>
                    by: <button className="button">{pool.creator}</button>
                  </h1>
                  <div className="meter">
                    <span style={{ width: '100%' }} />
                  </div>
                  <h3>
                    {parseFloat(pool.amount).toLocaleString('USD', {
                      style: 'currency',
                      currency: 'USD',
                      minimumFractionDigits: 0,
                      maximumFractionDigits: 0
                    })}
                  </h3>
                  <h3>{pool.rate}% max interest</h3>
                  {num > 1 ? (
                    <h3>{num} Contributors</h3>
                  ) : (
                    <h3>{num} Contributor</h3>
                  )}
                  {this.renderDate(pool.date)}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    );
  }
}

const mstp = ({ pools }) => {
  return { pools };
};
export default connect(mstp, actions)(AllPools);
