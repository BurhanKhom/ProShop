import axios from 'axios'
import {
    ADD_TO_CART,
    REMOVE_FROM_CART
} from '../Constants'


export const addToCart = (id, qty) => async (dispatch, getState) => {
    try {
        const { data } = await axios(`/api/products/${id}`);
        dispatch({ type: ADD_TO_CART, payload: {...data, qty: qty} });
        localStorage.setItem('cartItems', JSON.stringify(getState().cart.cartItems))
    } catch (err) {
        // dispatch({ type: PRODUCT_LIST_ERROR, payload: err.response && err.response.data.message ? err.response.data.message : err.message });
    }
}