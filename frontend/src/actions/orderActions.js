import {
    ORDER_SAVE_REQUEST,
    ORDER_SAVE_SUCCESS,
    ORDER_SAVE_ERROR,
    ORDER_GET_REQUEST,
    ORDER_GET_SUCCESS,
    ORDER_GET_ERROR,
    ORDER_CLEAR,
    CLEAR_PAYMENT
} from '../Constants'
import axios from 'axios'

export const saveOrder = (order, history) => async (dispatch, getState) => {
    try {
        dispatch({ type: ORDER_SAVE_REQUEST });
        const config = {
            headers: {
                Authorization: `Bearer ${getState().userLogin.userInfo.token}`,
                'Content-Type': 'application/json'
            }
        };
        const { data } = await axios.post('/api/order/save', order, config);
        dispatch({ type: ORDER_SAVE_SUCCESS, payload: data });
        dispatch({ type: ORDER_CLEAR });
        dispatch({ type: ORDER_GET_REQUEST });
        const { data: updatedData } = await axios.post('/api/order/get', { orderId: data._id }, config);
        dispatch({ type: ORDER_GET_SUCCESS, payload: updatedData })
        if (history) {
            history.push(`/order/${data._id}`);
        }

    } catch (err) {
        dispatch({ type: ORDER_SAVE_ERROR, payload: err.response && err.response.data.message ? err.response.data.message : err.message });
    }
}


export const getOrderDetails = (orderId) => async (dispatch, getState) => {
    try {
        dispatch({ type: CLEAR_PAYMENT });
        dispatch({ type: ORDER_GET_REQUEST });
        const config = {
            headers: {
                Authorization: `Bearer ${getState().userLogin.userInfo.token}`,
                'Content-Type': 'application/json'
            }
        };
        const { data } = await axios.post('/api/order/get', { orderId }, config);
        dispatch({ type: ORDER_GET_SUCCESS, payload: data });
    } catch (err) {
        dispatch({ type: ORDER_GET_ERROR, payload: err.response && err.response.data.message ? err.response.data.message : err.message });
    }
}