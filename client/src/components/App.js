import React, { Component } from 'react';
import { BrowserRouter, Route } from 'react-router-dom';
import Header from './Header';
import Welcome from './Welcome';
import WhyJoin from './WhyJoin';
import Questions from './Questions';
import Footer from './Footer';
import Form from "./Form";

class App extends Component {
  render() {
    return <div>
        <BrowserRouter>
					<div className="container" >
						<Header/>
						<Form/>
						{/* <Welcome />
						<WhyJoin />
						<Questions /> */}
						<Footer/>
					</div>
        </BrowserRouter>
      </div>;
  }
}

export default App;
