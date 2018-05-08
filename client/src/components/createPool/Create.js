import React, { Component } from 'react';
import { reduxForm, Field } from 'redux-form';
import { connect } from 'react-redux';
import _ from 'lodash';
import formFields from './formFields';
import CreateField from './CreateField';
import Chart from '../Chart';
import * as actions from '../../actions/index';
import "../styles/create.css";
import "../styles/global.css";
import "../styles/media.css";

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
      <div className="form-wrap">
				<h2 className="text-2">Choose Your Options</h2>
				<form>
					{this.renderFields()}
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
				{this.handleChart()}
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
