import {
    PAY_REQUEST,
    PAY_SUCCESS,
    PAY_ERROR,
    CLEAR_PAYMENT,
    CLEAR_ALL
} from '../Constants'

export const razorReducer = (state = {}, action) => {
    switch (action.type) {
        case PAY_REQUEST:
            return { loading: true }
        case PAY_SUCCESS:
            return { loading: false, data: action.payload }
        case PAY_ERROR:
            return { loading: false, error: action.payload }
        case CLEAR_PAYMENT:
            return { loading: false }
        case CLEAR_ALL:
            return { loading: false, data: null }
        default:
            return state
    }
}