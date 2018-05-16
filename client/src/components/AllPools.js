import React, { Component } from 'react';
import { connect } from 'react-redux';
import moment from 'moment';

import './styles/allpools.css';
import './styles/global.css';
import './styles/media.css';
import * as actions from '../actions/index';

class AllPools extends Component {
  state = {
    amount: null,
    contributors: null,
    category: null,
    rate: null,
    keyword: null
  };
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
      <div className="tab">
        <h1 className="tab-title">COMMUNITY</h1>
        <div className="tab-box-v">
          <div className="all__search-bar">
            <h1>Filter by</h1>
            <form>
              <select
                className="all__input"
                onInput={event => this.setState({ amount: event.target.value })}
              >
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
              <select
                className="all__input"
                onInput={event =>
                  this.setState({ contributors: event.target.value })
                }
              >
                <option>Number of Contributors</option>
                <option value="5">5</option>
                <option value="7">7</option>
                <option value="9">9</option>
                <option value="11">11</option>
                <option value="13">13</option>
              </select>
              <select
                className="all__input"
                onInput={event =>
                  this.setState({ category: event.target.value })
                }
              >
                <option>Category</option>
                <option value="Sports">Sports</option>
                <option value="Business">Business</option>
                <option value="Home Improvement">Home Improvement</option>
                <option value="Travel">Travel</option>
              </select>
              <select
                className="all__input"
                onInput={event => this.setState({ rate: event.target.value })}
              >
                <option>Interest Rate</option>
                <option value="5">5%</option>
                <option value="7">7%</option>
                <option value="9">9%</option>
                <option value="10">10%</option>
              </select>
            </form>
            <h1>or</h1>
            <form>
              <input
                type="text"
                className="all__input"
                placeholder="Search"
                onInput={event =>
                  this.setState({ keyword: event.target.value })
                }
              />
            </form>
          </div>
          <div className="results">
            {allPools.map(pool => {
              const num = pool.contributors.length;
              const title = pool.title;
              const percent = Math.round(num * 100 / pool.numOfContributors);
              const matches = title.match(new RegExp(this.state.keyword, 'i'));
              if (this.state.amount && pool.amount > this.state.amount) {
                return;
              }
              if (
                this.state.contributors &&
                pool.numOfContributors > this.state.contributors
              ) {
                return;
              }
              if (
                this.state.category &&
                pool.category !== this.state.category
              ) {
                return;
              }
              if (this.state.rate && pool.rate > this.state.rate) {
                return;
              }
              if (this.state.keyword && !matches) {
                return;
              }
              return (
                <div key={pool._id} className="all__card">
                  <div
                    className="all__thumbnail"
                    onClick={() => this.handleClick(pool._id)}
                    style={{
                      backgroundImage: `url(${pool.poolPic})`
                    }}
                    alt=""
                  />
                  <div className="all__card-content">
                    <h1
                      className="text-3"
                      onClick={() => this.handleClick(pool._id)}
                    >
                      {title.toUpperCase()}
                    </h1>
                    <h1>
                      by:<button className="link">{pool.creator}</button>
                    </h1>
                    <div>
                      <div className="all__meter">
                        <span style={{ width: `${percent}%` }} />
                      </div>
                      <h1 className="all__meter-percent">{`${num}/${
                        pool.numOfContributors
                      }`}</h1>
                    </div>
                    <h3 className="text-3">
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
      </div>
    );
  }
}

const mstp = ({ pools }) => {
  return { pools };
};
export default connect(mstp, actions)(AllPools);
