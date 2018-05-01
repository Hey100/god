import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class Review extends Component {
	render() {
		return <div>
        REVIEW THE POOL YO!
        <Link className="button" to={"/create"}>
          GO BACK
        </Link>
				<a href="#" className="button">CREATE POOL</a>
      </div>;
	}
}

export default Review;