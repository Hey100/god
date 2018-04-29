import React, { Component } from 'react';
import { BrowserRouter, Route } from 'react-router-dom';
import Header from './Header';
// import Welcome from './Welcome';
import WhyJoin from './WhyJoin';
import Login from './Login';
import Signup from './Signup';
import Dashboard from './Dashboard';
// import Footer from './Footer';

class App extends Component {
  render() {
    return (
      <div>
        <BrowserRouter>
          <div>
            <Header />
            {/* <Welcome /> */}
            <Route exact path="/dashboard" component={Dashboard} />
            <Route exact path="/login" component={Login} />
            <Route exact path="/signup" component={Signup} />
            <Route exact path="/" component={WhyJoin} />
            {/* <Footer /> */}
          </div>
        </BrowserRouter>
      </div>
    );
  }
}

export default App;
