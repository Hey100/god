import React, { Component } from 'react';
import Chart from './Chart';
import * as actions from '../actions/index';
import { connect } from 'react-redux';
import moment from 'moment';

class Create extends Component {
  state = {
    contributors: null,
    error: '',
    visible: false
  };
  componentDidMount() {
    if (this.props.pools.chart) {
      this.props.reset();
    }
  }

  //'handle' Functions
  handleChart = () => {
    if (this.props.pools.chart) {
      return (
        <Chart
          onSubmit={this.props.onSubmit}
          chart={this.props.pools.chart}
          state={this.state}
        />
      );
    }
    return null;
  };
  handleChange = event => {
    const { error } = this.props.pools;
    //resetAll
    this.props.reset();
    //if error, reset error
    error ? this.props.resetError() : null;
    //hide renderReview()
    this.setState({ visible: false });
    //if user changes numOfContributors, reset all options & chart
    if (event.target.name === 'contributors') {
      this.setState({ amount: null, rate: null, date: null });
      this.props.reset();
    }
    //set error states
    this.setState({ [event.target.name + 'Err']: '' });
    //set value states
    this.setState({ [event.target.name]: event.target.value }, () => {
      if (this.state.date) {
        //check for future dates
        if (moment(this.state.date).format('L') <= moment().format('L')) {
          this.setState({ dateErr: 'Date must be in the future' });
          this.props.reset();
          return;
        }
      }
      //create chart if all states exist
      if (
        this.state.contributors &&
        this.state.amount &&
        this.state.rate &&
        this.state.date
      ) {
        let obj = {};
        obj['amount'] = this.state.amount;
        obj['contributors'] = this.state.contributors;
        obj['rate'] = this.state.rate;
        obj['date'] = this.state.date;
        obj['title'] = this.state.title;
        obj['category'] = this.state.category;
        obj['description'] = this.state.description;
        this.props.createChart(obj);
      }
    });
  };
  handleMouseDown = event => {
    this.setState({ dateErr: '' });
  };
  handleNext() {
    if (this.props.pools.selection === '') {
      this.props.setError('Please Select a Position in the Chart');
    } else if (!this.state.title) {
      window.scrollTo(0, 0);
      this.setState({ titleErr: 'Required Field' });
    } else if (!this.state.category) {
      window.scrollTo(0, 0);
      this.setState({ categoryErr: 'Required Field' });
    } else if (!this.state.description) {
      window.scrollTo(0, 0);
      this.setState({ descriptionErr: 'Required Field' });
    } else {
      this.setState({ visible: true });
    }
  }
  handleSubmit = chart => {
    const { history, createPool, pools } = this.props;
    const startDate = moment(chart[pools.selection].startDate).format('L');
    const dDate = moment(chart[pools.selection].startDate)
      .add(pools.selection, 'months')
      .format('L');
    const endDate = moment(chart[pools.selection].startDate)
      .add(chart.length - 1, 'months')
      .format('L');
    let values = {};
    values['title'] = this.state.title;
    values['description'] = this.state.description;
    values['category'] = this.state.category;
    values['contributors'] = this.state.contributors;
    values['rate'] = this.state.rate;
    values['amount'] = this.state.amount;
		values['position'] = pools.selection;
    values['startDate'] = moment(this.state.date).format('L');
		values['dDate'] = dDate
		values['endDate'] = endDate
		values['monthly'] = chart[pools.selection].monthly;
		values['disburseAmount'] = chart[pools.selection].tcr;
		createPool(values, history);
		window.scrollTo(0, 0);
  };

  //'render' Functions
  renderAmount = () => {
    if (this.state.contributors) {
      let n = this.state.contributors;
      let value = n * 100;
      const handleText = (value, num) => {
        let number = value * num;
        return parseFloat(number).toLocaleString('USD', {
          style: 'currency',
          currency: 'USD',
          minimumFractionDigits: 0,
          maximumFractionDigits: 0
        });
      };
      return (
        <select
          name="amount"
          className="form-input select"
          style={{ marginBottom: '2px' }}
          onChange={this.handleChange}
        >
          <option value="">Amount</option>
          <option value={value * 2}>{handleText(value, 2)}</option>
          <option value={value * 3}>{handleText(value, 3)}</option>
          <option value={value * 4}>{handleText(value, 4)}</option>
          <option value={value * 5}>{handleText(value, 5)}</option>
          <option value={value * 6}>{handleText(value, 6)}</option>
          <option value={value * 7}>{handleText(value, 7)}</option>
          <option value={value * 8}>{handleText(value, 8)}</option>
        </select>
      );
    }
    return null;
  };

  renderRate = () => {
    if (this.state.amount) {
      return (
        <select
          name="rate"
          className="form-input select"
          style={{ marginBottom: '2px' }}
          onChange={this.handleChange}
        >
          <option value="">Rate</option>
          <option value="5">5%</option>
          <option value="7">7%</option>
          <option value="9">9%</option>
          <option value="10">10%</option>
        </select>
      );
    }
    return null;
  };

