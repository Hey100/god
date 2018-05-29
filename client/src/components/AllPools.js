import React, { Component } from 'react';
import _ from 'lodash';
import { connect } from 'react-redux';
import { CloseIcon } from 'mdi-react';
import moment from 'moment';

import SearchBar from './SearchBar';
import './styles/allpools.css';
import './styles/loader.css';
import './styles/global.css';
import './styles/media.css';
import * as actions from '../actions/index';

class AllPools extends Component {
  state = {
    min: '',
    max: '',
    contributors: null,
    category: null,
    rate: null,
    keyword: ''
  };

  componentDidMount() {
    this.props.fetchAllPools();
    setTimeout(() => {
      if (!this.props.pools.allPools) {
        this.props.fetchAllPools();
      } else {
        clearTimeout();
      }
    }, 3000);
  }

  renderDate = date => {
    let newDate = moment(date).format('L');
    return <h3 key={date}>Start Date: {newDate}</h3>;
  };

  handleClick = id => {
    this.props.history.push(`/pools/${id}`);
  };

  handleFilterClick = (type, opt) => {
    if (opt) {
      this.setState({
        [type]: opt,
        active: true
      });
    } else {
      this.setState({ [type]: null });
    }
  };

  handleFilterPools = pools => {
    const { keyword, min, max, contributors, category, rate } = this.state;
    const filteredPools = [];
    const spljoin = val => {
      return val
        .split('$')
        .join('')
        .split(',')
        .join('');
    };
    pools.forEach(pool => {
      let title = pool.title;
      let match = title.match(new RegExp(keyword, 'i'));
      if (spljoin(min) && Number(pool.amount) < spljoin(min)) return;
      if (spljoin(max) && Number(pool.amount) > spljoin(max)) return;
      else if (contributors && Number(pool.numOfContributors) !== contributors)
        return;
      else if (category && pool.category !== category) return;
      else if (rate && Number(pool.rate) !== rate) return;
      else if (!match) return;
      else filteredPools.push(pool);
    });
    return filteredPools;
  };

  handlePools = () => {
    const { user } = this.props.auth;
    const { allPools } = this.props.pools;
    if (!allPools) {
      return (
        <div className="result">
          <div className="jumper">
            <div />
            <div />
            <div />
          </div>
          <h1 className="text-2">POOLS ARE ON THE WAY...</h1>
        </div>
      );
    }
    let newPools = this.handleFilterPools(allPools);
    if (newPools.length === 0) {
      return (
        <div className="results">
          <h1 className="text-2">THERE ARE NO POOLS MATCHING YOUR SEARCH...</h1>
        </div>
      );
    } else {
      return (
        <div className="results">
          {newPools.map(pool => {
            let title = pool.title;
            let num = pool.contributors.length;
            let percent = Math.round(num * 100 / pool.numOfContributors);
            return (
              <div key={pool._id} className="all__card">
                <div
                  className="all__thumbnail"
                  onClick={() => this.handleClick(pool._id)}
                  style={{ backgroundImage: `url(${pool.poolPic})` }}
                  alt=""
                />
                <div className="all__card-content">
                  <h1
                    className="text-3"
                    onClick={() => this.handleClick(pool._id)}
                  >
                    {title.toUpperCase()}
                  </h1>
                  {user ? (
                    user._id !== pool._user ? (
                      <h3>
                        by:<a href={'/profile/' + pool._user}>
                          {' '}
                          {pool.creator}
                        </a>
                      </h3>
                    ) : (
                      <h3>by: You </h3>
                    )
                  ) : null}
                  <div className="all__meter-wrap">
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
                  <h3>{num === 1 ? '1 Contributor' : `${num} Contributors`}</h3>
                  {this.renderDate(pool.startDate)}
                </div>
              </div>
            );
          })}
        </div>
      );
    }
  };

  search(keyword) {
    this.setState({ keyword });
  }

