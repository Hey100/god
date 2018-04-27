import React, { Component } from 'react';

class WhyJoin extends Component {
  render() {
    return (
      <div class="container">
        <div class="px-3 py-3 pt-md-5 pb-md-4 mx-auto text-center">
          <h1 class="display-10">Why Join a Club?</h1>
          <hr />
        </div>
        <div class="row">
          <div class="col-lg-4">
            <img
              className="center-block"
              src="https://png.icons8.com/color/50/000000/bitcoin.png"
              alt="Generic placeholder image"
              width="75"
              height="75"
            />
            <h2 className="text-center">Structured Savings Plan</h2>
            <p className="text-center">
              Donec sed odio dui. Etiam porta sem malesuada magna mollis
              euismod. Nullam id dolor id nibh ultricies vehicula ut id elit.
              Morbi leo risus, porta ac consectetur ac, vestibulum at eros.
              Praesent commodo cursus magna.
            </p>
          </div>
          <div class="col-lg-4">
            <img
              className="center-block"
              src="https://png.icons8.com/color/50/000000/bank-cards.png"
              alt="Generic placeholder image"
              width="75"
              height="75"
            />
            <h2 className="text-center">Build Credit</h2>
            <p className="text-center">
              Duis mollis, est non commodo luctus, nisi erat porttitor ligula,
              eget lacinia odio sem nec elit. Cras mattis consectetur purus sit
              amet fermentum. Fusce dapibus, tellus ac cursus commodo, tortor
              mauris condimentum nibh.
            </p>
          </div>
          <div class="col-lg-4">
            <img
              className="center-block"
              src="https://png.icons8.com/color/50/000000/conference-background-selected.png"
              alt="Generic placeholder image"
              width="75"
              height="75"
            />
            <h2 className="text-center">Verified Users</h2>
            <p className="text-center">
              Donec sed odio dui. Cras justo odio, dapibus ac facilisis in,
              egestas eget quam. Vestibulum id ligula porta felis euismod
              semper. Fusce dapibus, tellus ac cursus commodo, tortor mauris
              condimentum nibh, ut fermentum massa justo sit amet risus.
            </p>
          </div>
        </div>
        <hr />
        <div className="text-center">
          <a href="#" className="btn btn-light btn-xl">
            Sign Up
          </a>
        </div>
      </div>
    );
  }
}

export default WhyJoin;
