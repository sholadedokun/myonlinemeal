import axios from 'axios';
import {
  ORDER_ERROR,
  FETCH_ORDERS,
  ROOT_URL
} from './actionTypes';

export function getAllPlans() {
    return function(dispatch) {
        return new Promise( (resolve)=>{
            axios.get(`${ROOT_URL}/orders`)
            .then(response => {
                dispatch({ type: FETCH_ORDERS });

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
    type: ORDER_ERROR,
    payload: error
  };
}
