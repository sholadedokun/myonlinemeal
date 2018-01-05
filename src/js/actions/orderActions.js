import axios from 'axios';
import {
  ORDER_ERROR,
  FETCH_CURRENT_ORDERS,
  ROOT_URL
} from './actionTypes';

export function getCurrentOrder() {
    return function(dispatch) {
        return new Promise( (resolve)=>{
            axios.get(`${ROOT_URL}/getCurrentOrder`, {
                headers: { authorization: localStorage.getItem('MyOnlineMealToken') }
            })
            .then(response => {
                dispatch({ type: FETCH_CURRENT_ORDERS, payload:response.data });

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
