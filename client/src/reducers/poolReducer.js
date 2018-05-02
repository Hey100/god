import { MY_POOLS, CHART_CREATED, RESET_CHART } from '../actions/types';

const INITIAL_STATE = {
	myPools: null,
	chart: null
}

export default function(state = INITIAL_STATE, action) {
	switch (action.type) {
    case MY_POOLS:
      return { ...state, myPools: action.payload };
    case CHART_CREATED:
      return { ...state, chart: action.payload };
    case RESET_CHART:
      return { ...state, chart: null };
    default:
      return state;
  }
}