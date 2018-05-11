import React, { Component } from 'react';
import _ from 'lodash';
import { reduxForm } from 'redux-form';
import { connect } from 'react-redux';
import moment from 'moment';

import "./styles/chart.css";
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
            <td><button onClick={() => this.props.joinPool(this.props.params, index)}>Join</button></td>
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
            Open{' '}
          </td>
        );
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
    return (
      <td key={date}>
        {newDate}
      </td>
    );
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
								
									key={chart.cashReceived + chart.amount}
								>
									{amount}
								</td>
								<td key={interestRate}>
									{interestRate}%
								</td>
								<td key={interestAmount}>
									{interestAmount}
								</td>
								<td key={monthly}>
									{monthly}
								</td>
								<td key={cashPaid - 1}>
									{cashPaid}
								</td>
								<td key={cashReceived + 1}>
									{cashReceived}
								</td>
								<td key={monthly + 1}>
									${fee}
								</td>
								<td key={tcr}>
									{tcr}
								</td>
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
