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
    return <div className="form">
        <form className="form-sec" onSubmit={this.props.handleSubmit(this.onSubmit)}>
          <div>
            Email
            <Field className="form-in" type="text" name="email" component="input" />
          </div>
          <div>
            Password
            <Field className="form-in" type="password" name="password" component="input" />
          </div>
          <button className="mid-btn" type="submit">
            Login
          </button>
          {this.renderAlert()}
          <div>
            <Link to="/" className="button cancel">
              Cancel
            </Link>
            <Link to="/signup" className="button">
              Sign up
            </Link>
          </div>
        </form>
      </div>;
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
