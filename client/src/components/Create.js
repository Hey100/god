import React, { Component } from 'react';
import { connect } from 'react-redux';
import moment from 'moment';
import axios from 'axios';
import { UploadIcon } from 'mdi-react';
import Chart from './Chart';
import * as actions from '../actions/index';
import './styles/chart.css';
import './styles/loader.css';
import './styles/global.css';
import './styles/media.css';
const fs = require("fs");

class Create extends Component {
	state = {
		contributors: null,
		error: '',
		visible: false,
		imageErr: '',
		selectedFile: null,
		path: null,
		imageLoading: false
	};

  componentDidMount() {
    if (this.props.pools.chart) {
      this.props.reset();
    }
  }

  //'handle' Functions
  handleChart = () => {
    if (this.props.pools.chart) {
      return (
        <div className="chart-wrap" >
          {!this.props.user ? <h2 className="text-2">3. Pick a Position</h2> : null}
          <Chart
            onSubmit={this.props.onSubmit}
            chart={this.props.pools.chart}
            state={this.state}
          />
          <p>*Amount before platform fee</p>
          <p>**1% Platform Fee (administered on Disbursement Date)</p>
        </div>
      );
    }
    return null;
  };
  handleChange = event => {
    const { error } = this.props.pools;
    //resetAll
    this.props.reset();
    //if error, reset error
    error ? this.props.resetError() : null;
    //hide renderReview()
    this.setState({ visible: false });
    //if user changes numOfContributors, reset all options & chart
    if (event.target.name === 'contributors') {
      this.setState({ amount: null, rate: null, startDate: null });
      this.props.reset();
    }
    //set error states
    this.setState({ [event.target.name + 'Err']: '' });
    //set value states
    this.setState({ [event.target.name]: event.target.value }, () => {
      if (this.state.startDate) {
        //check for future dates
        if (moment(this.state.startDate).format('L') <= moment().format('L')) {
          this.setState({ startDateErr: 'Date must be in the future' });
          this.props.reset();
          return;
        }
      }
      //create chart if all states exist
      if (
        this.state.contributors &&
        this.state.amount &&
        this.state.rate &&
        this.state.startDate
      ) {
        let obj = {};
        obj['amount'] = this.state.amount;
        obj['contributors'] = this.state.contributors;
        obj['rate'] = this.state.rate;
        obj['startDate'] = this.state.startDate;
        obj['title'] = this.state.title;
        obj['category'] = this.state.category;
        obj['description'] = this.state.description;
        this.props.createChart(obj);
      }
    });
	};
	handeChangeII = e => {
		this.setState({ imageErr: '' });
		this.setState({ selectedFile: e.target.files[0] });
	};

  upload = async () => {
		if (this.state.selectedFile) {
			const fd = new FormData();
			fd.append('image', this.state.selectedFile, this.state.selectedFile.name);
			const res = await axios.post('/api/upload', fd);
			if (res.data.err) {
				this.setState({ imageErr: res.data.err });
			} else {
				this.setState({
					imageErr: '',
					path: res.data.secure_url,
					imageLoading: false,
					relative: `${res.data.original_filename}.${res.data.format}`
				});
			}
		} else {
			this.setState({ imageErr: 'Error: No File Selected!' });
		}
  };

  handleMouseDown = event => {
    this.setState({ startDateErr: '' });
  };
  handleNext() {
    if (this.props.pools.selection === '') {
      this.props.setError('Please Select a Position in the Chart');
    } else if (!this.state.title) {
      window.scrollTo(0, 0);
      this.setState({ titleErr: 'Required Field' });
    } else if (!this.state.path) {
      window.scrollTo(0, 0);
      this.setState({ imageErr: 'Required Field' });
    } else if (!this.state.category) {
      window.scrollTo(0, 0);
      this.setState({ categoryErr: 'Required Field' });
    } else if (!this.state.description) {
      window.scrollTo(0, 0);
      this.setState({ descriptionErr: 'Required Field' });
    } else {
      this.setState({ visible: true });
    }
  }
  handleSubmit = chart => {
    const { history, createPool, pools } = this.props;
    // const startDate = moment(chart[pools.selection].startDate).format('L');
    const dDate = moment(chart[pools.selection].startDate)
      .add(pools.selection, 'months')
      .format('L');
    const endDate = moment(chart[pools.selection].startDate)
      .add(chart.length - 1, 'months')
      .format('L');
		let values = {};

    values['title'] = this.state.title;
    values['description'] = this.state.description;
    values['category'] = this.state.category;
    values['contributors'] = this.state.contributors;
    values['rate'] = this.state.rate;
    values['amount'] = this.state.amount;
    values['position'] = pools.selection;
    values['startDate'] = moment(this.state.startDate).format('L');
    values['dDate'] = dDate;
    values['endDate'] = endDate;
    values['monthly'] = chart[pools.selection].monthly;
    values['disburseAmount'] = chart[pools.selection].tcr;
    values['poolPic'] = this.state.path;
    createPool(values, history);
    window.scrollTo(0, 0);
  };

