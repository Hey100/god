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

//multi
export const reset = () => {
	return {
		type: RESET
	};
};