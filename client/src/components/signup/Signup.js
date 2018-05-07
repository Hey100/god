import React, { Component } from 'react';
import { reduxForm, Field } from 'redux-form';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import { LockAlertIcon } from 'mdi-react';
import { Link } from 'react-router-dom';
import _ from 'lodash';
import * as actions from '../../actions/index';
import SignUpField from './SignUpField';
import formFields from './formFields';

class Signup extends Component {
  renderFields() {
    return _.map(formFields, ({ label, name, type, placeholder }) => {
      return (
        <Field
          key={name}
          component={SignUpField}
          name={name}
          type={type}
          placeholder={label}
        />
      );
    });
  }

  onSubmit = values => {
    this.props.onSignUp(values, this.props.history);
  };

  render() {
    return (
      <div className="section1 form">
        <form onSubmit={this.props.handleSubmit(this.onSubmit)}>
          {/* <form onSubmit={this.props.handleSubmit(values => console.log(values) */}
          <div className="form-sec">
            <Link to="/signin" className="button">
              Already a member?
            </Link>
            <h2 className="text-2">
              Please provide a few details about yourself
            </h2>
            {this.renderFields()}
          </div>
          <div className="form-sec">
            <h2 className="text-2">Save Your Information</h2>
            <Field
              className="form-in"
              component="input"
              name="email"
              type="text"
              placeholder="Email"
            />
            <Field
              className="form-in"
              component="input"
              name="password"
              type="password"
              placeholder="Password"
            />
            <h5 style={{ color: 'orange' }}>
              Must contain at least 8 characters, including 1 number and 1
              uppercase letter
            </h5>
          </div>
          <div className="form-sec">
            <div>
              <input type="checkbox" name="accept request" /> By checking the
              box, clicking "agree and see your rate" below, you confirm:
            </div>
            <ul>
              <li>
                You agree to the{' '}
                <a href="/">Electronic Communications Policy and Consent</a> and
                understand that the terms and conditions and other disclosures
                will be provided to you electronically; and
              </li>
              <li>
                You agree to the{' '}
                <a className="terms" href="/">
                  Credit Report and Information Verification Consent
                </a>, the{' '}
                <a className="terms" href="/">
                  Collective Capital Privacy Policy
                </a>, the{' '}
                <a className="terms" href="/">
                  Collective Capital Privacy Notice
                </a>, and the{' '}
                <a className="terms" href="/">
                  Collective Capital Platform Agreement
                </a>.
              </li>
            </ul>
            <button className="big-btn" type="submit">
              Sign Up
            </button>
            <h5>
              <LockAlertIcon size={34} color="#000" /> Checking your rate won't
              affect your credit score!
            </h5>
          </div>
          <br />
        </form>
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
