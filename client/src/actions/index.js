import axios from 'axios';
import {
  AUTH_USER,
  AUTH_ERROR,
  UNAUTH_USER,
  FETCH_USER,
  MY_POOLS,
  ALL_POOLS,
  CHART_CREATED,
  COMMENT_CREATED,
  FETCHED_COMMENTS,
  SELECTION,
  RESET,
  FETCHED_POOL,
  JOINED
} from './types';

//SignIn.js
export const onLogin = ({ email, password }, history) => {
  return dispatch => {
    axios
      .post('/api/login', { email, password })
      .then(res => {
        dispatch({ type: AUTH_USER });
        dispatch({ type: FETCH_USER, payload: res.data.user });
        localStorage.setItem('token', res.data.token);
        history.push('/dashboard');
      })
      .catch(() => {
        dispatch(authError('Invalid Email/Password'));
      });
  };
};

//Signup.js
export const onSignUp = (values, history) => {
  return dispatch => {
    axios
      .post('/api/signup', values)
      .then(res => {
        dispatch({ type: AUTH_USER });
        dispatch({ type: FETCH_USER, payload: res.data.user });
        localStorage.setItem('token', res.data.token);
        history.push('/dashboard');
      })
      .catch(({ response }) => {
        dispatch(authError(response.data.error));
      });
  };
};
export const authError = error => {
  return {
    type: AUTH_ERROR,
    payload: error
  };
};

//Logout.js
export const onLogOut = () => async dispatch => {
  localStorage.removeItem('token');
  await axios.get('/api/logout');
  dispatch({ type: UNAUTH_USER });
};

//App.js
export const fetchUser = () => async dispatch => {
  const res = await axios.get('/api/current_user');
  dispatch({ type: FETCH_USER, payload: res.data });
};

//Review.js
export const createPool = (values, position, history) => async dispatch => {
  values['position'] = position;
  const res = await axios.post('/api/createPool', values);
  history.push(`/pools/${res.data._id}`);
  dispatch({ type: RESET });
};

//MyPools.js
export const fetchMyPools = () => async dispatch => {
  const res = await axios.get('/api/mypools');
  dispatch({ type: MY_POOLS, payload: res.data });
};

//AllPools.js
export const fetchAllPools = () => async dispatch => {
  const res = await axios.get('/api/allpools');
  dispatch({ type: ALL_POOLS, payload: res.data });
};

//Create.js
export const createChart = values => dispatch => {

  let amount = parseInt(values.amount, 0);
  let ppl = parseInt(values.contributors, 0);
	let rate = values.rate / 100;

  let term = ppl - 1;
  let startDate = values.date;
  let cashInterval = amount * rate / term;
  let paymentInterval = cashInterval / term;
  let basePayment = amount / term;
  let users = [];
  const chartCalc = (
    amount,
    ppl,
    cashInterval,
    basePayment,
    paymentInterval
  ) => {
    for (let i = ppl - 1; i >= 0; i--) {
      let x = amount + cashInterval * [ppl - 1 - [i]];
      let y = amount + cashInterval * [i];
      let z = basePayment + paymentInterval * [i];
      let result = {
        cashReceived: parseFloat(x).toLocaleString('USD', {
          style: 'currency',
          currency: 'USD',
          minimumFractionDigits: 2,
          maximumFractionDigits: 2
        }),
        cashPaid: parseFloat(y).toLocaleString('USD', {
          style: 'currency',
          currency: 'USD',
          minimumFractionDigits: 2,
          maximumFractionDigits: 2
        }),
        monthly: parseFloat(z).toLocaleString('USD', {
          style: 'currency',
          currency: 'USD',
          minimumFractionDigits: 2,
          maximumFractionDigits: 2
        }),
        amount: parseFloat(amount).toLocaleString('USD', {
          style: 'currency',
          currency: 'USD',
          minimumFractionDigits: 2,
          maximumFractionDigits: 2
        }),
        interestRate: parseFloat((y - x) / y * 100).toFixed(2),
        interestAmount: parseFloat(y - x).toLocaleString('USD', {
          style: 'currency',
          currency: 'USD',
          minimumFractionDigits: 2,
          maximumFractionDigits: 2
        }),
        fee: parseFloat(amount * 0.01),
        tcr: parseFloat(x - amount * 0.01).toLocaleString('USD', {
          style: 'currency',
          currency: 'USD',
          minimumFractionDigits: 2,
          maximumFractionDigits: 2
        }),
        startDate,
        ppl
      };
      users.push(result);
    }
  };
  chartCalc(amount, ppl, cashInterval, basePayment, paymentInterval);
  let obj = {};
  const {
    title,
    category,
    description,
    contributors,
    date
	} = values;
  obj['info'] = {
    title,
    category,
		description,
    amount,
    contributors,
    rate: rate * 100,
    date
  };
  obj['users'] = users;
  dispatch({ type: CHART_CREATED, payload: obj });
};

//Chart.js
export const setSelection = selection => {
  return {
    type: SELECTION,
    payload: selection
  };
};
export const joinPool = (id, position) => async dispatch => {
  let obj = {};
  obj['id'] = id;
  obj['position'] = position;
  const res = await axios.post('/api/joinPool', obj);
  let obj2 = {};
  obj2['amount'] = res.data.amount;
  obj2['contributors'] = res.data.numOfContributors;
  obj2['date'] = res.data.date;
  obj2['rate'] = res.data.rate;
  dispatch(createChart(obj2));
  dispatch({ type: FETCHED_POOL, payload: res.data });
};
export const joined = () => {
  return {
    type: JOINED
  };
};

//PoolDetail.js
export const createComment = values => async dispatch => {
  const res = await axios.post('/api/saveComment', values);
  dispatch(fetchComments(res.data.pool_id));
  dispatch({ type: COMMENT_CREATED, payload: res.data });
};
export const fetchPool = id => async dispatch => {
  const res = await axios.get(`/api/fetchPool/${id}`);
  let obj = {};
  obj['amount'] = res.data.amount;
  obj['contributors'] = res.data.numOfContributors;
  obj['date'] = res.data.date;
  obj['rate'] = res.data.rate;
  dispatch(createChart(obj));
  dispatch({ type: FETCHED_POOL, payload: res.data });
};
export const fetchComments = id => async dispatch => {
  const res = await axios.get(`/api/comments/${id}`);
  dispatch({ type: FETCHED_COMMENTS, payload: res.data });
};

//multi
export const reset = () => {
  return {
    type: RESET
  };
};
