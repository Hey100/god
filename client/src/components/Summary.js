import React, { Component } from 'react';
import { Doughnut } from 'react-chartjs-2';
import { connect } from 'react-redux';
import * as actions from '../actions/index';
import moment from 'moment';

import './styles/global.css';
import './styles/summary.css';
import './styles/media.css';

class Summary extends Component {
  componentDidMount() {
    this.props.fetchPayments();
  }

  renderSchedule = payment => {
    const dMonth = moment(payment.dDate).format('M');
    const dDate = moment(payment.dDate).format('L');
    const endDate = moment(payment.endDate);
    const now = moment();
    const poolDay = moment(payment.startDate).format('D');
    const nowDay = moment().format('D');
    const nowMonth = moment().format('M');
    const disbursementInfo = (
      <h3 className="summary__reminder-text">
        {now < moment(payment.dDate) ? 'You will receive ' : 'You received '}{this.parseII(payment.disburseAmount)} on {dDate}
      </h3>
    );
    if (now > endDate) {
      return <i>This pool ended on {endDate.format('L')}</i>;
    } else if (now > endDate && !payment.expired) {
      this.props.calculateLimit({ monthly: payment.monthly, id: payment._id });
      return <i>This pool ended on {endDate.format('L')}</i>;
    } else if (nowDay <= poolDay) {
      if (nowMonth === dMonth) {
        return (
          <div style={{ display: 'flex' }}>
            {disbursementInfo}
						<h3 className="summary__reminder-text">{this.parseII(payment.monthly)} will be due on{' '}{parseInt(nowMonth, 0) + 1}/{poolDay}</h3>
          </div>
        );
      } else {
        return (
					<div style={{ display: 'flex' }}>
						<h3 className="summary__reminder-text">{this.parseII(payment.monthly)} is due on {nowMonth}/{poolDay}</h3>
						{disbursementInfo}
          </div>
        );
      }
    } else {
      return (
        <div style={{ display: 'flex' }}>
					<h3 className="summary__reminder-text">{this.parseII(payment.monthly)} is due on{' '}{parseInt(nowMonth, 0) + 1}/{poolDay}</h3>
          {disbursementInfo}
        </div>
      );
    }
  };

  parse = num => {
    return parseFloat(num).toLocaleString('USD', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    });
  };
  parseII = num => {
    return parseFloat(num).toLocaleString('USD', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 2,
      maximumFractionDigits: 2
    });
  };

  handleSchedule = () => {
    const { payments } = this.props.dash;
    if (!payments) {
      return <h3 className="text-2">There are no future payments.</h3>;
    } else {
      return payments.map(payment => {
        return (
          <div className="summary__reminder" key={payment._pool}>
            <a
              href={`/pools/${payment._pool}`}
              className="link"
            >
              {payment.title}
            </a>
            {this.renderSchedule(payment)}
          </div>
        );
      });
    }
  };

  render() {
    const { ccScore, mlimit, usedAmount } = this.props.auth.user;
    const usage = (usedAmount / mlimit * 100).toFixed(0);
    let data = {
        labels: ['Spent', 'Remaining'],
        datasets: [
          {
            data: [usedAmount, mlimit - usedAmount],
            backgroundColor: ['#40E0D0', '#C9C9C9'],
            borderColor: ['transparent', 'transparent']
          }
        ]
      },
      options = {
        cutoutPercentage: 70,
        responsive: true,
        animation: { animateRotate: true },
        legend: { display: false },
        title: {
          display: true,
          position: 'top',
          text: `Usage: ${usage}%`,
          fontSize: 40,
          fontStyle: 'lighter',
          padding: 20
        }
      };
    return (
      <div className="tab">
        <h1 className="tab-title">Home</h1>
        <div className="tab-box">
          <div className="summary__one">
            <h3 className="text-2">Your Community Capital score is:</h3>
            <h1 className="big-btn">{ccScore}</h1>
          </div>
          <div className="summary__two">
            <div className="summary__donut">
              <Doughnut data={data} options={options} height={300} />
            </div>
            <div className="summary__allowance">
              <h3 className="text-2">Monthly Limit: {this.parse(mlimit)}</h3>
              <h3 className="text-2">This Month: {this.parse(usedAmount)}</h3>
              <hr />
              <h3 className="text-2">
                Remaining: {this.parse(mlimit - usedAmount)}
              </h3>
            </div>
          </div>
          <div className="summary__three">
            {this.handleSchedule()}
          </div>
        </div>
      </div>
    );
  }
}

const mstp = ({ auth, dash }) => {
  return { auth, dash };
};

export default connect(mstp, actions)(Summary);
