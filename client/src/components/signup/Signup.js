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
import '../styles/signup.css';
import '../styles/global.css';
import '../styles/media.css';

class Signup extends Component {
  state = {
    agree: false
  };

  componentDidMount() {
    window.scrollTo(0, 0);
  }
  componentWillUnmount() {
    this.props.resetAuthError();
  }

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
    if (!this.state.agree) {
      this.setState({
        agreeErr: 'You must agree to our terms and conditions before signing up'
      });
    } else {
    }
    this.props.onSignUp(values, this.props.history);
  };

  handleChange = event => {
    this.state.agreeErr ? this.setState({ agreeErr: '' }) : null;
    this.setState({ agree: !this.state.agree });
  };

  render() {
    return (
      <div className="tab">
				<div className="tab-box">
					<form className="signup__form" onSubmit={this.props.handleSubmit(this.onSubmit)}>
						<Link to="/signin" className="link">
							Already a member?
						</Link>
						<h2 className="text-2">
							Please provide a few details about yourself
						</h2>
						{this.renderFields()}
						<h2 className="text-2">Save Your Information</h2>
						<Field
							className="form-input"
							component="input"
							name="email"
							type="text"
							placeholder="Email"
						/>
						<Field
							className="form-input"
							component="input"
							name="password"
							type="password"
							placeholder="Password"
						/>
						<Field
							className="form-input"
							component="input"
							name="c_password"
							type="c_password"
							placeholder="Confirm password"
						/>
						<h5 className="warning">
							Must contain at least 8 characters, including 1 number and 1
							uppercase letter
						</h5>
						<div className="signup__terms">
							<div id="signup__agreement">
								<input type="checkbox" name="accept request" /> By checking the
								box, clicking "agree and see your rate" below, you confirm:
							</div>
							<ul className="signup__list">
								<li>
									You agree to the{' '}
									<a className="signup__terms-text" href="/">
										Electronic Communications Policy and Consent
									</a>{' '}
									and understand that the terms and conditions and other
									disclosures will be provided to you electronically; and
								</li>
								<li>
									You agree to the{' '}
									<a className="signup__terms-text" href="/">
										Credit Report and Information Verification Consent
									</a>, the{' '}
									<a className="signup__terms-text" href="/">
										Collective Capital Privacy Policy
									</a>, the{' '}
									<a className="signup__terms-text" href="/">
										Collective Capital Privacy Notice
									</a>, and the{' '}
									<a className="signup__terms-text" href="/">
										Collective Capital Platform Agreement
									</a>.
								</li>
							</ul>
							<button className="mid-btn" type="submit">
								Agree and see rates
							</button>
							<div className="align-center">
								<LockAlertIcon size={34} color="#000" />
								Checking your rate won't affect your credit score!
							</div>
						</div>
						<br />
					</form>
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
  if (errors['address2']) {
    errors['address2'] = null;
  }
  return errors;
};

const mstp = ({ auth }) => {
  return { auth };
};

export default withRouter(
  connect(mstp, actions)(
    reduxForm({
      validate,
      form: 'registerForm'
    })(Signup)
  )
);
