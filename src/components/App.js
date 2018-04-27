import React, { Component } from 'react';
import { BrowserRouter, Route } from 'react-router-dom';
import Header from './Header';
import Welcome from './Welcome';
import Footer from './Footer';
class App extends Component {
  render() {
    return <div>
        <BrowserRouter>
          <div>
            <Header />
            <Welcome />
            <Footer />
          </div>
        </BrowserRouter>
      </div>;
  }
}

export default App;
