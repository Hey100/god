import React from "react";
import '../styles.css';

const Welcome = () => {
  return <div className="container-fluid">
			{/* TOP CONTAINER */}
      <div className="row text-center justify-content-center align-items-center">
        <div className="col-md-6 p-5">
          <h1 className="header">
            WELCOME TO <span className="accent">CC</span>
          </h1>
          <h1 className="m-5 turquoise">
            Get your projects started now, either with friends or solo, just
            one click and you're in!
          </h1>
          <button type="button" class="btn btn-outline-info large turquoise">
            JOIN NOW
          </button>
        </div>
        <img className="col-md-6 text-center" src="https://i.imgur.com/7yWORGy.png" alt="" />
      </div>
			{/* BOTTOM CONTAINER */}
      <div className="row">
        <div className="col-md-12">
          <h1 className="header text-center mt-5">HOW WE WORK</h1>
        </div>
        <div className="">
          <a className="btn btn-success">JOIN NOW</a>
          <a className="btn btn-warning">QUESTIONS?</a>
        </div>
      </div>
    </div>;
};

export default Welcome;