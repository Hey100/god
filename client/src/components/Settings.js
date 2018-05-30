import React, { Component } from 'react';
import { connect } from 'react-redux';
import './styles/settings.css';
import * as actions from '../actions/index';

class Settings extends Component {
  state = {
    currentPassword: '',
		newPassword: '',
		email: ''
  };

  componentDidMount() {
    this.props.resetAuthError();
  }

  handleChange = e => {
    this.setState({ currentPasswordErr: '' });
		this.setState({ newPasswordErr: '' });
		if(this.state.email === '') {
			this.setState({ currentEmail : this.props.auth.user.email}, () => {
				console.log(this.state.currentEmail)
			})
			this.props.auth.user.email = ''
		}
    if (e.target.name === 'newPassword') {
      this.setState({
        passwordReqs:
          'Passwords must contain at least 8 characters, including one number, one uppercase letter, and one special character'
      });
    }
    this.setState({ [e.target.name]: e.target.value });
    this.props.resetAuthError();
  };

  handleSave = () => {
    const { currentPassword, newPassword, email } = this.state;
    let regex = /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[^\w\s]).{8,}$/;
		console.log(this.state.currentEmail)
    if (!currentPassword) {
      this.setState({ currentPasswordErr: 'Required Field' });
    } else if (newPassword && !regex.test(newPassword)) {
      this.setState({ newPasswordErr: 'Invalid New Password' });
    } else {
      this.props.saveUpdatedUserInfo({
        currentEmail: this.props.auth.user.email || this.state.currentEmail,
        newEmail: email,
        currentPassword: currentPassword,
        newPassword: newPassword
      });
      this.setState({ currentPassword: '', newPassword: '', passwordReqs: '' });
    }
  };

  render() {
    if (!this.props.auth.user) {
      return (
        <div className="jumper">
          <div />
          <div />
          <div />
        </div>
      );
    } else {
      const { email } = this.props.auth.user;
      return (
        <div className="tab">
          {this.props.auth.error ? (
            <p className="error">{this.props.auth.error}</p>
          ) : null}
          {this.props.auth.success ? (
            <p className="success">{this.props.auth.success}</p>
          ) : null}
          {this.state.newPasswordErr ? (
            <p className="error">{this.state.newPasswordErr}</p>
          ) : null}
          <h1 className="tab-title">Settings</h1>
          <br />
          <p>Edit your email or password below.</p>
          <div style={{ padding: '50px' }}>
            <fieldset className="field">
              <legend>Email</legend>
              <input
                className="form-input"
                type="email"
                name="email"
                onChange={this.handleChange}
                value={this.state.email || email}
              />
            </fieldset>
            <fieldset>
              <legend>Current Password</legend>
              <input
                className="form-input"
                type="password"
                name="currentPassword"
                onChange={this.handleChange}
                value={this.state.currentPassword}
              />
              {this.state.currentPasswordErr ? (
                <p className="required">{this.state.currentPasswordErr}</p>
              ) : null}
            </fieldset>
            <fieldset>
              <legend>New Password</legend>
              <input
                className="form-input"
                type="password"
                name="newPassword"
                onChange={this.handleChange}
                value={this.state.newPassword}
              />
              {this.state.passwordReqs ? (
                <p className="password">{this.state.passwordReqs}</p>
              ) : null}
            </fieldset>
          </div>
          <div>
            <button
              onClick={() => this.handleSave()}
              style={{
                width: '100%'
              }}
              className="button"
            >
              Save
            </button>
            &nbsp;
            <button
              onClick={() => this.props.history.push('/dashboard')}
              className="cancel"
              style={{
                width: '100%',
                padding: '5px 10px',
                borderRadius: '5px'
              }}
            >
              Go Back
            </button>
          </div>
        </div>
      );
    }
  }
}

const mstp = ({ auth }) => {
  return { auth };
};

export default connect(mstp, actions)(Settings);
