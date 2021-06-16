import {
    USER_LOGIN_REQUEST,
    USER_LOGIN_SUCCESS,
    USER_LOGIN_FAIL,
    USER_LOGIN_ERROR,
    USER_LOGOUT_REQUEST,
    USER_LOGOUT_SUCCESS,
    USER_REGISTER_REQUEST,
    USER_REGISTER_SUCCESS,
    USER_REGISTER_ERROR,
    USER_PROFILE_REQUEST,
    USER_PROFILE_SUCCESS,
    USER_PROFILE_ERROR,
    USER_PROFILE_UPDATE_REQUEST,
    USER_PROFILE_UPDATE_SUCCESS,
    USER_PROFILE_UPDATE_ERROR,
    USER_ORDERS_REQUEST,
    USER_ORDERS_SUCCESS,
    USER_ORDERS_ERROR,
    CLEAR_ALL,
    UPDATE_PROFILE
} from '../Constants'

export const userLoginReducer = (state = { userInfo: {} }, action) => {
    switch (action.type) {
        case USER_LOGIN_REQUEST:
            return { loading: true }
        case USER_LOGIN_SUCCESS:
            return { loading: false, userInfo: action.payload }
        case USER_LOGIN_FAIL:
            return { loading: false, error: action.payload }
        case USER_LOGIN_ERROR:
            return { loading: false, error: action.payload }
        case USER_LOGOUT_SUCCESS:
            return { loading: false }
        default:
            return state
    }
}

export const userLogoutReducer = (state = { userInfo: {} }, action) => {
    switch (action.type) {
        case USER_LOGOUT_REQUEST:
            return { loading: true }
        default:
            return state
    }
}

export const userRegisterReducer = (state = { userInfo: {} }, action) => {
    switch (action.type) {
        case USER_REGISTER_REQUEST:
            return { loading: true }
        case USER_REGISTER_SUCCESS:
            return { loading: false, userInfo: action.payload }
        case USER_REGISTER_ERROR:
            return { loading: false, error: action.payload }
        case USER_LOGOUT_SUCCESS:
            return { loading: false }
        default:
            return state
    }
}

export const userProfileReducer = (state = { userInfo: {} }, action) => {
    switch (action.type) {
        case USER_PROFILE_REQUEST:
            return { loading: true }
        case USER_PROFILE_SUCCESS:
            return { loading: false, userInfo: action.payload }
        case USER_PROFILE_ERROR:
            return { loading: false, error: action.payload }
        case USER_LOGOUT_SUCCESS:
            return { loading: false }
        case USER_PROFILE_UPDATE_REQUEST:
            return { loading: true }
        case USER_PROFILE_UPDATE_SUCCESS:
            return { loading: false, userInfo: action.payload }
        case USER_PROFILE_UPDATE_ERROR:
            return { loading: false, error: action.payload }
        default:
            return state
    }
}


export const userOrdersReducer = (state = { userOrders: [] }, action) => {
    switch (action.type) {
        case USER_ORDERS_REQUEST:
            return { loading: true }
        case USER_ORDERS_SUCCESS:
            return { loading: false, userOrders: action.payload }
        case USER_ORDERS_ERROR:
            return { loading: false, error: action.payload }
        case CLEAR_ALL:
            return { loading: false, userOrders: null }
        case UPDATE_PROFILE:
            return { userOrders: [] }
        default:
            return state
    }
}