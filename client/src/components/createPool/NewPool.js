import React, { Component } from 'react';
import { reduxForm } from 'redux-form';
import Create from './Create';
import Review from './Review';

class NewPool extends Component {
  state = {
    show: false
  };
  render() {
    if (this.state.show) {
			return <Review onCancel={() => this.setState({ show: false })}/>;
		}
		return <Create onSubmit={() => this.setState({ show: true })}/>;
  }
}

export default reduxForm({
  form: 'poolForm'
})(NewPool);
