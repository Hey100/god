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
  let users = {};
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
        cashReceived: x.toFixed(2),
        cashPaid: y.toFixed(2),
				monthly: z.toFixed(2),
				amount: amount,
				interestRate: ((y-x)/y * 100).toFixed(2),
				interestAmount: (y - x).toFixed(2),
				fee: amount * 0.01,
				tcr: (x - (amount * 0.01)).toFixed(2)
      };
      users[ppl - i] = result;
    }
  };
  chartCalc(amount, ppl, cashInterval, basePayment, paymentInterval);
  dispatch({ type: CHART_CREATED, payload: users });
};

export const resetChart = () => {
	return {
		type: RESET_CHART
	}
}
