import {
    ADD_TO_CART,
    REMOVE_FROM_CART,
    SAVE_SHIPPING_ADDRESS,
    SAVE_PAYMENT_METHOD,
    CLEAR_CART,
    ADD_TO_CART_REQUEST
} from '../Constants'

export const cartReducer = (state = { cartItems: [], shippingAddress: {} }, action) => {
    switch (action.type) {
        case ADD_TO_CART_REQUEST:
            return { ...state, loading: true }
        case ADD_TO_CART:
            const item = action.payload;
            const existItem = state.cartItems.find(x => x._id === item._id);

            if (existItem) {
                return {
                    ...state,
                    loading: false,
                    cartItems: state.cartItems.map(x => x._id === existItem._id ? item : x)
                }
            } else {
                return {
                    ...state,
                    loading: false,
                    cartItems: [...state.cartItems, item]
                }
            }
        case REMOVE_FROM_CART:
            const itemToRemove = action.payload;
            return {
                ...state,
                loading: false,
                cartItems: state.cartItems.filter(x => { return x._id !== itemToRemove })
            }
        case SAVE_SHIPPING_ADDRESS:
            const address = action.payload;
            return {
                ...state,
                loading: false,
                shippingAddress: address
            }
        case SAVE_PAYMENT_METHOD:
            return {
                ...state,
                loading: false,
                paymentMethod: action.payload
            }
        case CLEAR_CART:
            return {
                ...state,
                loading: false,
                cartItems: []
            }

        default:
            return state
    }
}