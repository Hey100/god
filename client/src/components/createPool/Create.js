import React, { Component } from 'react';
import { reduxForm, Field } from 'redux-form';
import formFields from './formFields';
import CreateField from './CreateField';
import _ from 'lodash';
import * as actions from '../../actions/index';
import { connect } from 'react-redux';
// import ReactTable from 'react-table';

class Create extends Component {
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

  handleChart = (data, columns) => {
    if (this.props.pools.chart) {
      // console.log(data);
      // <ReactTable data={data} columns={columns} />;
      // let td = _.map(this.props.pools.chart, chart => {
      //   console.log(chart.cashPaid);
      //   return;
      //   <tr>
      //     <td key={chart.cashPaid}>{chart.cashPaid}</td>
      //     <td key={chart.cashReceived + 1}>{chart.cashReceived}</td>
      //     <td key={chart.monthly}>{chart.monthly}</td>
      //   </tr>;
      // });
      // console.log(td);
      return (
        <div>
          <table style={{ border: '1px solid black' }}>
            <tbody>
              <tr>
                <th style={{ padding: '10px' }}>Base Amount</th>
                <th style={{ padding: '10px' }}>Interest Rate</th>
                <th style={{ padding: '10px' }}>Interest Paid/Earned*</th>
                <th style={{ padding: '10px' }}>Monthly Payment</th>
                <th style={{ padding: '10px' }}>Cash Paid</th>
                <th style={{ padding: '10px' }}>Cash Received</th>
                <th style={{ padding: '10px' }}>Fee**</th>
                <th style={{ padding: '10px' }}>Total Cash Received</th>
              </tr>
              {_.map(this.props.pools.chart, chart => {
                console.log(chart);
                let cashReceived = parseFloat(
                  chart.cashReceived
                ).toLocaleString('USD', {
                  style: 'currency',
                  currency: 'USD',
                  minimumFractionDigits: 2,
                  maximumFractionDigits: 2
                });
                let monthly = parseFloat(chart.monthly).toLocaleString('USD', {
                  style: 'currency',
                  currency: 'USD',
                  minimumFractionDigits: 2,
                  maximumFractionDigits: 2
                });
                let cashPaid = parseFloat(chart.cashPaid).toLocaleString(
                  'USD',
                  {
                    style: 'currency',
                    currency: 'USD',
                    minimumFractionDigits: 2,
                    maximumFractionDigits: 2
                  }
                );
                let amount = parseFloat(chart.amount).toLocaleString('USD', {
                  style: 'currency',
                  currency: 'USD',
                  minimumFractionDigits: 2,
                  maximumFractionDigits: 2
                });
                let interestRate = parseFloat(chart.interestRate).toFixed(2);
                let interestAmount = parseFloat(
                  chart.interestAmount
                ).toLocaleString('USD', {
                  style: 'currency',
                  currency: 'USD',
                  minimumFractionDigits: 2,
                  maximumFractionDigits: 2
                });
                let fee = parseFloat(chart.fee);
                let tcr = parseFloat(chart.tcr).toLocaleString('USD', {
                  style: 'currency',
                  currency: 'USD',
                  minimumFractionDigits: 2,
                  maximumFractionDigits: 2
                });
                return (
                  <tr key={chart.cashPaid + 1}>
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
        </div>
      );
    }
    return null;
  };

  render() {
    const { chart } = this.props.pools;
    const data = chart ? Object.values(this.props.pools.chart) : null;
    const columns = [
      {
        Header: 'Name'
        // String-based value accessors!
      },
      {
        Header: 'Age'
      }
    ];
    return (
      <div>
        <div className="section1" id="form">
          <div className="form-sec">
            <h2 className="text-2">Choose Your Options</h2>
          </div>
          <form>
            {/* <form onSubmit={this.props.handleSubmit(values => console.log(values))}> */}
            <div className="form-sec">{this.renderFields()}</div>
            <div className="form-sec">
              <button
                className="button"
                type="submit"
                onClick={this.props.handleSubmit(this.props.onSubmit)}
              >
                Next
              </button>
            </div>
            <button
              className="button"
              type="submit"
              onClick={this.props.handleSubmit(values =>
                this.props.createChart(values)
              )}
            >
              Show Chart
            </button>
          </form>
        </div>
        {this.handleChart(data, columns)}
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
