import React, { Component } from 'react';
import { BrowserRouter, Route } from 'react-router-dom';
import { connect } from 'react-redux';
import Header from './Header';
import Dashboard from './Dashboard';
import Profile from './Profile';
import PoolDetail from './PoolDetail';
import AllPools from './AllPools';
import Create from './Create';
import Logout from './Logout';
import SignIn from './SignIn';
import Signup from './signup/Signup'
import Landing from './Landing';
import OAuthSignUp from './OAuthSignUp';
import OAuthSignIn from './OAuthSignIn';
import Help from './Help';
import Settings from './Settings';
import Footer from './Footer';
import * as actions from '../actions';
import './styles/global.css';

class App extends Component {
  componentDidMount() {
    const token = localStorage.getItem('token');
    token && this.props.fetchUser(token)
  }

  render() {
    return (
      <div>
        <BrowserRouter>
          <div className="contain">
            <Header />
            <Route path="/dashboard" component={Dashboard} />
            <Route exact path="/profile/:id" component={Profile} />
            <Route exact path="/pools/:id" component={PoolDetail} />
            <Route exact path="/pools" component={AllPools} />
            <Route path="/create" component={Create} />
            <Route path="/logout" component={Logout} />
            <Route path="/signin" component={SignIn} />
            <Route path="/signup" component={Signup} />
						<Route path="/oauthsignup" component={OAuthSignUp} />
						<Route path="/oauthsignin" component={OAuthSignIn} />
            <Route path="/help" component={Help} />
            <Route path="/settings" component={Settings} />
            <Route exact path="/" component={Landing} />
            <Footer />
          </div>
        </BrowserRouter>
      </div>
    );
  }
}

export default connect(null, actions)(App);
