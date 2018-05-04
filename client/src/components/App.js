import React, { Component } from 'react';
import { BrowserRouter, Route } from 'react-router-dom';
import { connect } from 'react-redux';
import Landing from './Landing';
import Header from './Header';
import Login from './Login';
import Logout from './Logout';
import Signup from './signup/Signup';
import Dashboard from './Dashboard';
import MyPools from './MyPools';
import AllPools from './AllPools';
import NewPool from './createPool/NewPool';
import Create from './createPool/Create';
import Review from './createPool/Review';
import Footer from './Footer';
import * as actions from '../actions';

class App extends Component {
  componentDidMount() {
  	this.props.fetchUser()
  }

  render() {
    return (
      <div>
        <BrowserRouter>
          <div className="contain">
            <Header />
            <Route path="/dashboard" component={Dashboard} />
            <Route path="/mypools" component={MyPools} />
            <Route path="/pools" component={AllPools} />
            <Route path="/newpool" component={NewPool} />
            <Route path="/create" component={Create} />
            <Route path="/review" component={Review} />
            <Route path="/login" component={Login} />
            <Route path="/logout" component={Logout} />
            <Route path="/signup" component={Signup} />
            <Route exact path="/" component={Landing} />
            <Footer />
          </div>
        </BrowserRouter>
      </div>
    );
  }
}

export default connect(null, actions)(App);
