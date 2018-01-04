import {
    PLAN_ERROR,
    FETCH_PLANS
} from '../actions/actionTypes';

export default function(state = {error:'', allPlans:''}, action) {
  switch(action.type) {
    case FETCH_PLANS:
      return { ...state, error: '', allPlans: action.payload };
    case PLAN_ERROR:
      return { ...state, error: action.payload };

  }
  return state;
}
