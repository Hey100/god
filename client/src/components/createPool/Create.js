import React, { Component } from 'react';
import { reduxForm, Field } from 'redux-form';
import formFields from './formFields';
import CreateField from './CreateField';
import _ from 'lodash';
import * as actions from '../../actions/index';
import { connect } from 'react-redux';

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
	
	handleChart = () => {
		if (this.props.pools.chart) {
			_.mapKeys(this.props.pools.chart, (value, key) => {
				console.log(value.cashPaid);
				<p>{value.cashPaid}</p>;
        
      });
		}
		return null
	}

  render() {
		this.props.pools.chart ? console.log(this.props.pools.chart) : null
    return <div>
        <div className="section1" id="form">
          <div className="form-sec">
            <h2 className="text-2">Choose Your Options</h2>
          </div>
          <form onSubmit={this.props.handleSubmit(values =>
              this.props.createChart(values)
            )}>
            {/* <form onSubmit={this.props.handleSubmit(values => console.log(values))}> */}
            <div className="form-sec">{this.renderFields()}</div>
            <div className="form-sec">
              <button className="button" type="submit">
                Next
              </button>
            </div>
            <button className="button" type="submit">
              Show Chart
            </button>
          </form>
        </div>
        <div>{this.handleChart()}</div>
      </div>;
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
	return { pools }
}

export default connect(mstp, actions)(
  reduxForm({
    validate,
    form: 'poolForm',
    destroyOnUnmount: false
  })(Create)
);
