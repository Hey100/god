import React, { Component } from 'react';
import { connect } from 'react-redux';
import "./styles/global.css";
import "./styles/media.css";
import * as actions from '../actions/index';
import Chart from './Chart';
import moment from 'moment';

class PoolDetail extends Component {
  state = {
    value: ''
  };
  componentDidMount() {
    this.props.fetchPool(this.props.match.params.id);
    this.props.fetchComments(this.props.match.params.id);
  }
  componentWillUnmount() {
    this.props.reset();
  }

  handleSubmit = event => {
    this.props.createComment({
      comment: this.state.value,
      poolId: this.props.match.params.id
    });
    this.setState({ value: '' });
    event.preventDefault();
  };
  handleChange = event => {
    this.setState({ value: event.target.value });
  };

  handleKeyPress = (event) => {
		if(event.key === 'Enter' && this.state.value !== '') {
			this.props.createComment({
				comment: this.state.value,
				poolId: this.props.match.params.id
			});
			this.setState({ value: '' });
			event.preventDefault();
		}
	}

  render() {
    const { pools } = this.props;
    if (!pools.pool || !pools.chart || !pools.comments) {
      return <p>Loading...</p>;
    }
    // if (!pools.pool || !pools.chart) {
    //   return <p>Loading...</p>;
    // }
    const date = moment(pools.pool.date).format('L');
    return (
      <div>
        <h1 className="text-1">Title: {pools.pool.title}</h1>
        <h5>Start Date: {date}</h5>
        <Chart
          chart={pools.chart}
          user={this.props.auth.user}
          params={this.props.match.params.id}
        />
        <div className="form-sec">
          <form onSubmit={this.handleSubmit}>
            <h1 className="text-1">Join the Conversation</h1>
            <textarea
							className="form-input textarea" 
              onChange={this.handleChange}
              value={this.state.value}
							onKeyPress={this.handleKeyPress}
              cols="30"
              rows="5"
            />
            <input
              type="submit"
              value="Submit"
            />
          </form>
        </div>
        <div className="form-sec">
          {pools.comments.map(c => {
            return (
              <div key={c._id}>
                <h5>{c.creator}</h5>
                <p>{c.comment}</p>
                <hr />
              </div>
            );
          })}
        </div>
      </div>
    );
  }
}

const mstp = ({ pools, auth }) => {
  return { pools, auth };
};

export default connect(mstp, actions)(PoolDetail);
