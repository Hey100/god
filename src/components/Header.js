import React, { Component } from 'react';

class Header extends Component {
  render() {
    return <nav class="navbar navbar-expand-lg navbar-dark bg-dark">
        <div class="container">
          <a class="navbar-brand" href="#">
            CommunityCapital
          </a>
          <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarsExample07" aria-controls="navbarsExample07" aria-expanded="false" aria-label="Toggle navigation">
            <span class="navbar-toggler-icon" />
          </button>

          <div class="collapse navbar-collapse" id="navbarsExample07">
            <ul class="navbar-nav mr-auto">
              <li class="nav-item active">
                <a class="nav-link" href="#">
                  {/* Home <span class="sr-only">(current)</span> */}
                  Join a Club
                </a>
              </li>
              <li class="nav-item dropdown">
                <a class="nav-link dropdown-toggle" href="#" id="dropdown07" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                  <span class="oi oi-menu" />
                </a>
                <div class="dropdown-menu" aria-labelledby="dropdown07">
                  <a class="dropdown-item" href="#">
                    How it Works
                  </a>
                  <a class="dropdown-item" href="#">
                    FAQ
                  </a>
                  <a class="dropdown-item" href="#">
                    About Us
                  </a>
                  <div class="dropdown-divider" />
                  <a class="dropdown-item" href="#">
                    Sign In
                  </a>
                </div>
              </li>
            </ul>
            <form class="form-inline my-2 my-md-0">
              <input class="form-control" type="text" placeholder="Search" aria-label="Search" />
            </form>
          </div>
        </div>
      </nav>;
  }
}

export default Header;
