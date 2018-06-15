import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';

export const mockStore = configureMockStore([thunk]);
export const mockPool = {
  amount: '1000',
  category: 'Home Improvement',
  contributors: [{}],
  creator: 'Amity L.',
  description: 'Testing',
  numOfContributors: 5,
  poolPic:
    'https://res.cloudinary.com/ethanyjoh/image/upload/v1528950428/ejlocjean3vwp2umyh4i.png',
  rate: '5',
  startDate: '2018-06-27T07:00:00.000Z',
  title: 'For Testing Purposes',
  __v: 0,
  _id: '5b21eec48ed00e0d0206c943',
  _user: '5b15d610f74f9d04621b4124'
};
export const mockChartCalc = {
  amount: 2500,
  people: 5,
  cashInterval: 31.25,
  basePayment: 625,
  paymentInterval: 7.8125,
  term: 4,
  startDate: '2018-06-27'
};
export const mockChartInputs = {
  amount: 2500,
  category: '',
  contributors: 5,
  description: '',
  rate: 5,
  startDate: '2018-06-27',
  title: ''
};
export const mockChartData = [
  {
    amount: 2500,
    cashPaid: 2625,
    cashReceived: 2500,
    fee: 25,
    interestAmount: 125,
    interestRate: '4.76',
    monthly: 656.25,
    people: 5,
    startDate: '2018-06-27',
    tcr: 2475
  },
  {
    amount: 2500,
    cashPaid: 2593.75,
    cashReceived: 2531.25,
    fee: 25,
    interestAmount: 62.5,
    interestRate: '2.41',
    monthly: 648.4375,
    people: 5,
    startDate: '2018-06-27',
    tcr: 2506.25
  },
  {
    amount: 2500,
    cashPaid: 2562.5,
    cashReceived: 2562.5,
    fee: 25,
    interestAmount: 0,
    interestRate: '0.00',
    monthly: 640.625,
    people: 5,
    startDate: '2018-06-27',
    tcr: 2537.5
  },
  {
    amount: 2500,
    cashPaid: 2531.25,
    cashReceived: 2593.75,
    fee: 25,
    interestAmount: -62.5,
    interestRate: '-2.47',
    monthly: 632.8125,
    people: 5,
    startDate: '2018-06-27',
    tcr: 2568.75
  },
  {
    amount: 2500,
    cashPaid: 2500,
    cashReceived: 2625,
    fee: 25,
    interestAmount: -125,
    interestRate: '-5.00',
    monthly: 625,
    people: 5,
    startDate: '2018-06-27',
    tcr: 2600
  }
];
