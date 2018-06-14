import axios from 'axios';
import {
	FETCH_USER,
	MY_POOLS,
	ALL_POOLS,
	CHART_CREATED,
	COMMENT_CREATED,
	PAYMENT_CREATED,
	FETCHED_COMMENTS,
	SELECTION,
	ERROR,
	CREATE_ERROR,
	RESET,
	RESET_ERROR,
	FETCHED_POOL,
	JOINED
} from './types';
import {
  convertNumber,
  calculateTerm,
  rateAsDecimal,
  calculateCashInterval,
  calculatePaymentInterval,
  calculateBasePayment,
  chartCalc
} from '../lib/calculationHelpers';

//MyPools.js
export const fetchMyPools = () => async dispatch => {
	const res = await axios.get('/api/mypools', {
		headers: { Authorization: localStorage.getItem('token') }
	});
	dispatch({ type: MY_POOLS, payload: res.data });
};

//AllPools.js
export const fetchAllPools = () => async dispatch => {
	const res = await axios.get('/api/allpools');
	dispatch({ type: ALL_POOLS, payload: res.data });
};

//Create.js
export const createChart = values => dispatch => {
	let { title, category, description, startDate } = values;
	let amount = convertNumber(values.amount)
	let people = convertNumber(values.contributors);
	let rate = rateAsDecimal(values.rate)

	let term = calculateTerm(people)
	let cashInterval = calculateCashInterval(amount, rate, term);
	let paymentInterval = calculatePaymentInterval(cashInterval, term)
	let basePayment = calculateBasePayment(amount, term)
	const obj = {
		info: {
			title,
			category,
			description,
			amount,
			contributors: values.contributors,
			startDate,
			rate: rate * 100
		},
		users: chartCalc({ amount, people, cashInterval, basePayment, paymentInterval, term, startDate })
	}
	// console.log(obj)
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
		const res = await axios.post('/api/createPool', values, {
			headers: { Authorization: localStorage.getItem('token') }
		});
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
	await axios.post('/api/createPayment', values, {
		headers: {
			Authorization: localStorage.getItem('token')
		}
	});
	dispatch({ type: PAYMENT_CREATED });
};
const updateUser = values => async dispatch => {
	const res = await axios.post('/api/updateUser', values, {
		headers: { Authorization: localStorage.getItem('token') }
	});
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
		const res = await axios.post('/api/joinPool', obj, {
			headers: { Authorization: localStorage.getItem('token') }
		});
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
	const res = await axios.post('/api/saveComment', values, {
		headers: {
			Authorization: localStorage.getItem('token')
		}
	});
	dispatch(fetchComments(res.data._pool));
	dispatch({ type: COMMENT_CREATED });
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

//multi
export const reset = () => {
	return {
		type: RESET
	};
};