  renderDate = () => {
    if (this.state.rate) {
      const { dateErr } = this.state;
      return (
        <div>
          <input
            onChange={this.handleChange}
            onMouseDown={this.handleMouseDown}
            className="form-input"
            style={{ marginBottom: '2px' }}
            type="date"
            name="date"
            placeholder="Start Date"
          />
          <div
            className="alert"
            style={{ marginBottom: '10px', color: 'tomato' }}
          >
            {dateErr ? dateErr : null}
          </div>
        </div>
      );
    }
    return null;
  };
  renderReview = () => {
    const { chart, selection } = this.props.pools;
    if (this.state.visible) {
      const position = chart[selection];
      return (
        <div className="form-sec">
          <h2 className="text-2">4. Review Your Pool</h2>
          <div>
            <h1 className="text-2">Title: {this.state.title}</h1>
            <h1 className="text-2">Category: {this.state.category}</h1>
            <h1 className="text-2">Description: {this.state.description}</h1>
            <h1 className="text-2">
              Number of Contributors: {this.state.contributors}
            </h1>
            <h1 className="text-2">
              Amount:{' '}
              {parseFloat(this.state.amount).toLocaleString('USD', {
                style: 'currency',
                currency: 'USD',
                minimumFractionDigits: 0,
                maximumFractionDigits: 0
              })}
            </h1>
            <h1 className="text-2">Rate: {this.state.rate}%</h1>
            <h1 className="text-2">
              Start Date: {moment(this.state.date).format('L')}
            </h1>
          </div>
          <div>
            <h5>Your Position:</h5>
            <table style={{ border: '1px solid black' }}>
              <tbody>
                <tr>
                  <th>Base Amount</th>
                  <th>Interest Rate</th>
                  <th>Interest Paid/Earned</th>
                  <th>Monthly Payment</th>
                  <th>Cash Paid</th>
                  <th>Cash Available</th>
                  <th>Fee</th>
                  <th>Disbursement Amount</th>
                  <th>Disbursement Date</th>
                </tr>
                <tr>
                  <td>{position.amount}</td>
                  <td>{position.interestRate}%</td>
                  <td>{position.interestAmount}</td>
                  <td>{position.monthly}</td>
                  <td>{position.cashPaid}</td>
                  <td>{position.cashReceived}</td>
                  <td>${position.fee}</td>
                  <td>{position.tcr}</td>
                  <td>
                    {moment(position.startDate)
                      .add(selection, 'months')
                      .format('L')}
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      );
    }
    return null;
  };
  renderAgreement = (chart, selection) => {
    if (selection >= 0) {
      const position = chart[selection];
      const date = moment(position.startDate, 'YYYY/MM/DD');
      const day = date.format('Do');
      return (
        <h5 style={{ width: '535px' }}>
          *By clicking "Submit", you agree to pay {position.monthly} every {day}{' '}
          of the month (except on your disbursement date) for the next{' '}
          {chart.length} months, upon the commencement of this pool.
        </h5>
      );
    }
    return null;
  };

  render() {
    const { error, chart, selection, createError } = this.props.pools;
    const { titleErr, categoryErr, descriptionErr } = this.state;
    return (
      <div className="form-wrap">
        <div className="form-sec">
					{createError ? <h1 className="cancel">{createError}</h1> : null}
          <h2 className="text-2">1. Give Your Pool a Name and Some Details</h2>
          <input
            className="form-input"
            style={{ marginBottom: '2px' }}
            type="text"
            name="title"
            placeholder="Title"
            onChange={this.handleChange}
          />
          <div className="alert">
            {titleErr ? <p className="cancel">{titleErr}</p> : null}
          </div>
          <select
            className="form-input select"
            style={{ marginBottom: '2px' }}
            name="category"
            onChange={this.handleChange}
          >
            <option value="">Category</option>
            <option value="Business">Business</option>
            <option value="Sports">Sports</option>
            <option value="Home Improvement">Home Improvement</option>
            <option value="Travel">Travel</option>
          </select>
          <div className="alert">
            {categoryErr ? <p className="cancel">{categoryErr}</p> : null}
          </div>
          <textarea
            name="description"
            className="form-input textarea"
            cols="40"
            rows="10"
            onChange={this.handleChange}
            placeholder="Please provide a description of your pool"
          />
          <div className="alert">
            {descriptionErr ? <p className="cancel">{descriptionErr}</p> : null}
          </div>
        </div>
        <div className="form-sec">
          <h2 className="text-2">2. Choose Your Options</h2>
          <select
            name="contributors"
            className="form-input select"
            style={{ marginBottom: '2px' }}
            onChange={this.handleChange}
          >
            <option value="">Number of Contributors</option>
            <option value="5">5 contributors</option>
            <option value="7">7 contributors</option>
            <option value="9">9 contributors</option>
            <option value="11">11 contributors</option>
            <option value="13">13 contributors</option>
          </select>
          {this.renderAmount()}
          {this.renderRate()}
          {this.renderDate()}
        </div>
        {this.handleChart()}
        {this.renderReview()}
        <div className="form-sec">
          <div className="alert">
            {error ? <p className="cancel">{error}</p> : null}
          </div>
          {!this.state.visible ? (
            this.props.pools.chart ? (
              <button
                className="big-btn"
                type="submit"
                onClick={() => this.handleNext()}
              >
                Review
              </button>
            ) : null
          ) : (
            <div className="form-sec">
              <button
                className="big-btn"
                type="submit"
                onClick={() => this.handleSubmit(chart)}
              >
                Submit*
              </button>
              {this.renderAgreement(chart, selection)}
            </div>
          )}
        </div>
      </div>
    );
  }
}

const mstp = ({ pools }) => {
  return { pools };
};

export default connect(mstp, actions)(Create);