  handleChange = e => {
    const inputValue = e.target.value === '$' ? '$0' : e.target.value;

    const pipe = (...fns) =>
      fns.reduce((f, g) => {
        return (...args) => {
          return g(f(...args));
        };
      });

    const sanitizeDollar = str => str.split('$').join('');
    const sanitizeComma = str => str.split(',').join('');
    const displayAsCurrency = float =>
      float.toLocaleString('USD', {
        style: 'currency',
        currency: 'USD',
        minimumFractionDigits: 0,
        maximumFractionDigits: 0
      });

    let dollarAmount = pipe(
      sanitizeDollar,
      sanitizeComma,
      parseFloat,
      displayAsCurrency
    )(inputValue);

    // This is the same as:
    // const withoutDollar = sanitizeDollar(inputValue)
    // const withoutCommas = sanitizeComma(withoutDollar)
    // const asFloat = toFloat(withoutCommas)
    // const asCurrency = displayAsCurrency(asFloat)

    // Also the same as:
    // displayAsCurrency(toFloat(sanitizeComma(sanitizeDollar(inputValue))))

    dollarAmount = pipe(sanitizeDollar, sanitizeComma, parseFloat, isNaN)(
      dollarAmount
    )
      ? '$0'
      : dollarAmount;

    this.setState({ [e.target.name]: dollarAmount });
  };

  render() {
    const search = _.debounce(keyword => {
      this.search(keyword);
    }, 300);
    const clearButton =
      this.state.min ||
      this.state.max ||
      this.state.contributors ||
      this.state.category ||
      this.state.rate ||
      this.state.keyword ? (
        <CloseIcon
          className="all__clear"
          size="34"
          color="tomato"
          onClick={() =>
            this.setState({
              min: '',
              max: '',
              contributors: null,
              category: null,
              rate: null,
              keyword: ''
            })
          }
        />
      ) : null;
    return (
      <div className="tab">
        <h1 className="tab-title">COMMUNITY</h1>
        <div className="tab-box-v">
          <div className="all__search-bar">
            {clearButton}
            <div className="all__range">
              <input
                type="text"
                value={this.state.min}
                name="min"
                placeholder="Amount from.."
                onInput={this.handleChange}
              />
              <input
                type="text"
                value={this.state.max}
                name="max"
                placeholder="..To"
                onInput={this.handleChange}
              />
            </div>
            <div className="all__dropdown">
              <button className="all__dropbtn">
                {!this.state.contributors
                  ? 'Contributors'
                  : `${this.state.contributors} con.`}
              </button>
              <div className="all__dropdown-content">
                <button onClick={() => this.handleFilterClick('contributors')}>
                  All
                </button>
                <button
                  onClick={() => this.handleFilterClick('contributors', 5)}
                >
                  5
                </button>
                <button
                  onClick={() => this.handleFilterClick('contributors', 7)}
                >
                  7
                </button>
                <button
                  onClick={() => this.handleFilterClick('contributors', 9)}
                >
                  9
                </button>
                <button
                  onClick={() => this.handleFilterClick('contributors', 11)}
                >
                  11
                </button>
                <button
                  onClick={() => this.handleFilterClick('contributors', 13)}
                >
                  13
                </button>
              </div>
            </div>
            <div className="all__dropdown">
              <button className="all__dropbtn">
                {!this.state.category ? 'Category' : this.state.category}
              </button>
              <div className="all__dropdown-content">
                <button onClick={() => this.handleFilterClick('category')}>
                  All
                </button>
                <button
                  onClick={() => this.handleFilterClick('category', 'Sports')}
                >
                  Sports
                </button>
                <button
                  onClick={() => this.handleFilterClick('category', 'Business')}
                >
                  Business
                </button>
                <button
                  onClick={() =>
                    this.handleFilterClick('category', 'Home Improvement')
                  }
                >
                  Home Improvement
                </button>
                <button
                  onClick={() => this.handleFilterClick('category', 'Travel')}
                >
                  Travel
                </button>
              </div>
            </div>
            <div className="all__dropdown">
              <button className="all__dropbtn">
                {!this.state.rate ? 'Rate' : `${this.state.rate}%`}
              </button>
              <div className="all__dropdown-content">
                <button onClick={() => this.handleFilterClick('rate')}>
                  All
                </button>
                <button onClick={() => this.handleFilterClick('rate', 5)}>
                  5%
                </button>
                <button onClick={() => this.handleFilterClick('rate', 7)}>
                  7%
                </button>
                <button onClick={() => this.handleFilterClick('rate', 9)}>
                  9%
                </button>
                <button onClick={() => this.handleFilterClick('rate', 11)}>
                  11%
                </button>
              </div>
            </div>
            <SearchBar onSearchChange={search} />
          </div>
          {this.handlePools()}
        </div>
      </div>
    );
  }
}

const mstp = ({ auth, pools }) => {
  return { auth, pools };
};
export default connect(mstp, actions)(AllPools);
