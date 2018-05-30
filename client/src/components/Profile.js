import React, { Component } from 'react';
import { connect } from 'react-redux';
import moment from 'moment';
import * as actions from '../actions/index';

import './styles/profile.css';

class Profile extends Component {
  componentDidMount() {
    this.props.fetchProfile(this.props.match.params.id);
  }

  render() {
    if (!this.props.prof.profile) {
      return <div>Loading...</div>;
    } else {
      const { profile } = this.props.prof;
      const date = moment(profile.createdAt).format('MMMM YYYY');
      return (
        <div className="tab" style={{ padding: '50px' }}>
          <img className="pic__thumb" src={profile.profilePic} alt="" />
          <h1 className="text-2">
            {profile.first_name} {profile.last_name}
          </h1>
          <ul className="info__list">
            <li
              className="info__listitem"
              style={{ 'listStyleType': 'none' }}
            >
              Pooli Score: {profile.ccScore}
            </li>
            <li className="info__listitem">
              {profile.city}, {profile.state}
            </li>
            <li className="info__listitem">Joined {date}</li>
          </ul>
        </div>
      );
    }
  }
}

const mstp = ({ prof }) => {
  return { prof };
};

export default connect(mstp, actions)(Profile);
