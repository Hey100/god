import poolReducer from '../poolReducer';
import {
  ALL_POOLS,
  MY_POOLS,
  COMMENT_CREATED,
  CHART_CREATED,
  JOINED,
  SELECTION,
  FETCHED_POOL,
  FETCHED_COMMENTS,
  PAYMENT_CREATED,
  CREATE_POOL_JOIN_POOL_ERROR,
  SELECT_POSITION_ERROR,
  RESET_SELECT_POSITION_ERROR,
	RESET
} from '../../actions/types';
import { mockChartData, mockChartInputs } from '../../testing/utils';

let INITIAL_STATE;
beforeEach(() => {
  INITIAL_STATE = {
    allPools: null,
    myPools: null,
    chart: null,
    form: {},
    joined: false,
    selection: '',
    pool: null,
    comments: null,
    error: '',
    createError: ''
  };
});

it('handles an action with type ALL_POOLS', () => {
  const action = {
    type: ALL_POOLS,
    payload: { 1: 'pool1', 2: 'pool2' }
  };
  const newState = poolReducer(INITIAL_STATE, action);
  expect(newState).toEqual({
    allPools: action.payload,
    myPools: null,
    chart: null,
    form: {},
    joined: false,
    selection: '',
    pool: null,
    comments: null,
    error: '',
    createError: ''
  });
});

it('handles an action with type MY_POOLS', () => {
  const action = {
    type: MY_POOLS,
    payload: { 1: 'mypool1', 2: 'mypool2' }
  };
  const newState = poolReducer(INITIAL_STATE, action);
  expect(newState).toEqual({
    allPools: null,
    myPools: action.payload,
    chart: null,
    form: {},
    joined: false,
    selection: '',
    pool: null,
    comments: null,
    error: '',
    createError: ''
  });
});

it('handles an action with type COMMENT_CREATED', () => {
  const action = {
    type: COMMENT_CREATED
  };
  const newState = poolReducer(INITIAL_STATE, action);
  expect(newState).toEqual(INITIAL_STATE);
});

it('handles an action with type CHART_CREATED', () => {
  const action = {
    type: CHART_CREATED,
    payload: { users: mockChartData, info: mockChartInputs }
  };
  const newState = poolReducer(INITIAL_STATE, action);
  expect(newState).toEqual({
    allPools: null,
    myPools: null,
    chart: action.payload.users,
    form: action.payload.info,
    joined: false,
    selection: '',
    pool: null,
    comments: null,
    error: '',
    createError: ''
  });
});

it('handles an action with type JOINED', () => {
  const action = {
    type: JOINED,
    payload: { joined: true }
  };
  const newState = poolReducer(INITIAL_STATE, action);
  expect(newState).toEqual({
    allPools: null,
    myPools: null,
    chart: null,
    form: {},
    joined: action.payload.joined,
    selection: '',
    pool: null,
    comments: null,
    error: '',
    createError: ''
  });
});

it('handles an action with type SELECTION', () => {
  const action = {
    type: SELECTION,
    payload: { selection: 1 }
  };
  const newState = poolReducer(INITIAL_STATE, action);
  expect(newState).toEqual({
    allPools: null,
    myPools: null,
    chart: null,
    form: {},
    joined: false,
    selection: action.payload,
    pool: null,
    comments: null,
    error: '',
    createError: ''
  });
});

it('handles an action with type FETCHED_POOL', () => {
  const action = {
    type: FETCHED_POOL,
    payload: { 1: 'oneSpecificPool' }
  };
  const newState = poolReducer(INITIAL_STATE, action);
  expect(newState).toEqual({
    allPools: null,
    myPools: null,
    chart: null,
    form: {},
    joined: false,
    selection: '',
    pool: action.payload,
    comments: null,
    error: '',
    createError: ''
  });
});

it('handles an action with type FETCHED_COMMENTS', () => {
  const action = {
    type: FETCHED_COMMENTS,
    payload: { firstComment: 'hello', secondComment: 'bye' }
  };
  const newState = poolReducer(INITIAL_STATE, action);
  expect(newState).toEqual({
    allPools: null,
    myPools: null,
    chart: null,
    form: {},
    joined: false,
    selection: '',
    pool: null,
    comments: action.payload,
    error: '',
    createError: ''
  });
});

it('handles an action with type PAYMENT_CREATED', () => {
  const action = {
    type: PAYMENT_CREATED
  };
  const newState = poolReducer(INITIAL_STATE, action);
  expect(newState).toEqual(INITIAL_STATE);
});

it('handles an action with type CREATE_POOL_JOIN_POOL_ERROR', () => {
  const action = {
    type: CREATE_POOL_JOIN_POOL_ERROR,
    payload: { 404: 'ERROR' }
  };
  const newState = poolReducer(INITIAL_STATE, action);
  expect(newState).toEqual({
    allPools: null,
    myPools: null,
    chart: null,
    form: {},
    joined: false,
    selection: '',
    pool: null,
    comments: null,
    error: '',
    createError: action.payload
  });
});

it('handles an action with type SELECT_POSITION_ERROR', () => {
  const action = {
    type: SELECT_POSITION_ERROR,
    payload: 'Please Select a Position in the Chart'
  };
  const newState = poolReducer(INITIAL_STATE, action);
  expect(newState).toEqual({
    allPools: null,
    myPools: null,
    chart: null,
    form: {},
    joined: false,
    selection: '',
    pool: null,
    comments: null,
    error: action.payload,
    createError: ''
  });
});

it('handles an action with type RESET_SELECT_POSITION_ERROR', () => {
  const action = {
    type: RESET_SELECT_POSITION_ERROR,
    payload: ''
  };
  const newState = poolReducer(INITIAL_STATE, action);
  expect(newState).toEqual({
    allPools: null,
    myPools: null,
    chart: null,
    form: {},
    joined: false,
    selection: '',
    pool: null,
    comments: null,
    error: action.payload,
    createError: ''
  });
});

it('handles an action with type RESET', () => {
	const action = {
		type: RESET
	}
	const newState = poolReducer(INITIAL_STATE, action)
	expect(newState).toEqual(INITIAL_STATE)
})

it('handles an action with an unknown type', () => {
  const newState = poolReducer(INITIAL_STATE, {});
  expect(newState).toEqual(INITIAL_STATE);
});
