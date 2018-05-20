import React, { Component } from 'react';
import { reduxForm, Field } from 'redux-form';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import { GoogleIcon } from 'mdi-react';

import './styles/signin.css';
import './styles/global.css';
import './styles/media.css';
import * as actions from '../actions/index';

class SignIn extends Component {
  componentWillUnmount() {
    this.props.resetAuthError();
  }

  onSubmit = values => {
    this.props.signIn(values, this.props.history);
  };

  renderAlert() {
    if (this.props.auth.error) {
      return <div className="alert">Oops! {this.props.auth.error}</div>;
    }
    return null;
  }

  render() {
    return (
      <div className="tab">
        <h1 className="tab-title">Log In</h1>
        <div className="tab-box signin__form">
          <form onSubmit={this.props.handleSubmit(this.onSubmit)}>
            <div>
              <Field
                className="form-input"
                type="text"
                name="email"
                component="input"
                placeholder="Email"
              />
            </div>
            <div>
              <Field
                className="form-input"
                type="password"
                name="password"
                component="input"
                placeholder="Password"
              />
            </div>
            <button className="mid-btn" type="submit">
              Login
            </button>
            {this.props.auth.error ? (
              <div className="alert">Oops! {this.props.auth.error}</div>
            ) : null}
          </form>
          <a href="/auth/google" className="mid-btn google align-center">
            <GoogleIcon size={28} color="#F90101" />
            &nbsp;Log in with Google
          </a>
          <div>
            <Link to="/" className="link cancel">
              Cancel
            </Link>
            <Link to="/signup" className="link">
              Not a member yet?
            </Link>
          </div>
        </div>
      </div>
    );
  }
}

const mstp = state => {
  return { auth: state.auth };
};

export default withRouter(
  connect(mstp, actions)(
    reduxForm({
      form: 'logInForm'
    })(SignIn)
  )
);
