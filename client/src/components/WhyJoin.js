import React, { Component } from 'react';
import "../styles.css";

class WhyJoin extends Component {
  render() {
		return <div className="section2">
        <div className="column" id="s20">
          <h1 className="text-1">Why Join Us ?</h1>
        </div>
        <div className="column" id="s21">
          <p className="half">SECTION 2.1.A</p>
          <p className="half">SECTION 2.1.B</p>
        </div>
        <div className="column" id="s22">
          <p className="half">SECTION 2.2.A</p>
          <p className="half">SECTION 2.2.B</p>
        </div>
        <div className="column" id="s23">
          <p className="half">SECTION 2.3.A</p>
          <p className="half">SECTION 2.3.B</p>
        </div>
      </div>;
    return <div className="con tainer-fluid why">
        <h1 className="header text-center p-5">Why Join Us ?</h1>
        <div className="row mt-5 align-content-start">
          <div class="col-sm-2 offset-sm-2 text-center">
            <img className="m-4" src="https://png.icons8.com/color/50/000000/bitcoin.png" alt="Generic placeholder image" width="75" height="75" />
            <h2>Structured Savings Plan</h2>
            <p>
              Donec sed odio dui. Etiam porta sem malesuada magna mollis
              euismod. Nullam id dolor id nibh ultricies vehicula ut id
              elit.
            </p>
          </div>
          <div class="col-sm-2 offset-sm-1 text-center">
            <img className="m-4" src="https://png.icons8.com/color/50/000000/bank-cards.png" alt="Generic placeholder image" width="75" height="75" />
            <h2>Build Credit</h2>
            <p>
              Duis mollis, est non commodo luctus, nisi erat porttitor
              ligula, eget lacinia odio sem nec elit. Cras mattis
              consectetur purus sit amet fermentum.
            </p>
          </div>
          <div class="col-sm-2 offset-sm-1 text-center">
            <img className="m-4" src="https://png.icons8.com/color/50/000000/conference-background-selected.png" alt="Generic placeholder image" width="75" height="75" />
            <h2>Verified Users</h2>
            <p>
              Donec sed odio dui. Cras justo odio, dapibus ac facilisis in,
              egestas eget quam. Vestibulum id ligula porta felis euismod
              semper.
            </p>
          </div>
        </div>
        <div className="row mt-1 p-0 justify-content-center">
          <button className="btn btn-outline-success large" href="">
            JOIN NOW
          </button>
        </div>
      </div>;
  }
}

export default WhyJoin;
