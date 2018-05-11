import { FETCHED_PAYMENTS } from '../actions/types'

const INITIAL_STATE = {
	payments: []
}

export default (state = INITIAL_STATE, action) => {
	switch (action.type) {
		case FETCHED_PAYMENTS:
			return { ...state, payments: action.payload }
		default:
			return state;
	}
}