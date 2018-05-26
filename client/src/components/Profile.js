import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as actions from '../actions/index';

import './styles/profile.css'

class Profile extends Component {
  componentDidMount() {
    this.props.fetchProfile(this.props.match.params.id);
  }

  render() {
    if (!this.props.prof.profile) {
      return <div>Loading...</div>;
    } else {
      const { profile } = this.props.prof;
      return (
        <div className="tab">
          <img className="pic__thumb" src={profile.profilePic} alt="" />
					<h1 className="text-2">{profile.first_name} {profile.last_name}</h1>
					<h1 className="text-3">Pooli Score: {profile.ccScore}</h1>
        </div>
      );
    }
  }
}

const mstp = ({ prof }) => {
  return { prof };
};

export default connect(mstp, actions)(Profile);
