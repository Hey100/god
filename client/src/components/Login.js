import React, { Component } from 'react';
import { reduxForm, Field } from 'redux-form';
import { Link } from 'react-router-dom';
import * as actions from '../actions/index';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';

class Login extends Component {
  onSubmit = values => {
    this.props.onLogin(values, this.props.history);
  };

  renderAlert() {
    if (this.props.auth.error) {
      return (
        <div className= "alert alert-danger">
          <strong>Oops!</strong> {this.props.auth.error}
        </div>
      );
    }
  }

  render() {
    return (
      <div className="container">
        <form onSubmit={this.props.handleSubmit(this.onSubmit)}>
          <label>Email</label>
          <Field type="text" name="email" component="input" />
          <label>Password</label>
          <Field type="password" name="password" component="input" />
          <Link to="/" className="red btn-flat white-text">
            Cancel
          </Link>
          <button className="teal btn-flat right white-text" type="submit">
            Login
          </button>
					{this.renderAlert()}
        </form>
        <hr />
        <Link to="/signup" className="teal btn-flat white-text">
          Sign up
        </Link>
      </div>
    );
  }
}

const mstp = state => {
	return { auth: state.auth }
}

export default withRouter(
  connect(mstp, actions)(
    reduxForm({
      form: 'logInForm'
    })(Login)
  )
);
