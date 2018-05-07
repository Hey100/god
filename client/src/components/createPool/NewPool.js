import React, { Component } from 'react';
import { reduxForm } from 'redux-form';
import Create from './Create';
import Review from './Review';
import { connect } from 'react-redux';
import * as actions from '../../actions/index';

class NewPool extends Component {
  componentDidMount() {
    if (this.props.pools.chart) {
      this.props.reset();
    }
  }

  state = {
    show: false
  };
  render() {
    if (this.state.show) {
      return <Review onCancel={() => this.setState({ show: false })} />;
    }
    return <Create onSubmit={() => this.setState({ show: true })} />;
  }
}

const mstp = ({ pools }) => {
  return { pools };
};

export default connect(mstp, actions)(
  reduxForm({
    form: 'poolForm'
  })(NewPool)
);
