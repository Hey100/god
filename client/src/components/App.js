import React, { Component } from 'react';
import { BrowserRouter, Route } from 'react-router-dom';
import Header from './Header';
// import Welcome from './Welcome';
import WhyJoin from './WhyJoin';
import Login from './Login';
import Logout from './Logout';
import Signup from './signup/Signup';
import Dashboard from './Dashboard';
import * as actions from '../actions';
import { connect } from 'react-redux';
import { AUTH_USER } from '../actions/types';
// import Footer from './Footer';

class App extends Component {
  componentDidMount() {
  	this.props.fetchUser()
  }

  render() {
    return (
      <div>
        <BrowserRouter>
          <div>
            <Header />
            {/* <Welcome /> */}
            <Route path="/dashboard" component={Dashboard} />
            <Route path="/login" component={Login} />
            <Route path="/logout" component={Logout} />
            <Route path="/signup" component={Signup} />
            <Route exact path="/" component={WhyJoin} />
            {/* <Footer /> */}
          </div>
        </BrowserRouter>
      </div>
    );
  }
}

export default connect(null, actions)(App);
