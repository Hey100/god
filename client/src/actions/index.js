import axios from 'axios';
import {
  AUTH_USER,
  AUTH_ERROR,
  UNAUTH_USER,
  RESET_AUTH_ERROR,
  FETCH_USER,
  MY_POOLS,
  ALL_POOLS,
  CHART_CREATED,
  COMMENT_CREATED,
  PAYMENT_CREATED,
  FETCHED_COMMENTS,
  FETCHED_PAYMENTS,
  SELECTION,
  ERROR,
  CREATE_ERROR,
  RESET,
  RESET_ERROR,
  FETCHED_POOL,
  JOINED
} from './types';

//SignIn.js
export const onLogin = ({ email, password }, history) => async dispatch => {
  try {
    const res = await axios.post('/api/login', { email, password });
    dispatch({ type: AUTH_USER });
    dispatch({ type: FETCH_USER, payload: res.data.user });
    localStorage.setItem('token', res.data.token);
    history.push('/dashboard');
  } catch (error) {
    dispatch(authError('Invalid Email/Password'));
  }
};

//Signup.js
export const onSignUp = (values, history) => async dispatch => {
  try {
    const res = await axios.post('/api/signup', values);
		try {
			const header = { headers: { Authorization: res.data.token } };
			dispatch({ type: AUTH_USER });
			dispatch(fetchUser(header));
			dispatch({ type: FETCH_USER, payload: res.data.user });
			localStorage.setItem('token', res.data.token);
			history.push('/dashboard');
		} catch (error) {
			dispatch(authError(error.response.data));
		}
  } catch (error) {
    dispatch(authError(error.response.data));
  }
};
export const authError = error => {
  return {
    type: AUTH_ERROR,
    payload: error
  };
};
export const resetAuthError = () => {
  return {
    type: RESET_AUTH_ERROR
  };
};

//Logout.js
export const onLogOut = () => async dispatch => {
  localStorage.removeItem('token');
  await axios.get('/api/logout');
  dispatch({ type: UNAUTH_USER });
};

//App.js
export const fetchUser = (header) => async dispatch => {
  const res = await axios.get('/api/current_user', header);
  dispatch({ type: FETCH_USER, payload: res.data });
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
  let startDate = values.startDate;
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
        cashReceived: x,
        cashPaid: y,
        monthly: z,
        amount,
        interestRate: parseFloat((y - x) / y * 100).toFixed(2),
        interestAmount: y - x,
        fee: parseFloat(amount * 0.01),
        tcr: x - amount * 0.01,
        startDate,
        ppl
      };
      users.push(result);
    }
  };
  chartCalc(amount, ppl, cashInterval, basePayment, paymentInterval);
  let obj = {};
  const { title, category, description, contributors } = values;
  obj['info'] = {
    title,
    category,
    description,
    amount,
    contributors,
    rate: rate * 100,
    startDate
  };
  obj['users'] = users;
  dispatch({ type: CHART_CREATED, payload: obj });
};
export const setError = err => {
  return {
    type: ERROR,
    payload: err
  };
};
export const createPool = (values, history) => async dispatch => {
  try {
    await dispatch(updateUser(values));
    const res = await axios.post('/api/createPool', values);
    history.push(`/pools/${res.data._id}`);
    values['poolId'] = res.data._id;
    dispatch(createPayment(values));
    dispatch({ type: RESET });
  } catch (error) {
    const err = error.response.data.error;
    dispatch({ type: CREATE_ERROR, payload: err });
  }
};
export const createPayment = values => async dispatch => {
  await axios.post('/api/createPayment', values);
  dispatch({ type: PAYMENT_CREATED });
};
const updateUser = values => async dispatch => {
  const res = await axios.post('/api/updateUser', values);
  dispatch({ type: FETCH_USER, payload: res.data });
};

//Chart.js
export const resetError = () => {
  return {
    type: RESET_ERROR
  };
};
export const setSelection = selection => {
  return {
    type: SELECTION,
    payload: selection
  };
};
export const joinPool = (poolId, position, chart) => async dispatch => {
  try {
    await dispatch(updateUser(chart));
    let obj = { poolId, position };
    const res = await axios.post('/api/joinPool', obj);
    let obj2 = {};
    obj2['amount'] = res.data.amount;
    obj2['contributors'] = res.data.numOfContributors;
    obj2['startDate'] = res.data.startDate;
    obj2['rate'] = res.data.rate;
    dispatch(createPayment(chart));
    dispatch(createChart(obj2));
    dispatch({ type: FETCHED_POOL, payload: res.data });
  } catch (error) {
    const err = error.response.data.error;
    dispatch({ type: CREATE_ERROR, payload: err });
  }
};
export const joined = () => {
  return {
    type: JOINED
  };
};

//PoolDetail.js
export const createComment = values => async dispatch => {
  const res = await axios.post('/api/saveComment', values);
  dispatch(fetchComments(res.data._pool));
  dispatch({ type: COMMENT_CREATED, payload: res.data });
};
export const fetchPool = id => async dispatch => {
  const res = await axios.get(`/api/fetchPool/${id}`);
  let obj = {};
  obj['amount'] = res.data.amount;
  obj['contributors'] = res.data.numOfContributors;
  obj['startDate'] = res.data.startDate;
  obj['rate'] = res.data.rate;
  dispatch(createChart(obj));
  dispatch({ type: FETCHED_POOL, payload: res.data });
};
export const fetchComments = id => async dispatch => {
  const res = await axios.get(`/api/comments/${id}`);
  dispatch({ type: FETCHED_COMMENTS, payload: res.data });
};

//Summary.js
export const fetchPayments = () => async dispatch => {
  const res = await axios.get('/api/payments');
  dispatch({ type: FETCHED_PAYMENTS, payload: res.data });
};
export const calculateLimit = obj => async dispatch => {
  const res = await axios.post('/api/calculateLimit', obj);
  await dispatch(fetchPayments());
  dispatch({ type: FETCH_USER, payload: res.data });
};

//multi
export const reset = () => {
  return {
    type: RESET
  };
};
