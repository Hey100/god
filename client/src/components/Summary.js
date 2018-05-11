import React, { Component } from 'react';
import { Doughnut } from 'react-chartjs-2';
import { connect } from 'react-redux';
import * as actions from '../actions/index';
import moment from 'moment';

import './styles/sumary.css';
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
        {payment.disburseAmount} on {dDate}
      </h5>
    );
    if (now > endDate) {
      console.log('continue');
      /* continue */
    }
    if (nowDay <= poolDay) {
      if (nowMonth === dMonth) {
        return (
          <div>
            {disbursementInfo}
            <h5>
              {payment.monthly} will be due on {parseInt(nowMonth, 0) + 1}/{
                poolDay
              }
            </h5>
          </div>
        );
      } else {
        return (
          <div>
            <h5>
              {payment.monthly} is due on {nowMonth}/{poolDay}
            </h5>
            {disbursementInfo}
          </div>
        );
      }
    } else {
      return (
        <div>
          <h5>
            {payment.monthly} is due on {parseInt(nowMonth, 0) + 1}/{poolDay}
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

  render() {
    const { payments } = this.props.dash;
		const { ccScore, mlimit, usedAmount } = this.props.auth.user;
    // if (!payments) {
    //   return <div>LOADING>>>>>>></div>;
		// }
		const usage = ((usedAmount / mlimit)* 100).toFixed(0)
    let data = {
        labels: ['Spent', 'Remaining'],
        datasets: [
          {
            data: [usedAmount, (mlimit-usedAmount)],
            backgroundColor: ['#72E5BE', '#FAFAFA'],
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
          position: 'bottom',
          text: `Usage: ${usage}%`,
          fontSize: 40,
          fontStyle: 'lighter'
        }
      };
    return (
      <div className="tab">
        <div className="sumary-card">
          <h2 className="text-1">Your CC Score:</h2>
          <h1 className="big-btn">{ccScore}</h1>
        </div>
        <div className="canvas-wrap">
          <Doughnut data={data} options={options} height={300} />
        </div>
        <div className="sumary__chart">
          <div className="sumary__allowance">
            <h2 className="text-2">TOTAL ALLOWED: {this.parse(mlimit)}</h2>
            <h2 className="text-2">TOTAL USED: {this.parse(usedAmount)}</h2>
            <hr />
            <h2 className="text-2">TOTAL LEFT: {this.parse(mlimit - usedAmount)}</h2>
          </div>
        </div>
        <div style={{ paddingLeft: '50px' }}>
          {payments ? <h2 className="text-2">Contribution Schedule:</h2> : null}
          {payments
            ? payments.map(payment => {
                return (
                  <div key={payment._pool}>
                    <button
                      onClick={() => {
                        this.props.history.push(`/pools/${payment._pool}`);
                      }}
                      className="button"
                    >
                      {payment.title}
                    </button>
                    {this.renderSchedule(payment)}
                  </div>
                );
              })
            : null}
        </div>
      </div>
    );
  }
}

const mstp = ({ auth, dash }) => {
  return { auth, dash };
  // return (
	// 	<div className="tab">
	// 		<div className="card">
	// 			<div>
	// 				<h2 className="text-1">Your CC Score:</h2>
	// 				<h1 className="big-btn">80</h1>
	// 			</div>
	// 			<div className="canvas-wrap">
	// 				<Doughnut data={data} options={options} height={300} />
	// 			</div>
	// 			<div className="sumary__chart">
	// 				<div className="sumary__allowance">
	// 					<h2 className="text-2">TOTAL ALLOWED: $7,000</h2>
	// 					<h2 className="text-2">TOTAL USED: $4,564</h2>
	// 					<hr />
	// 					<h2 className="text-2">TOTAL LEFT: $2,436</h2>
	// 				</div>
	// 			</div>
	// 		</div>
	// 	</div>
  // );
};

export default connect(mstp, actions)(Summary);
