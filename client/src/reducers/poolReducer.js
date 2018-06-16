import {
  MY_POOLS,
  CHART_CREATED,
  SELECTION,
  FETCHED_POOL,
  COMMENT_CREATED,
  FETCHED_COMMENTS,
  PAYMENT_CREATED,
  RESET,
  SELECT_POSITION_ERROR,
  CREATE_POOL_JOIN_POOL_ERROR,
	RESET_SELECT_POSITION_ERROR,
  ALL_POOLS,
  JOINED
} from '../actions/types';

const INITIAL_STATE = {
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

export default function(state = INITIAL_STATE, action) {
  switch (action.type) {
    case ALL_POOLS:
      return { ...state, allPools: action.payload };
    case MY_POOLS:
      return { ...state, myPools: action.payload };
    case COMMENT_CREATED:
      return state;
    case CHART_CREATED:
      const p = action.payload;
      return { ...state, chart: p.users, form: p.info };
    case JOINED:
      return { ...state, joined: true };
    case SELECTION:
      return { ...state, selection: action.payload };
    case FETCHED_POOL:
      return { ...state, pool: action.payload };
    case FETCHED_COMMENTS:
      return { ...state, comments: action.payload };
		case PAYMENT_CREATED:
      return state;
		case CREATE_POOL_JOIN_POOL_ERROR:
      return { ...state, createError: action.payload };
		case SELECT_POSITION_ERROR:
      return { ...state, error: action.payload };
		case RESET_SELECT_POSITION_ERROR:
      return { ...state, error: '' };
    case RESET:
      return {
        ...state,
        chart: null,
        selection: '',
        pool: null,
				joined: false,
				createError: ''
      };
    default:
      return state;
  }
}
