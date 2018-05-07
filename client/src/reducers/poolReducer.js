import {
  MY_POOLS,
  CHART_CREATED,
  SELECTION,
  FETCHED_POOL,
  RESET,
  ALL_POOLS,
  JOINED
} from '../actions/types';

const INITIAL_STATE = {
  myPools: null,
  allPools: null,
  chart: null,
  selection: '',
  pool: null,
  joined: false
};

export default function(state = INITIAL_STATE, action) {
  switch (action.type) {
    case ALL_POOLS:
      return { ...state, allPools: action.payload };
    case MY_POOLS:
      return { ...state, myPools: action.payload };
    case CHART_CREATED:
      return { ...state, chart: action.payload };
    case JOINED:
      return { ...state, joined: true };
    case SELECTION:
      return { ...state, selection: action.payload };
    case FETCHED_POOL:
      return { ...state, pool: action.payload };
    case RESET:
      return { ...state, chart: null, selection: '', pool: null, joined: false };
    default:
      return state;
  }
}
