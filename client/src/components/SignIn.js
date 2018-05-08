import React, { Component } from 'react';
import { reduxForm, Field } from 'redux-form';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import { GoogleIcon, FacebookIcon } from "mdi-react";

import "./styles/global.css";
import "./styles/media.css";
import * as actions from '../actions/index';

class SignIn extends Component {
  onSubmit = values => {
    this.props.onLogin(values, this.props.history);
  };

  renderAlert() {
    if (this.props.auth.error) {
      return (
        <div className= "">
          <strong>Oops!</strong> {this.props.auth.error}
        </div>
      );
    }
  }

  render() {
    return <div className="form-wrap">
        <form onSubmit={this.props.handleSubmit(this.onSubmit)}>
          <div>
            <Field className="form-input" type="text" name="email" component="input" placeholder="Email"/>
          </div>
          <div>
            <Field className="form-input" type="password" name="password" component="input" placeholder="Password"/>
          </div>
          <button className="mid-btn" type="submit">
            Login
          </button>
					<hr className="separator" />
          <button className="mid-btn" style={{ backgroundColor: '#FFF', color: 'tomato', border: '2px solid tomato'}}>
						Sign Up with Google <GoogleIcon size={28} color="tomato"/>
					</button>
					<button className="mid-btn" style={{ backgroundColor: '#3B5998', color: 'white'}}>
						Sign Up with Facebook <FacebookIcon size={28} color="#FFF"/>
					</button>
          {this.renderAlert()}
          <div>
            <Link to="/" className="button cancel">
              Cancel
            </Link>
            <Link to="/signup" className="button">
              Not a member yet?
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
    })(SignIn)
  )
);