  //'render' Functions
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
          <option value="">Amount</option>
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
      const { startDateErr } = this.state;
      return (
        <div>
          <input
            onChange={this.handleChange}
            onMouseDown={this.handleMouseDown}
            className="form-input"
            type="date"
            name="startDate"
            placeholder="Start Date"
          />
          <div className="alert">{startDateErr ? startDateErr : null}</div>
        </div>
      );
    }
    return null;
  };
  renderReview = () => {
    const { chart, selection } = this.props.pools;
    if (this.state.visible) {
      const position = chart[selection];
      return (
        <div className="form-review">
          <h2 className="text-2">4. Review Your Pool</h2>
          <p className="form-display">
            <span>Title:</span> {this.state.title}
          </p>
          <p className="form-display">
            <span>Category:</span> {this.state.category}
          </p>
          <p className="form-display">
            <span>Description:</span> {this.state.description}
          </p>
          <p className="form-display">
            <span>Number of Contributors:</span> {this.state.contributors}
          </p>
          <p className="form-display">
            <span>Amount:</span>{' '}
            {parseFloat(this.state.amount).toLocaleString('USD', {
              style: 'currency',
              currency: 'USD',
              minimumFractionDigits: 0,
              maximumFractionDigits: 0
            })}
          </p>
          <p className="form-display">
            <span>Rate:</span> {this.state.rate}%
          </p>
          <p className="form-display">
            <span>Start Date:</span> {moment(this.state.date).format('L')}
          </p>
          <div className="">
            <h2 className="text-2">
              <span>Your Position:</span>
            </h2>
            <table>
              <thead>
                <tr>
                  <th>Base Amount</th>
                  <th>Interest Rate</th>
                  <th>Interest Paid/Earned</th>
                  <th>Monthly Payment</th>
                  <th>Cash Paid</th>
                  <th>Cash Available</th>
                  <th>Fee</th>
                  <th>Cash Received</th>
                  <th>Disbursement Date</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>{this.parse(position.amount)}</td>
                  <td>{position.interestRate}%</td>
                  <td>{this.parse(position.interestAmount)}</td>
                  <td>{this.parse(position.monthly)}</td>
                  <td>{this.parse(position.cashPaid)}</td>
                  <td>{this.parse(position.cashReceived)}</td>
                  <td>${position.fee}</td>
                  <td>{this.parse(position.tcr)}</td>
                  <td>
                    {moment(position.startDate)
                      .add(selection, 'months')
                      .format('L')}
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      );
    }
    return null;
  };

  renderAgreement = (chart, selection) => {
    if (selection >= 0) {
      const position = chart[selection];
      const date = moment(position.startDate, 'YYYY/MM/DD');
      const day = date.format('Do');
      return (
        <h5 style={{ width: '535px' }}>
          *By clicking "Submit", you agree to pay {this.parse(position.monthly)}{' '}
          every {day} of the month (except on your disbursement date) for the
          next {chart.length} months, upon the commencement of this pool.
        </h5>
      );
    }
    return null;
  };

  parse = num => {
    return parseFloat(num).toLocaleString('USD', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 2,
      maximumFractionDigits: 2
    });
  };

  render() {
    const { error, chart, selection, createError } = this.props.pools;
		const { titleErr, categoryErr, descriptionErr, imageErr } = this.state;
    return (
      <div className="tab">
        <h1 className="tab-title">Start a pool</h1>
        <div className="tab-box-v">
          {createError ? <h1 className="cancel">{createError}</h1> : null}
          <h2 className="text-2">1. Give Your Pool a Name and Some Details</h2>
          <input
            className="form-input"
            type="text"
            name="title"
            placeholder="Title"
            onChange={this.handleChange}
          />
          <div className="alert">
            {titleErr ? <p className="cancel">{titleErr}</p> : null}
          </div>
          <select
            className="form-input select"
            name="category"
            onChange={this.handleChange}
          >
            <option value="">Category</option>
            <option value="Business">Business</option>
            <option value="Sports">Sports</option>
            <option value="Home Improvement">Home Improvement</option>
            <option value="Travel">Travel</option>
          </select>
          <div className="alert">
            {categoryErr ? <p className="cancel">{categoryErr}</p> : null}
          </div>
          <textarea
            name="description"
            className="form-input textarea"
            cols="40"
            rows="10"
            onChange={this.handleChange}
            placeholder="Please provide a description of your pool"
          />
          <div className="alert">
            {descriptionErr ? <p className="cancel">{descriptionErr}</p> : null}
          </div>
					<div className="form-upload">
						<label className="form-file-label align-center">
							<UploadIcon size="24" color="gray" />&nbsp;<strong>Select or drag a picture</strong>
						</label>
						<input type="file" onChange={this.handeChangeII} />
						{this.state.imageLoading ?
							<div className="jumper">
								<div></div>
								<div></div>
								<div></div>
							</div>
							: null}
						{this.state.path && !this.state.imageLoading ? <img src={this.state.path} /> : null}
						{this.state.selectedFile ? <button onClick={() => this.upload()}>Upload</button> : null}
						{this.state.path ? <button onClick={() => {
							fs.unlink(`../uploads/${this.state.relative}`, (err) => {
								if (err) console.log(err);
								console.log('the images was deleted');
							});
						}}>Delete</button> : null}
					</div>
					{imageErr ? <p className="alert">{imageErr}</p> : null}
          <h2 className="text-2">2. Choose Your Options</h2>
          <select
            name="contributors"
            className="form-input select"
            onChange={this.handleChange}
          >
            <option value="">Number of Contributors</option>
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
          {this.renderReview()}
          <div className="alert">
            {error ? <p className="cancel">{error}</p> : null}
          </div>
          {!this.state.visible ? (
            this.props.pools.chart ? (
              <button
                className="big-btn"
                type="submit"
                onClick={() => this.handleNext()}
              >
                Review
              </button>
            ) : null
          ) : (
            <div style={{ margin: '0 auto', textAlign: 'center' }}>
              <button
                className="big-btn"
                type="submit"
                onClick={() => this.handleSubmit(chart)}
              >
                Submit*
              </button>
              {this.renderAgreement(chart, selection)}
            </div>
          )}
        </div>
      </div>
    );
  }
}

const mstp = ({ pools, auth }) => {
  return { pools, auth };
};

export default connect(mstp, actions)(Create);
