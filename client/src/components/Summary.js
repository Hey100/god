import React, { Component } from 'react';
import { Doughnut } from 'react-chartjs-2';
import { connect } from 'react-redux';
import * as actions from '../actions/index';
import moment from 'moment';

import './styles/summary.css';
import './styles/global.css';
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
      <h5>
        {now < moment(payment.dDate) ? 'You will receive ' : 'You received '}
        {this.parseII(payment.disburseAmount)} on {dDate}
      </h5>
    );
    if (now > endDate) {
      return <i>This pool ended on {endDate.format('L')}</i>;
    } else if (now > endDate && !payment.expired) {
      this.props.calculateLimit({ monthly: payment.monthly, id: payment._id });
      return <i>This pool ended on {endDate.format('L')}</i>;
    } else if (nowDay <= poolDay) {
      if (nowMonth === dMonth) {
        return (
          <div>
            {disbursementInfo}
            <h5>
              {this.parseII(payment.monthly)} will be due on{' '}
              {parseInt(nowMonth, 0) + 1}/{poolDay}
            </h5>
          </div>
        );
      } else {
        return (
          <div>
            <h5>
              {this.parseII(payment.monthly)} is due on {nowMonth}/{poolDay}
            </h5>
            {disbursementInfo}
          </div>
        );
      }
    } else {
      return (
        <div>
          <h5>
            {this.parseII(payment.monthly)} is due on{' '}
            {parseInt(nowMonth, 0) + 1}/{poolDay}
          </h5>
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
      return <h2 className="text-2">There are no future payments.</h2>;
    } else {
      return payments.map(payment => {
        return (
          <div key={payment._pool} className="content">
            <button
              onClick={() => {
                this.props.history.push(`/pools/${payment._pool}`);
              }}
              className="link"
            >
              {payment.title}
            </button>
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
            backgroundColor: ['#72E5BE', '#FAFAFA'],
            borderColor: ['transparent', 'transparent']
          }
        ]
      },
      options = {
        cutoutPercentage: 50,
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
          <div className="card summary__score">
            <h2 className="text-2">Your Community Capital score is:</h2>
            <h1 className="big-btn">{ccScore}</h1>
          </div>
          <div className="card">
            <div className="summary__donut">
              <Doughnut data={data} options={options} height={300} />
            </div>
            <div className="summary__allowance">
              <h2 className="text-2">Monthly Limit: {this.parse(mlimit)}</h2>
              <h2 className="text-2">This Month: {this.parse(usedAmount)}</h2>
              <hr />
              <h2 className="text-2">
                Remaining: {this.parse(mlimit - usedAmount)}
              </h2>
            </div>
          </div>
          <div className="card">
            <h2 className="text-2">Contribution Schedule:</h2>
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
