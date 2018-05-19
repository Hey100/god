import React, { Component } from 'react';
import { BrowserRouter, Route } from 'react-router-dom';
import { connect } from 'react-redux';
import Header from './Header';
import Landing from './Landing';
import SignIn from './SignIn';
import Signup from './signup/Signup';
import Logout from './Logout';
import Dashboard from './Dashboard';
import GoogleToken from './GoogleToken';
import PoolDetail from './PoolDetail';
import AllPools from './AllPools';
import MyPools from './MyPools';
import Create from './Create';
import Help from './Help';
import Footer from './Footer';
import * as actions from '../actions';
import "./styles/global.css";

class App extends Component {
  componentDidMount() {
		const token = localStorage.getItem('token')
		token ? this.props.fetchUser(token) : null
  }

  render() {
    return (
      <div>
        <BrowserRouter>
          <div className="contain">
            <Header />
            <Route path="/dashboard" component={Dashboard} />
            <Route path="/setToken/:id/:boo" component={GoogleToken} />
            <Route path="/mypools" component={MyPools} />
            <Route exact path="/pools/:id" component={PoolDetail} />
            <Route exact path="/pools" component={AllPools} />
            <Route path="/create" component={Create} />
            <Route path="/signin" component={SignIn} />
            <Route path="/logout" component={Logout} />
            <Route path="/signup" component={Signup} />
            <Route path="/help" component={Help} />
            <Route exact path="/" component={Landing} />
            <Footer />
          </div>
        </BrowserRouter>
      </div>
    );
  }
}

export default connect(null, actions)(App);
