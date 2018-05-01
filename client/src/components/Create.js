import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class Create extends Component {
	render() {
		return <div>
        CREATE POOL.JS
        <Link className="button" to={"/review"}>
          REVIEW
        </Link>
      </div>;
	}
}

export default Create;