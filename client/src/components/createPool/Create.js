import React, { Component } from 'react';
import { reduxForm, Field } from 'redux-form';
import formFields from './formFields';
import CreateField from './CreateField';
import _ from 'lodash';
import * as actions from '../../actions/index';
import { connect } from 'react-redux';
// import ReactTable from 'react-table';

class Create extends Component {
	state = {
		selection: null
	}
	componentDidMount() {
		console.log(this.state)
	}
	

  renderFields() {
    return _.map(formFields, ({ label, name, placeholder }) => {
      return (
        <Field
          key={name}
          component={CreateField}
          name={name}
          label={label}
          placeholder={placeholder}
        />
      );
    });
  }

  setSelection(chart) {
		console.log(chart)
    this.setState({ selection: chart }, () => {
			console.log(this.state.selection)
		});
  }

  handleChart = (data, columns) => {
    if (this.props.pools.chart) {
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
              </tr>
              {_.map(this.props.pools.chart, chart => {
                const {
                  cashReceived,
                  cashPaid,
                  monthly,
                  amount,
                  interestRate,
                  interestAmount,
                  fee,
                  tcr,
                  position
                } = chart;
                let index = this.props.pools.chart.indexOf(chart);
                return (
                  <tr key={chart.cashPaid + 1}>
                    <td style={{ padding: '10px' }} key={position}>
                      {index + 1}
                      <input
                        type="radio"
                        name="position"
                        value={chart}
                        onClick={() => this.setSelection(chart)}
                      />
                    </td>
                    <td
                      style={{ padding: '10px' }}
                      key={chart.cashReceived + chart.amount}
                    >
                      {amount}
                    </td>
                    <td style={{ padding: '10px' }} key={cashReceived + 1}>
                      {interestRate}%
                    </td>
                    <td style={{ padding: '10px' }} key={cashReceived + 1}>
                      {interestAmount}
                    </td>
                    <td style={{ padding: '10px' }} key={monthly}>
                      {monthly}
                    </td>
                    <td style={{ padding: '10px' }} key={monthly}>
                      {cashPaid}
                    </td>
                    <td style={{ padding: '10px' }} key={monthly}>
                      {cashReceived}
                    </td>
                    <td style={{ padding: '10px' }} key={monthly + 1}>
                      ${fee}
                    </td>
                    <td style={{ padding: '10px' }} key={cashPaid}>
                      {tcr}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
          <p>*Amount before platform fee</p>
          <p>**1% Platform Fee</p>
          <div className="form-sec">
            <button
              className="big-btn"
              type="submit"
              onClick={this.props.handleSubmit(this.props.onSubmit)}
            >
              Next
            </button>
          </div>
        </div>
      );
    }
    return null;
  };

  render() {
    return (
      <div>
        <div className="section1" id="form">
          <div className="form-sec">
            <h2 className="text-2">Choose Your Options</h2>
          </div>
          <form>
            <div className="form-sec">{this.renderFields()}</div>
            <div className="form-sec">
              <button
                className="button"
                type="submit"
                onClick={this.props.handleSubmit(values =>
                  this.props.createChart(values)
                )}
              >
                Show Chart
              </button>
            </div>
          </form>
          {this.handleChart()}
        </div>
      </div>
    );
  }
}

const validate = values => {
  const errors = {};

  _.each(formFields, ({ name, noValueError }) => {
    if (!values[name]) {
      errors[name] = noValueError;
    }
  });
  return errors;
};

const mstp = ({ pools }) => {
  return { pools };
};

export default connect(mstp, actions)(
  reduxForm({
    validate,
    form: 'poolForm',
    destroyOnUnmount: false
  })(Create)
);
