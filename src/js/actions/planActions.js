import axios from 'axios';
import { BrowserRouter as Router } from 'react-router-dom';
import {
  PLAN_ERROR,
  FETCH_PLANS,
  ROOT_URL
} from './actionTypes';

export function getAllPlans() {
    return function(dispatch) {
        return new Promise( (resolve)=>{
            axios.get(`${ROOT_URL}/plans`)
            .then(response => {
                dispatch({ type: FETCH_PLANS, payload:response.data });
                resolve()
            })
            .catch(error => {
                let errorData= error.response.data.error
                dispatch(planError(errorData));
            });
        })
    }
}


export function planError(error) {
  return {
    type: PLAN_ERROR,
    payload: error
  };
}
