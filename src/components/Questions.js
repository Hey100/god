import React, { Component } from "react";
import "../styles.css";

class Questions extends Component {
  render() {
    return (
      <div className="section3">
        <div className="half" id="s3l">
          <p>SECTION 3 - LEFT</p>
        </div>
        <div className="half" id="s3r">
          <p>SECTION 3 - RIGHT</p>
        </div>
      </div>
    );
  }
}

export default Questions;
