import React, { Component } from 'react';
import { connect } from 'react-redux';
import _ from 'lodash';
import * as actions from '../../actions/index'
import formFields from './formFields';
import { withRouter } from 'react-router';

class Review extends Component {
	reviewFields = _.map(formFields, ({ label, name }) => {
		const values = this.props.formValues
		return (
			<div key={name}>
				<label className="button">{label}</label>
				<div>{values[name]}</div>
			</div>
		)
	})

  render() {
		const values = this.props.formValues;
		const { history, createPool } = this.props;
    return (
      <div>
        {this.reviewFields}
        <button
          className="button"
          onClick={this.props.onCancel}
        >
          Back
        </button>
        <a className="button" onClick={() => createPool(values, history)}>
					Submit
        </a>
      </div>
    );
  }
}

const mstp = (state) => {
	return { formValues: state.form.poolForm.values }
}

export default connect(mstp, actions)(withRouter(Review));
