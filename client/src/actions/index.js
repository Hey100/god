import axios from 'axios';
import {
  AUTH_USER,
  AUTH_ERROR,
  UNAUTH_USER,
  FETCH_USER,
  MY_POOLS,
  CHART_CREATED,
  RESET_CHART
} from './types';

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
export const onSignUp = (values, history) => {
  return dispatch => {
    axios
      .post('/api/signup', values)
      .then(res => {
        console.log(res);
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

export const onLogOut = () => async dispatch => {
  localStorage.removeItem('token');
  await axios.get('/api/logout');
  dispatch({ type: UNAUTH_USER });
};

export const fetchUser = () => async dispatch => {
  const res = await axios.get('/api/current_user');
  dispatch({ type: FETCH_USER, payload: res.data });
};

export const createPool = (values, history) => async dispatch => {
  await axios.post('/api/createPool', values);
  history.push('/mypools');
  // dispatch({ type: POOL_CREATED})
};

export const fetchPools = () => async dispatch => {
  const res = await axios.get('/api/mypools');
  dispatch({ type: MY_POOLS, payload: res.data });
};

export const createChart = values => dispatch => {
  let amount = parseInt(values.amount);
  let ppl = parseInt(values.participants);
  let rate = values.rate / 100;
  let term = ppl - 1;
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
        interestRate: parseFloat(((y - x) / y * 100)).toFixed(2),
        interestAmount: parseFloat((y - x)).toLocaleString('USD', {
          style: 'currency',
          currency: 'USD',
          minimumFractionDigits: 2,
          maximumFractionDigits: 2
        }),
        fee: parseFloat(amount * 0.01),
        tcr: parseFloat((x - amount * 0.01)).toLocaleString('USD', {
          style: 'currency',
          currency: 'USD',
          minimumFractionDigits: 2,
          maximumFractionDigits: 2
				}),
				ppl
      };
			users.push(result);
    }
  };
	chartCalc(amount, ppl, cashInterval, basePayment, paymentInterval);
  dispatch({ type: CHART_CREATED, payload: users });
};

export const resetChart = () => {
  return {
    type: RESET_CHART
  };
};
