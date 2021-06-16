import {
    ORDER_SAVE_REQUEST,
    ORDER_SAVE_SUCCESS,
    ORDER_SAVE_ERROR,
    ORDER_GET_REQUEST,
    ORDER_GET_SUCCESS,
    ORDER_GET_ERROR,
    ORDER_CLEAR
} from '../Constants'

export const orderReducer = (state = { orderDetails: null }, action) => {
    switch (action.type) {
        case ORDER_SAVE_REQUEST:
            return { loading: true }
        case ORDER_GET_REQUEST:
            return { loading: true }
        case ORDER_SAVE_SUCCESS:
            return { loading: false, orderDetails: action.payload }
        case ORDER_GET_SUCCESS:
            return { loading: false, orderDetails: action.payload }
        case ORDER_SAVE_ERROR:
            return { loading: false, error: action.payload }
        case ORDER_GET_ERROR:
            return { loading: false, error: action.payload }
        case ORDER_CLEAR:
            return { orderDetails: null }
        default:
            return state
    }
}


