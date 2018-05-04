import React, { Component } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import * as actions from "../actions";

class Header extends Component {

  renderProfile = () => {
    if (this.props.auth.user) {
      const { first_name, last_name } = this.props.auth.user;
      const name = first_name + " " + last_name.charAt(0) + ".";
      return (
        <Link to="/dashboard" className="btn btn-info btn-md">
          <span className="glyphicon glyphicon-user" /> {name}
        </Link>
      );
    }
    return null;
  };

  render() {
    const loginStatus = this.props.auth.user;
    const button = !loginStatus ? (
      <Link className="button" to={"/login"}>
        Sign In
      </Link>
    ) : (
      [
        <Link key={1} className="button" to={"/dashboard"}>
          My Profile
        </Link>,
        <Link key={2} className="button" to={"/logout"}>
          Logout
        </Link>
      ]
    );
    return <div className="header">
        <div className="nav-left">
          {loginStatus ? <Link className="button" id="title" to={"/dashboard"}>
              CommunityCapital
            </Link> : <Link className="button" id="title" to={"/"}>
              CommunityCapital
            </Link>}
        </div>
        <div className="nav-right">
          {button}
          <Link className="button" to={"/newpool"}>
            Start a pool
          </Link>
          {button}
          <input type="text" className="input" placeholder="search pools.." />
          {this.renderProfile()}
        </div>
      </div>;
  }
}

const mstp = state => {
  return { auth: state.auth };
};

export default connect(mstp, actions)(Header);

// class Header extends Component {
//   renderProfile = () => {
// 		if (this.props.auth.user) {
//       const { first_name, last_name } = this.props.auth.user;
//       const name = first_name + ' ' + last_name.charAt(0) + '.';
//       return (
//         <Link to="/dashboard" className="btn btn-info btn-md">
//           <span className="glyphicon glyphicon-user" /> {name}
//         </Link>
//       );
//     }
//     return null;
//   };

//   render() {
//     const loginStatus = this.props.auth.user;
//     const button = !loginStatus ? (
//       <Link className="dropdown-item" to={'/login'}>
//         Sign In
//       </Link>
//     ) : (
//       [
//         <Link key={1} className="dropdown-item" to={'/dashboard'}>
//           My Profile
//         </Link>,
//         <Link key={2} className="dropdown-item" to={'/logout'}>
//           Logout
//         </Link>
//       ]
//     );
//     return (
//       <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
//         <div className="container">
//           {loginStatus ? (
//             <Link className="navbar-brand" to={'/dashboard'}>
//               CommunityCapital
//             </Link>
//           ) : (
//             <Link className="navbar-brand" to={'/'}>
//               CommunityCapital
//             </Link>
//           )}
//           <button
//             className="navbar-toggler"
//             type="button"
//             data-toggle="collapse"
//             data-target="#navbarsExample07"
//             aria-controls="navbarsExample07"
//             aria-expanded="false"
//             aria-label="Toggle navigation"
//           >
//             <span className="navbar-toggler-icon" />
//           </button>

//            <div className="collapse navbar-collapse" id="navbarsExample07">
//              <ul className="navbar-nav mr-auto">
//                <li className="nav-item active">
//                  <a className="nav-link" href="#">
//                    {/* Home <span className="sr-only">(current)</span> */}
//                    Join a Club
//                  </a>
//                </li>
//                <li className="nav-item dropdown">
//                  <a
//                   className="nav-link dropdown-toggle"
//                   href="#"
//                   id="dropdown07"
//                   data-toggle="dropdown"
//                   aria-haspopup="true"
//                   aria-expanded="false"
//                 >
//                   <span className="oi oi-menu" />
//                 </a>
//                 <div className="dropdown-menu" aria-labelledby="dropdown07">
//                   <a className="dropdown-item" href="#">
//                     How it Works
//                   </a>
//                   <a className="dropdown-item" href="#">
//                     FAQ
//                   </a>
//                   <a className="dropdown-item" href="#">
//                     About Us
//                   </a>
//                   <div className="dropdown-divider" />
//                   {button}
//                 </div>
//               </li>
//             </ul>
// //             <form className="form-inline my-2 my-md-0">
//                <input
//                 className="form-control"
//                 type="text"
//                 placeholder="Search"
//                 aria-label="Search"
//               />
//             </form>
//             {this.renderProfile()}
//           </div>
//         </div>
//       </nav>
//     );
//   }
// }

// const mstp = state => {
//   return { auth: state.auth };
// };

// export default connect(mstp, actions)(Header);
