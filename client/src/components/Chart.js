import React, { Component } from 'react';
import { reduxForm } from 'redux-form';
import { connect } from 'react-redux';
import moment from 'moment';
// import Modal from 'react-modal';

import './styles/chart.css';
import './styles/global.css';
import './styles/media.css';
import * as actions from '../actions/index';

class Chart extends Component {
  state = {
    counter: 1,
    joined: false,
    error: '',
    visible: false
  };

  selection(selection) {
    const { error } = this.props.pools;
		error && this.props.resetError()
    this.props.setSelection(selection);
  }

  renderModal = (index, chart) => {
    if (this.state.visible) {
      const { modalIndex, modalChart } = this.state;
      const months = this.props.pools.chart.length;
      const day = moment(modalChart.startDate).format('Do');
      return (
        <div className="chart__overlay">
					<div className="chart__modal">
						<h1 className="chart__modal-title">{modalChart.title.toUpperCase()}</h1>
            <h1>Pool Starts: <span>{modalChart.startDate}</span></h1>
            <h1>Your disbursement date is: <span>{modalChart.dDate}</span></h1>
            <h1>On your disbursement date, you will receive: <span>{this.parse(modalChart.disburseAmount)}</span></h1>
            <button
              className="chart__modal-btn green"
              onClick={() =>
                this.props.joinPool(this.props.params, modalIndex, modalChart)
              }
            >
              Submit*
            </button>
            &nbsp;
            <button
              className="chart__modal-btn red"
              onClick={() => this.changeVisibility()}
            >
              Cancel
            </button>
            <h5>
              *By clicking "Submit", you agree to pay{' '}
              {this.parse(modalChart.monthly)} every{' '}
              {day} of the month (except on your disbursement date)
              for the next {months} months, upon the commencement
              of this pool.
            </h5>
          </div>
        </div>
      );
    } else return null;
  };

  changeVisibility = (index, chart) => {
    this.setState({ visible: !this.state.visible });
    this.setState({ modalIndex: index });
    this.setState({ modalChart: chart });
  };

  renderInput = (chart, index) => {
    if (this.props.user) {
      const { params, pools } = this.props;
      const { contributors, title } = this.props.pools.pool;
      chart['startDate'] = moment(chart.startDate).format('L');
      chart['dDate'] = moment(chart.startDate)
        .add(index, 'months')
        .format('L');
      chart['endDate'] = moment(chart.startDate)
        .add(pools.chart.length - 1, 'months')
        .format('L');
      chart['poolId'] = params;
      chart['disburseAmount'] = chart.tcr;
      chart['title'] = title;
      let position1, position2, position3;
      contributors.map(c => {
        if (c.position === index && c._user === this.props.user._id) {
          this.props.joined();
          return (position1 = (
						<td data-label="Position" style={{ padding: '10px', color: 'tomato' }}>You &#10004;</td>
          ));
        } else if (c.position === index && c._user !== this.props.user._id) {
          return (position2 = (
						<td data-label="Position" style={{ padding: '10px', color: 'tomato' }}>
              <a href={'/profile/' + c._user}> {c.name}</a>
            </td>
          ));
        } else {
          return (position3 = (
						<td data-label="Position" >
              {this.renderModal(index, chart)}
              <button className="chart__btn" onClick={() => this.changeVisibility(index, chart)}>
                Join
              </button>
            </td>
          ));
        }
      });
      if (position1) {
        return position1;
      } else if (position2) {
        return position2;
      } else if (position3 && !this.props.pools.joined) {
        return position3;
      } else {
				return <td data-label="Position" style={{ padding: '10px', color: 'seagreen' }}>Open </td>;
      }
    } else {
      if (this.props.onCancel && index !== this.props.pools.selection) {
				return <td data-label="Position" >{index + 1}</td>;
      }
      if (index !== this.props.pools.selection) {
        return (
					<td data-label="Position" >
            <input
              type="radio"
              name="position"
              value={chart}
              onClick={() => this.selection(index)}
            />
          </td>
        );
      }
			return <td data-label="Position" >{index + 1} &#10004;</td>;
    }
  };

  renderDate = (date, index) => {
    let newDate = moment(date)
      .add(index, 'months')
      .format('L');
		return <td data-label="Disbursement Date" key={date}>{newDate}</td>;
  };

  parse = num => {
    return parseFloat(num).toLocaleString('USD', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 2,
      maximumFractionDigits: 2
    });
  };

  render() {
    return (
	    <table>
        <thead>
          <tr>
            <th scope="col">Position</th>
            <th scope="col">Base Amount</th>
            <th scope="col">Interest Rate</th>
            <th scope="col">Interest Paid/Earned*</th>
            <th scope="col">Monthly Payment</th>
            <th scope="col">Cash Paid</th>
            {/* <th scope="col">Cash Available</th> */}
            <th scope="col">Fee**</th>
            <th scope="col">Disbursement Amount</th>
            <th scope="col">Disbursement Date</th>
          </tr>
        </thead>
        <tbody>
          {this.props.chart.map(chart => {
            const {
              // cashReceived,
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
              <tr key={chart.cashPaid}>
                {this.renderInput(chart, index)}
                <td data-label="Base Amount">{this.parse(amount)}</td>
                <td data-label="Interest Rate">{interestRate}%</td>
                <td data-label="Interest Paid/Earned">{this.parse(interestAmount)}</td>
                <td data-label="Monthly Payment">{this.parse(monthly)}</td>
                <td data-label="Cash Paid">{this.parse(cashPaid)}</td>
                {/* <td data-label="Cash Available">{this.parse(cashReceived)}</td> */}
                <td data-label="Fee">${fee}</td>
                <td data-label="Cash Received">{this.parse(tcr)}</td>
                {this.renderDate(startDate, index)}
              </tr>
            );
          })}
        </tbody>
      </table>
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
