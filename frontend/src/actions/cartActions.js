import axios from 'axios'
import {
    ADD_TO_CART_REQUEST,
    ADD_TO_CART,
    REMOVE_FROM_CART,
    SAVE_SHIPPING_ADDRESS,
    SAVE_PAYMENT_METHOD,
    CLEAR_CART
} from '../Constants'


export const addToCart = (id, qty) => async (dispatch, getState) => {
    try {
        dispatch({ type: ADD_TO_CART_REQUEST });
        const { data } = await axios(`/api/products/${id}`);
        dispatch({ type: ADD_TO_CART, payload: { ...data, qty: qty } });
        localStorage.setItem('cartItems', JSON.stringify(getState().cart.cartItems))
    } catch (err) {
        // dispatch({ type: PRODUCT_LIST_ERROR, payload: err.response && err.response.data.message ? err.response.data.message : err.message });
    }
}


export const removeFromCart = (id) => async (dispatch, getState) => {
    try {
        dispatch({ type: REMOVE_FROM_CART, payload: id });
        localStorage.setItem('cartItems', JSON.stringify(getState().cart.cartItems))
    } catch (err) {
        // dispatch({ type: PRODUCT_LIST_ERROR, payload: err.response && err.response.data.message ? err.response.data.message : err.message });
    }
}

export const saveAddress = (address, state, city, zip) => async (dispatch, getState) => {
    try {
        dispatch({ type: SAVE_SHIPPING_ADDRESS, payload: { address, state, city, zip } });
        localStorage.setItem('shippingAddress', JSON.stringify(getState().cart.shippingAddress));
    } catch (err) { }
}

export const savePaymentMethod = (paymentMethod) => async (dispatch, getState) => {
    try {
        dispatch({ type: SAVE_PAYMENT_METHOD, payload: paymentMethod });
        localStorage.setItem('paymentMethod', getState().cart.paymentMethod);
    } catch (err) { }
}

export const clearCart = () => async (dispatch) => {
    dispatch({ type: CLEAR_CART });
    // dispatch({ type: ORDER_CLEAR });
    localStorage.removeItem('cartItems');
}
