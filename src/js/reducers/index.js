import { combineReducers } from 'redux';
// import { reducer as form } from 'redux-form';
import userReducer from './userReducer';
import planReducer from './planReducer';
import subScriptionReducer from './subScriptionReducer';

const rootReducer = combineReducers({
  // form,
  user:userReducer,
  plans:planReducer,
  subScription:subScriptionReducer
});
export default rootReducer;
