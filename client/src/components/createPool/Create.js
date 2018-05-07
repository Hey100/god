import React, { Component } from 'react';
import { reduxForm, Field } from 'redux-form';
import formFields from './formFields';
import CreateField from './CreateField';
import Chart from '../Chart';
import _ from 'lodash';
import * as actions from '../../actions/index';
import { connect } from 'react-redux';

class Create extends Component {
  state = {
		selection: null
  };
  componentDidMount() {
    window.scrollTo(0, 0);
  }

  renderFields() {
    return _.map(formFields, ({ label, name, type, placeholder }) => {
      return (
        <Field
          key={name}
          component={CreateField}
          name={name}
          type={type}
          placeholder={label}
        />
      );
    });
  }

  handleChart = () => {
    if (this.props.pools.chart) {
      return (
        <Chart
          onSubmit={this.props.onSubmit}
          chart={this.props.pools.chart}
          position={this.state.selection}
        />
      );
    }
    return null;
  };

  render() {
    return (
      <div>
        <div className="section1 form">
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
