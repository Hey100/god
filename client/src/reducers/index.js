import { combineReducers } from 'redux';
import authReducer from './authReducer';
import poolReducer from './poolReducer';
import dashReducer from './dashReducer';
import { reducer as reduxForm } from 'redux-form';

export default combineReducers({
  auth: authReducer,
	pools: poolReducer,
	dash: dashReducer,
	form: reduxForm
});
