import React, { Component } from 'react';
import { reduxForm, Field } from 'redux-form';
import { connect } from 'react-redux';
import _ from 'lodash';
import formFields from './formFields';
import CreateField from './CreateField';
import Chart from '../Chart';
import * as actions from '../../actions/index';
import "../styles/create.css";
import "../styles/global.css";
import "../styles/media.css";

class Create extends Component {
  state = {
    contributors: null
  };
  componentDidMount() {
    window.scrollTo(0, 0);
  }

  renderFields() {
    return _.map(formFields, ({ label, name, type, placeholder }) => {
      return (
        <Field
					key={name}
          component={CreateField}
          name={name}
          type={type}
					placeholder={label}
        />
      );
    });
  }

  handleChart = () => {
    if (this.props.pools.chart) {
      return (
        <Chart
          onSubmit={this.props.onSubmit}
          chart={this.props.pools.chart}
          state={this.state}
        />
      );
    }
    return null;
  };

  handleChange = event => {
    this.setState({ [event.target.name]: event.target.value }, () => {
      if (
        this.state.contributors &&
        this.state.amount &&
        this.state.rate &&
        this.state.date
      ) {
        this.setState({ selection: null });
        let obj = {};
        obj['amount'] = this.state.amount;
        obj['contributors'] = this.state.contributors;
        obj['rate'] = this.state.rate;
        obj['date'] = this.state.date;
        obj['title'] = this.state.title;
        obj['category'] = this.state.category;
        obj['description'] = this.state.description;
        this.props.createChart(obj);
      }
    });
  };

  renderAmount = () => {
    if (this.state.contributors) {
      let n = this.state.contributors;
      let value = n * 100;
      const handleText = (value, num) => {
        let number = value * num;
        return parseFloat(number).toLocaleString('USD', {
          style: 'currency',
          currency: 'USD',
          minimumFractionDigits: 0,
          maximumFractionDigits: 0
        });
      };
      return (
        <select
          name="amount"
          className="form-input select"
          onChange={this.handleChange}
        >
          <option selected value="">
            Amount
          </option>
          <option value={value * 2}>{handleText(value, 2)}</option>
          <option value={value * 3}>{handleText(value, 3)}</option>
          <option value={value * 4}>{handleText(value, 4)}</option>
          <option value={value * 5}>{handleText(value, 5)}</option>
          <option value={value * 6}>{handleText(value, 6)}</option>
          <option value={value * 7}>{handleText(value, 7)}</option>
          <option value={value * 8}>{handleText(value, 8)}</option>
        </select>
      );
    }
    return null;
  };

  renderRate = () => {
    if (this.state.amount) {
      return (
        <select
          name="rate"
          className="form-input select"
          onChange={this.handleChange}
        >
          <option value="">Rate</option>
          <option value="5">5%</option>
          <option value="7">7%</option>
          <option value="9">9%</option>
          <option value="10">10%</option>
        </select>
      );
    }
    return null;
  };

  renderDate = () => {
    if (this.state.rate) {
      return (
        <input
          onChange={this.handleChange}
          className="form-input"
          style={{ marginBottom: '2px' }}
          type="date"
          name="date"
          placeholder="Start Date"
        />
      );
    }
    return null;
  };

  render() {
    return (
        <div className="form-wrap">
					<h2 className="text-2">1. Give Your Pool a Name and Some Details</h2>
					<input className="form-input" type="text" name="title" placeholder="Title" onChange={this.handleChange} />
					<select className="form-input select" name="category" onChange={this.handleChange}put>
						<option selected value="">
							Category
						</option>
						<option value="Business">Business</option>
						<option value="Sports">Sports</option>
						<option value="Home Improvement">Home Improvement</option>
						<option value="Travel">Travel</option>
					</select>
					<textarea name="description" className="form-input textarea" cols="40" rows="10" onChange={this.handleChange} placeholder="Please provide a description of your pool" />
					<h2 className="text-2">2. Choose Your Options</h2>
					<select name="contributors" className="form-input select" onChange={this.handleChange}put>
						<option selected value="">
							Number of Contributors
						</option>
						<option value="5">5 contributors</option>
						<option value="7">7 contributors</option>
						<option value="9">9 contributors</option>
						<option value="11">11 contributors</option>
						<option value="13">13 contributors</option>
					</select>
					{this.renderAmount()}
					{this.renderRate()}
					{this.renderDate()}
					{this.handleChart()}
				</div>
		);
  }
}

const validate = values => {
  const errors = {};

  _.each(formFields, ({ name, noValueError }) => {
    if (!values[name]) {
      errors[name] = noValueError;
    }
  });
  return errors;
};

const mstp = ({ pools, form }) => {

  return { pools, form };
};

export default connect(mstp, actions)(
  reduxForm({
    validate,
    form: 'poolForm',
    destroyOnUnmount: false
  })(Create)
);
