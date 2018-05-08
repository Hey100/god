import React, { Component } from 'react';
import _ from 'lodash';
import { reduxForm } from 'redux-form';
import { connect } from 'react-redux';
import moment from 'moment';

import "./styles/global.css";
import "./styles/media.css";
import * as actions from '../actions/index';

class Chart extends Component {
  state = {
    counter: 1,
    joined: false,
    error: ''
  };

  selection(selection) {
    this.props.setSelection(selection);
  }

  handleNext() {
    if (this.props.pools.selection === '') {
      this.setState({ error: 'Please Select a Position in the chart' });
    } else {
      this.props.onSubmit();
    }
  }

  renderInput = (chart, index) => {
    if (this.props.user) {
      const { contributors } = this.props.pools.pool;
      let position1;
      let position2;
      let position3;
      {
        contributors.map(p => {
          if (p.position === index && p.user === this.props.user._id) {
            this.props.joined();
            position1 = (
              <td style={{ padding: '10px', color: 'tomato' }}>You &#10004;</td>
            );
          } else if (p.position === index && p.user !== this.props.user._id) {
            position2 = (
              <td style={{ padding: '10px', color: 'tomato' }}>{p.name}</td>
            );
          } else {
            position3 = (
              <td style={{ padding: '10px' }}>
                {index + 1} &nbsp;
                <button
                  onClick={() => this.props.joinPool(this.props.params, index)}
                >
                  Join
                </button>
              </td>
            );
          }
        });
        if (position1) {
          return position1;
        } else if (position2) {
          return position2;
        } else if (position3 && !this.props.pools.joined) {
          return position3;
        } else {
          return (
            <td style={{ padding: '10px', color: 'seagreen' }}>
              {index + 1}&nbsp;Open{' '}
            </td>
          );
        }
      }
    } else {
      if (this.props.onCancel && index !== this.props.pools.selection) {
        return <td style={{ padding: '10px' }}>{index + 1}</td>;
      }
      if (index !== this.props.pools.selection) {
        return (
          <td style={{ padding: '10px' }}>
            {index + 1}
            <input
              type="radio"
              name="position"
              value={chart}
              onClick={() => {
                this.selection(index), this.setState({ error: '' });
              }}
            />
          </td>
        );
      }
      return <td style={{ padding: '10px' }}>{index + 1} &#10004;</td>;
    }
  };

  renderDate = (date, index) => {
    let newDate = moment(date)
      .add(index, 'months')
      .calendar();
    return (
      <td style={{ padding: '10px' }} key={date}>
        {newDate}
      </td>
    );
  };

  render() {
    return (
      <div className="form-sec">
        {this.props.onSubmit ? (
          <h2 className="text-2">3. Pick a Position</h2>
        ) : null}
        <table style={{ border: '1px solid black' }}>
          <tbody>
            <tr>
              <th style={{ padding: '10px' }}>Position</th>
              <th style={{ padding: '10px' }}>Base Amount</th>
              <th style={{ padding: '10px' }}>Interest Rate</th>
              <th style={{ padding: '10px' }}>Interest Paid/Earned*</th>
              <th style={{ padding: '10px' }}>Monthly Payment</th>
              <th style={{ padding: '10px' }}>Cash Paid</th>
              <th style={{ padding: '10px' }}>Cash Available</th>
              <th style={{ padding: '10px' }}>Fee**</th>
              <th style={{ padding: '10px' }}>Cash Received</th>
              <th style={{ padding: '10px' }}>Disbursement Date</th>
            </tr>
            {_.map(this.props.chart, chart => {
              const {
                cashReceived,
                cashPaid,
                monthly,
                amount,
                interestRate,
                interestAmount,
                fee,
                tcr,
                startDate
              } = chart;
              let index = this.props.chart.indexOf(chart);
              return (
                <tr key={chart.cashPaid + 1}>
                  {this.renderInput(chart, index)}
                  <td
                    style={{ padding: '10px' }}
                    key={chart.cashReceived + chart.amount}
                  >
                    {amount}
                  </td>
                  <td style={{ padding: '10px' }} key={interestRate}>
                    {interestRate}%
                  </td>
                  <td style={{ padding: '10px' }} key={interestAmount}>
                    {interestAmount}
                  </td>
                  <td style={{ padding: '10px' }} key={monthly}>
                    {monthly}
                  </td>
                  <td style={{ padding: '10px' }} key={cashPaid - 1}>
                    {cashPaid}
                  </td>
                  <td style={{ padding: '10px' }} key={cashReceived + 1}>
                    {cashReceived}
                  </td>
                  <td style={{ padding: '10px' }} key={monthly + 1}>
                    ${fee}
                  </td>
                  <td style={{ padding: '10px' }} key={tcr}>
                    {tcr}
                  </td>
                  {this.renderDate(startDate, index)}
                </tr>
              );
            })}
          </tbody>
        </table>
        <p>*Amount before platform fee</p>
        <p>**1% Platform Fee</p>
        {this.state.error ? <p className="cancel">{this.state.error}</p> : null}
        {!this.props.onCancel && !this.props.user ? (
          <button
            className="big-btn"
            type="submit"
            onClick={() => this.handleNext()}
          >
            Next
          </button>
        ) : null}
      </div>
    );
  }
}

const mstp = ({ pools }) => {
  return { pools };
};

export default connect(mstp, actions)(
  reduxForm({
    form: 'poolForm',
    destroyOnUnmount: false
  })(Chart)
);
