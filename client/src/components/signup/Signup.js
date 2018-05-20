import React, { Component } from 'react';
import { reduxForm, Field } from 'redux-form';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import { LockAlertIcon } from 'mdi-react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { UploadIcon } from 'mdi-react';
import _ from 'lodash';

import * as actions from '../../actions/index';
import SignUpField from './SignUpField';
import formFields from './formFields';
import '../styles/signup.css';
import '../styles/loader.css';
import '../styles/global.css';
import '../styles/media.css';

class Signup extends Component {
  state = {
    agree: false,
    imageErr: '',
    selectedFile: null,
    path: null,
    imageLoading: false
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
    const { agree, email, password, c_password } = this.state;
    if (!agree) {
      this.setState({
        agreeErr: 'You must agree to our terms and conditions before signing up'
      });
    } else if (!this.props.auth.googleSignUp) {
      if (!email) {
        this.setState({
          emailErr: 'Required Field'
        });
      } else if (!password) {
        this.setState({
          passwordErr: 'Required Field'
        });
      } else if (!c_password) {
        this.setState({
          c_passwordErr: 'Required Field'
        });
      } else if (password !== c_password) {
        this.setState({
          mismatchErr: 'Passwords must match'
        });
      } else if (!this.state.passwordTest) {
        this.setState({
          passwordStructure:
            'Passwords must contain at least 8 characters, including one number, one uppercase letter, and one special character'
        });
			}
			else {
				this.props.onSignUp(values, this.props.history);
			}
		} 
		else {
			this.props.OAuthSignUp(values, this.props.history)
    }
  };

  handleChange = event => {
    this.state.agreeErr ? this.setState({ agreeErr: '' }) : null;
    this.setState({ agree: !this.state.agree });
  };

  handeChangeII = e => {
    this.setState({ imageErr: '' });
    this.setState({ selectedFile: e.target.files[0] });
  };

  upload = async () => {
    this.setState({ imageLoading: true });
    const fd = new FormData();
    fd.append('image', this.state.selectedFile, this.state.selectedFile.name);
    const res = await axios.post('/api/upload', fd);
    if (res.data.err) {
      this.setState({ imageErr: res.data.err });
    } else {
      this.setState({
        imageErr: '',
        path: res.data.secure_url,
        imageLoading: false
      });
    }
  };

  handleEmailPassword = event => {
    this.setState({ [event.target.name + 'Err']: '' });
    this.setState({ mismatchErr: '' });
    this.setState({ passwordStructure: '' });
    this.setState({ [event.target.name]: event.target.value }, () => {
      const { password, c_password } = this.state;
      let regex = /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[^\w\s]).{8,}$/;
      const passErr =
        'Passwords must contain at least 8 characters, including one number, one uppercase letter, and one special character';
      if (password && password.length < 8) {
        this.setState({ passwordStructure: passErr });
      }
      if (password && !regex.test(password)) {
        this.setState({ passwordStructure: passErr });
      }
      if (password && regex.test(password)) {
        this.setState({ passwordTest: true });
      }
      if (password && c_password) {
        if (password !== c_password) {
          this.setState({ mismatchErr: 'Passwords must match' });
        }
      }
    });
  };

  renderAlert(error) {
    if (error) {
      return <div className="alert">Oops! {this.props.auth.error}</div>;
    }
  }

  render() {
    const {
      emailErr,
      passwordErr,
      c_passwordErr,
      mismatchErr,
      imageErr,
      agreeErr,
      path,
      selectedFile,
      imageLoading,
      passwordStructure
    } = this.state;
    const { error, googleSignUp } = this.props.auth;
    return (
      <div className="tab">
        {this.renderAlert(error)}
        <div className="tab-box">
          <form
            className="signup__form"
            onSubmit={this.props.handleSubmit(this.onSubmit)}
          >
            {!googleSignUp ? (
              <Link to="/signin" className="link">
                Already a member?
              </Link>
            ) : null}
            <h2 className="text-2">
              Please provide a few details about yourself
            </h2>
            {this.renderFields()}
            <h2 className="text-2">Save Your Information</h2>
            <div className="form-upload">
              <label className="form-file-label align-center">
                <UploadIcon size="24" color="gray" />&nbsp;<strong>
                  Select or drag a picture
                </strong>
              </label>
              <input type="file" onChange={this.handeChangeII} />
              {imageLoading ? (
                <div className="jumper">
                  <div />
                  <div />
                  <div />
                </div>
              ) : null}
              {path && !imageLoading ? <img src={path} /> : null}
              {selectedFile ? (
                <button onClick={() => this.upload()}>Upload</button>
              ) : null}
            </div>
            {imageErr ? <p className="alert">{imageErr}</p> : null}
            {!googleSignUp ? (
              <div>
                <Field
                  className="form-input"
                  component="input"
                  name="email"
                  type="text"
                  placeholder="Email"
                  onChange={this.handleEmailPassword}
                />
                {emailErr ? (
                  <div
                    className="alert"
                    style={{ marginBottom: '10px', color: 'tomato' }}
                  >
                    {emailErr}
                  </div>
                ) : null}
                <Field
                  className="form-input"
                  component="input"
                  name="password"
                  type="password"
                  placeholder="Password"
                  onChange={this.handleEmailPassword}
                />
                {passwordErr ? (
                  <div
                    className="alert"
                    style={{ marginBottom: '10px', color: 'tomato' }}
                  >
                    {passwordErr}
                  </div>
                ) : null}
                <Field
                  className="form-input"
                  component="input"
                  name="c_password"
                  type="password"
                  placeholder="Confirm password"
                  onChange={this.handleEmailPassword}
                />
                {c_passwordErr ? (
                  <div
                    className="alert"
                    style={{ marginBottom: '10px', color: 'tomato' }}
                  >
                    {c_passwordErr}
                  </div>
                ) : null}
                {mismatchErr ? (
                  <h5 className="warning">{mismatchErr}</h5>
                ) : null}
                <div className="warning">
                  {passwordStructure ? <h5>{passwordStructure}</h5> : null}
                </div>
              </div>
            ) : null}
            <div className="signup__terms">
              {agreeErr ? (
                <div
                  className="alert"
                  style={{ marginBottom: '10px', color: 'tomato' }}
                >
                  {agreeErr}
                </div>
              ) : null}
              <div id="signup__agreement">
                <input
                  type="checkbox"
                  name="accept request"
                  onChange={this.handleChange}
                />{' '}
                By checking the box, clicking "agree and see your rate" below,
                you confirm:
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
