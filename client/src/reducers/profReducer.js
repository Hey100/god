import { FETCHED_PROFILE } from '../actions/types';

const INITIAL_STATE = {
  profile: null
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case FETCHED_PROFILE:
      return { ...state, profile: action.payload };
    default:
      return state;
  }
};
