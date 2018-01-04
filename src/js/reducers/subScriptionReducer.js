import {
  SUBSCRIPTION_ERROR,
  FETCH_SUBSCRIPTIONS,
  SUBCRIBE_TO_PLAN,
  SUBCRIBE_TO_PLAN_ERROR,
} from '../actions/actionTypes';

export default function(state = {error:'', subScriptions:''}, action) {
  switch(action.type) {
    case FETCH_SUBSCRIPTIONS:
      return { ...state, error: '', subScriptions: action.payload };
    case SUBSCRIPTION_ERROR:
      return { ...state, error: action.payload };
    case SUBCRIBE_TO_PLAN:
        return { ...state, subScriptions: action.payload };
  }
  return state;
}
