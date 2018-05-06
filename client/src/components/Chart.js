import React, { Component } from 'react';
import _ from 'lodash';
import { reduxForm } from 'redux-form';
import * as actions from '../actions/index';
import { connect } from 'react-redux';
import moment from 'moment';

class Chart extends Component {
  state = {
    counter: 1,
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
    if (this.props.position >= 0) {
      if (this.props.position !== index) {
        return <td style={{ padding: '10px' }}>{index + 1}</td>;
      }
      return <td style={{ padding: '10px' }}>You &#10004;</td>;
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
            onClick={this.props.handleSubmit(() => this.handleNext())}
          >
            Next
          </button>
        ) : null}
      </div>
    );
  }
}

const mstp = ({ pools }, ownProps) => {
  let position;
  pools.pool
    ? pools.pool.participants.map(participant => {
        if (participant.user === ownProps.user._id) {
          position = participant.position;
        }
      })
    : null;
  return { pools, position };
};

export default connect(mstp, actions)(
  reduxForm({
    form: 'poolForm',
    destroyOnUnmount: false
  })(Chart)
);
