import React, { Component } from 'react';
import { reduxForm, Field } from 'redux-form';
import { Link } from 'react-router-dom';
import * as actions from '../../actions/index';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import _ from 'lodash';
import SignUpField from './SignUpField';
import formFields from './formFields';

class Signup extends Component {
  renderFields() {
    return _.map(formFields, ({ label, name, type, placeholder }) => {
      return (
        <Field
          key={name}
          component={SignUpField}
          label={label}
          name={name}
          type={type}
          placeholder={placeholder}
        />
      );
    });
  }

  onSubmit = values => {
    this.props.onSignUp(values, this.props.history);
  };

  render() {
    return (
      <div className="container">
        <form onSubmit={this.props.handleSubmit(this.onSubmit)}>
        {/* <form onSubmit={this.props.handleSubmit((values) => console.log(values))}> */}
          {this.renderFields()}
          <button className="teal btn-flat right white-text" type="submit">
            Sign Up
          </button>
					<br />
					<br />
          <Link to="/" className="red btn-flat right white-text">
            Cancel
          </Link>
        </form>
        <hr />
        <Link to="/login" className="orange btn-flat white-text">
          Log In
        </Link>
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

export default withRouter(
  connect(null, actions)(
    reduxForm({
      validate,
      form: 'registerForm'
    })(Signup)
  )
);
