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
    error ? this.props.resetError() : null;
    this.props.setSelection(selection);
  }

  renderModal = (index, chart) => {
    const months = this.props.pools.chart.length;
    const date = moment(chart.startDate, 'YYYY/MM/DD');
    const day = date.format('Do');
    if (this.state.visible) {
      return (
        <div className="modal">
          <h5 style={{ width: '535px' }}>
            *By clicking "Submit", you agree to pay {this.parse(chart.monthly)}{' '}
            every {day} of the month (except on your disbursement date) for the
            next {months} months, upon the commencement of this pool.
          </h5>
          <button
            className="button"
            onClick={() => this.props.joinPool(this.props.params, index, chart, this.props.title)}
          >
            Submit
          </button>
          <button className="cancel" onClick={() => this.changeVisibility()}>
            Cancel
          </button>
        </div>
      );
    } else return null;
  };

  changeVisibility = () => {
    this.setState({ visible: !this.state.visible });
  };

  renderInput = (chart, index) => {
    if (this.props.user) {
      // const months = this.props.pools.chart.length;
      // const date = moment(chart.startDate, 'YYYY/MM/DD');
      // const day = date.format('Do');
      const { params, title } = this.props;
			const { contributors } = this.props.pools.pool;
			chart['startDate'] = moment(chart.startDate).format('L');
			chart['dDate'] = moment(chart.startDate)
				.add(index, 'months')
				.format('L');
			chart['endDate'] = moment(chart.startDate)
				.add(index - 1, 'months')
				.format('L');
			chart['poolId'] = params
			chart['disburseAmount'] = chart.tcr;
			chart['title'] = title
      let position1, position2, position3;
      contributors.map(p => {
        if (p.position === index && p._user === this.props.user._id) {
          this.props.joined();
          return position1 = (
            <td style={{ padding: '10px', color: 'tomato' }}>You &#10004;</td>
          );
        } else if (p.position === index && p._user !== this.props.user._id) {
          return position2 = (
            <td style={{ padding: '10px', color: 'tomato' }}>{p.name}</td>
          );
        } else {
					return position3 = (
            <td>
              {index + 1} &nbsp;
              {/* {this.renderModal(index, chart)} */}
              {/* <button onClick={() => this.changeVisibility()}>Join</button> */}
              <button
                onClick={() =>
                  this.props.joinPool(params, index, chart)
                }
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
        return <td style={{ padding: '10px', color: 'seagreen' }}>Open </td>;
      }
    } else {
      if (this.props.onCancel && index !== this.props.pools.selection) {
        return <td>{index + 1}</td>;
      }
      if (index !== this.props.pools.selection) {
        return (
          <td>
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
      return <td>{index + 1} &#10004;</td>;
    }
  };

  renderDate = (date, index) => {
    let newDate = moment(date)
      .add(index, 'months')
      .format('L');
    return <td key={date}>{newDate}</td>;
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
						<th>Position</th>
						<th>Base Amount</th>
						<th>Interest Rate</th>
						<th>Interest Paid/Earned*</th>
						<th>Monthly Payment</th>
						<th>Cash Paid</th>
						<th>Cash Available</th>
						<th>Fee**</th>
						<th>Cash Received</th>
						<th>Disbursement Date</th>
					</tr>
				</thead>
				<tbody>
					{this.props.chart.map(chart => {
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
							<tr key={chart.cashPaid}>
								{this.renderInput(chart, index)}
								<td>{this.parse(amount)}</td>
								<td>{interestRate}%</td>
								<td>{this.parse(interestAmount)}</td>
								<td>{this.parse(monthly)}</td>
								<td>{this.parse(cashPaid)}</td>
								<td>{this.parse(cashReceived)}</td>
								<td>${fee}</td>
								<td>{this.parse(tcr)}</td>
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
