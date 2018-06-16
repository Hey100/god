import profReducer from '../profReducer';
import { FETCHED_PROFILE } from '../../actions/types';

let INITIAL_STATE;
beforeEach(() => {
  INITIAL_STATE = { profile: null };
});
it('handles actions with type FETCHED_PROFILE', () => {
	const action = {
		type: FETCHED_PROFILE,
		payload: { profile1: 'testprofile' }
	}
	const newState  = profReducer(INITIAL_STATE, action)
	expect(newState).toEqual({
		profile: action.payload
	})
})

it('handles actions that have an unknown type', () => {
  const newState = profReducer(INITIAL_STATE, {});
  expect(newState).toEqual(INITIAL_STATE);
});
