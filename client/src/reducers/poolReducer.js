import {
  MY_POOLS,
  CHART_CREATED,
	SELECTION,
	FETCHED_POOL,
  RESET_CHART
} from '../actions/types';

const INITIAL_STATE = {
  myPools: null,
  chart: null,
	selection: '',
	pool: null
};

export default function(state = INITIAL_STATE, action) {
  switch (action.type) {
    case MY_POOLS:
      return { ...state, myPools: action.payload };
    case CHART_CREATED:
      return { ...state, chart: action.payload };
    case SELECTION:
      return { ...state, selection: action.payload };
		case FETCHED_POOL:
      return { ...state, pool: action.payload };
    case RESET_CHART:
      return { ...state, chart: null, selection: '', pool: null };
    default:
      return state;
  }
}
