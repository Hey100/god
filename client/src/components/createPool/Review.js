import React, { Component } from 'react';
import Chart from '../Chart';
import { connect } from 'react-redux';
import _ from 'lodash';
import * as actions from '../../actions/index';
import formFields from './formFields';
import { withRouter } from 'react-router';

class Review extends Component {
  componentDidMount() {
    window.scrollTo(0, 0);
  }

  reviewFields = _.map(formFields, ({ label, name }) => {
    const values = this.props.formValues;
    return (
      <div key={name} className="form-sec">
        <h5>{label}</h5>
        <div>{values[name]}</div>
      </div>
    );
  });

  render() {
    const { form } = this.props.pools;
    const { history, createPool, pools } = this.props;
    return (
      <div>
        <div className="form-sec">
          <h2 className="text-2">Review Your Pool</h2>
        </div>
        {this.reviewFields}
        <Chart chart={this.props.pools.chart} onCancel={this.props.onCancel} />
        <div className="form-sec">
          <a className="big-btn" onClick={() => createPool(form, pools.selection, history)}>
            Submit
          </a>
          <button className="button" onClick={this.props.onCancel}>
            Back
          </button>
        </div>
      </div>
    );
  }
}

const mstp = ({pools}) => {
  return { pools };
};

export default connect(mstp, actions)(withRouter(Review));
