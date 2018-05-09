import React, { Component } from 'react';
import _ from 'lodash';
import { reduxForm } from 'redux-form';
import * as actions from '../actions/index';
import { connect } from 'react-redux';
import moment from 'moment';

class Chart extends Component {
  state = {
    counter: 1,
    joined: false,
    error: ''
  };

  selection(selection) {
    const { error } = this.props.pools;
    error ? this.props.resetError() : null;
    this.props.setSelection(selection);
  }

  renderInput = (chart, index) => {
    if (this.props.user) {
      const { contributors } = this.props.pools.pool;
      let position1;
      let position2;
      let position3;
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
            <td className="tabData">
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
    } else {
      if (this.props.onCancel && index !== this.props.pools.selection) {
        return <td className="tabData">{index + 1}</td>;
      }
      if (index !== this.props.pools.selection) {
        return (
          <td className="tabData">
            {index + 1}
            <input
              type="radio"
              name="position"
              value={chart}
              onClick={() => {
                this.selection(index);
              }}
            />
          </td>
        );
      }
      return <td className="tabData">{index + 1} &#10004;</td>;
    }
  };

  renderDate = (date, index) => {
    let newDate = moment(date)
      .add(index, 'months')
      .format('L');
    return (
      <td className="tabData" key={date}>
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
              <th className="tabData">Position</th>
              <th className="tabData">Base Amount</th>
              <th className="tabData">Interest Rate</th>
              <th className="tabData">Interest Paid/Earned*</th>
              <th className="tabData">Monthly Payment</th>
              <th className="tabData">Cash Paid</th>
              <th className="tabData">Cash Available</th>
              <th className="tabData">Fee**</th>
              <th className="tabData">Cash Received</th>
              <th className="tabData">Disbursement Date</th>
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
                    className="tabData"
                    key={chart.cashReceived + chart.amount}
                  >
                    {amount}
                  </td>
                  <td className="tabData" key={interestRate}>
                    {interestRate}%
                  </td>
                  <td className="tabData" key={interestAmount}>
                    {interestAmount}
                  </td>
                  <td className="tabData" key={monthly}>
                    {monthly}
                  </td>
                  <td className="tabData" key={cashPaid - 1}>
                    {cashPaid}
                  </td>
                  <td className="tabData" key={cashReceived + 1}>
                    {cashReceived}
                  </td>
                  <td className="tabData" key={monthly + 1}>
                    ${fee}
                  </td>
                  <td className="tabData" key={tcr}>
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
