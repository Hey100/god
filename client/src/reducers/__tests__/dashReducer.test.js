import { FETCHED_PAYMENTS } from '../../actions/types';
import dashReducer from '../dashReducer';

let INITIAL_STATE;
beforeEach(() => {
  INITIAL_STATE = {
    payments: []
  };
});

it('handles actions with type FETCHED_PAYMENTS', () => {
  const action = {
    type: FETCHED_PAYMENTS,
    payload: { 1: 'payment1', 2: 'payment2' }
  };
  const newState = dashReducer(INITIAL_STATE, action);
  expect(newState).toEqual({
    payments: action.payload
  });
});

it('handles actions with an unknown type', () => {
	const newState = dashReducer(INITIAL_STATE, {});
  expect(newState).toEqual(INITIAL_STATE);
});
