import { createStore, combineReducers, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'
import { composeWithDevTools } from 'redux-devtools-extension'
import { productListReducer, productDetailsReducer } from './reducers/productReducers'
import { cartReducer } from './reducers/cartReducers'
import { userLoginReducer, userRegisterReducer, userProfileReducer, userOrdersReducer } from './reducers/userReducers'
import { orderReducer } from './reducers/orderReducers'
import { razorReducer } from './reducers/razorPayReducer'

const reducer = combineReducers({
    productList: productListReducer,
    productDetails: productDetailsReducer,
    cart: cartReducer,
    userLogin: userLoginReducer,
    userRegister: userRegisterReducer,
    userProfile: userProfileReducer,
    userOrder: userOrdersReducer,
    order: orderReducer,
    paymentResult: razorReducer
})

const middleware = [thunk]

const userInfo = localStorage.getItem('userInfo') && localStorage.getItem('userInfo') !== 'null' && localStorage.getItem('userInfo') !== 'undefined' ?
    JSON.parse(localStorage.getItem('userInfo')) : null

const inititalState = {
    cart: {
        cartItems: localStorage.getItem('cartItems') ? JSON.parse(localStorage.getItem('cartItems')) : [],
        shippingAddress: localStorage.getItem('shippingAddress') ? JSON.parse(localStorage.getItem('shippingAddress')) : null,
        paymentMethod: localStorage.getItem('paymentMethod') ? localStorage.getItem('paymentMethod') : null
    },
    userLogin: {
        userInfo: userInfo
    },
    userRegister: {
        userInfo: userInfo
    },
    userProfile: {
        userInfo: userInfo
    }
}

const store = createStore(
    reducer,
    inititalState,
    composeWithDevTools(applyMiddleware(...middleware))
)

export default store