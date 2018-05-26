import React, { Component } from 'react';
import { connect } from 'react-redux';
import moment from 'moment';

import './styles/pooldetail.css';
import './styles/chart.css';
import './styles/global.css';
import './styles/media.css';
import * as actions from '../actions/index';
import Chart from './Chart';

class PoolDetail extends Component {
  state = {
    value: ''
  };
  componentDidMount() {
    window.scrollTo(0, 0);
    this.props.fetchPool(this.props.match.params.id);
    this.props.fetchComments(this.props.match.params.id);
  }
  componentWillUnmount() {
    this.props.reset();
  }

  redirect = () => {
    this.props.authError('You must be a member to leave a comment.');
    this.props.history.push('/signup');
  };

  handleSubmit = event => {
    const { profilePic } = this.props.auth.user;
    if (!this.props.auth.user) {
      this.redirect();
    } else {
      this.props.createComment({
        comment: this.state.value,
        poolId: this.props.match.params.id,
        pic: profilePic
      });
      this.setState({ value: '' });
      event.preventDefault();
    }
  };
  handleChange = event => {
    this.setState({ value: event.target.value });
  };

  handleKeyPress = event => {
    const { profilePic } = this.props.auth.user;
    if (event.key === 'Enter' && this.state.value !== '') {
      if (!this.props.auth.user) {
        this.redirect();
      } else {
        this.props.createComment({
          comment: this.state.value,
          poolId: this.props.match.params.id,
          pic: profilePic
        });
      }
      this.setState({ value: '' });
      event.preventDefault();
    }
  };

  render() {
    const { pools } = this.props;
    if (!pools.pool || !pools.chart || !pools.comments) {
      return (
        <div className="tab">
          <div className="tab-box">
            <div className="jumper">
              <div />
              <div />
              <div />
            </div>
          </div>
        </div>
      );
    }
    const date = moment(pools.pool.startDate).format('L');
    const title = pools.pool.title;
    return (
      <div className="tab">
        <div className="tab-box pool__box">
          {pools.createError ? (
            <h1 className="cancel">{pools.createError}</h1>
          ) : null}
          <div className="pool__details">
            <div
              className="pool__card pool__thumb"
              style={{ backgroundImage: `url(${pools.pool.poolPic})` }}
            />
            <div className="pool__card">
              <h2 className="pool__text">
                <span>Title: </span>
                {title.toUpperCase()}
              </h2>
              <h2 className="pool__text">
                <span>Description: </span>
                {pools.pool.description}
              </h2>
              <h2 className="pool__text">
                <span>Starting: </span>
                {date}
              </h2>
            </div>
          </div>
          <div className="chart-wrap">
            <Chart
              chart={pools.chart}
              user={this.props.auth.user}
              params={this.props.match.params.id}
            />
          </div>
          <p>*Amount before platform fee</p>
          <p>**1% Platform Fee (administered on Disbursement Date)</p>
          <div className="pool__comments-wrap">
            <h1 className="text-2">Join the Conversation</h1>
            {!this.props.auth.user ? (
              <h5>
                Only Pooli members can post comments.{' '}
                <a href="/signup">Sign up here</a>
              </h5>
            ) : null}
						<br/>
            {pools.comments.map(c => {
              return (
                <div key={c._id} className="pool__comment">
                  <img
                    src={c.creatorPic}
                    alt="user thumbnail"
                    className="pool__comment-thumb"
                  />
                  <div className="pool__comment-text">
                    {this.props.auth.user ? (
                      c._user === this.props.auth.user._id ? (
                        <h5>You</h5>
                      ) : (
                        <h5>{c.creator}</h5>
                      )
                    ) : null}
                    <p>{c.comment}</p>
                  </div>
                </div>
              );
            })}
            {this.props.auth.user ? (
              <form onSubmit={this.handleSubmit}>
                <input
                  className="pool__form-input"
                  onChange={this.handleChange}
                  value={this.state.value}
                  onKeyPress={this.handleKeyPress}
                  placeholder="Post a comment..."
                />
                <input
                  className="pool__form-submit"
                  type="submit"
                  value="Post"
                />
              </form>
            ) : null}
          </div>
        </div>
      </div>
    );
  }
}

const mstp = ({ pools, auth }) => {
  return { pools, auth };
};

export default connect(mstp, actions)(PoolDetail);
