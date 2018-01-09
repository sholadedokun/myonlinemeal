import axios from 'axios';
import {
  ORDER_ERROR,
  FETCH_CURRENT_ORDERS,
  FETCH_MEAL_OPTIONS,
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
                resolve()
            })
            .catch(error => {
                let errorData= error.response.data.error
                dispatch(planError(errorData));
            });
        })
    }
}
export function getAllMealOptions() {
    return function(dispatch) {
        return new Promise( (resolve)=>{
            axios.get(`${ROOT_URL}/inventory`, {
                headers: { authorization: localStorage.getItem('MyOnlineMealToken') }
            })
            .then(response => {
                dispatch({ type: FETCH_MEAL_OPTIONS, payload:response.data });

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
