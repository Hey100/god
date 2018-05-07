import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as actions from '../actions/index';
import moment from 'moment';

class AllPools extends Component {
  componentDidMount() {
    this.props.fetchAllPools();
  }

  // render() {
  //   const { allPools } = this.props.pools;
  //   if (!allPools) {
  //     return <p>LOADING...</p>;
  //   }
  //   return allPools.map(pool => {
  //     return (
  // 			<div key={pool._id} className="form-sec">
  //         <h1>{pool.title}</h1>
  //         <Link to={`pools/${pool._id}`}>View</Link>
  //       </div>
  //     );
  //   });
  // }
  renderDate = date => {
    let newDate = moment(date).calendar();
    return <h3 key={date}>Start Date: {newDate}</h3>;
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
        {allPools.map(pool => {
					console.log(pool)
          return (
            <div key={pool._id} className="card" onClick={() => this.props.history.push(`/pools/${pool._id}`)}>
              <div
                className="thumbnail"
                style={{
                  backgroundImage:
                    'url(https://tribwxmi.files.wordpress.com/2013/05/mustache-web.jpeg)'
                }}
                alt=""
              />
              <div className="card-content">
                <h1>{pool.title}</h1>
                <h1>by: {pool.creator}</h1>
                <div className="meter">
                  <span style={{ width: '100%' }} />
                </div>
                <h3>
                  {parseFloat(pool.amount).toLocaleString('USD', {
                    style: 'currency',
                    currency: 'USD',
                    minimumFractionDigits: 2,
                    maximumFractionDigits: 2
                  })}
                </h3>
                <h3>{pool.rate}% max interest</h3>
                <h3>{pool.participants.length} Contributors</h3>
                {this.renderDate(pool.date)}
              </div>
            </div>
          );
        })}
      </div>
    );
  }
}

const mstp = ({ pools }) => {
  return { pools };
};
export default connect(mstp, actions)(AllPools);
