import {
    USER_LOGIN_REQUEST,
    USER_LOGIN_SUCCESS,
    USER_LOGIN_FAIL,
    USER_LOGIN_ERROR,
    USER_LOGOUT_REQUEST,
    USER_LOGOUT_SUCCESS,
    USER_REGISTER_REQUEST,
    USER_REGISTER_SUCCESS,
    USER_REGISTER_FAIL,
    USER_REGISTER_ERROR,
    USER_PROFILE_REQUEST,
    USER_PROFILE_SUCCESS,
    USER_PROFILE_ERROR,
    USER_PROFILE_UPDATE_REQUEST,
    USER_PROFILE_UPDATE_SUCCESS,
    USER_PROFILE_UPDATE_ERROR,
    USER_ORDERS_REQUEST,
    USER_ORDERS_SUCCESS,
    USER_ORDERS_ERROR
} from '../Constants'

import axios from 'axios'

export const userLogin = (email, password) => async (dispatch) => {
    try {
        dispatch({ type: USER_LOGIN_REQUEST })
        const { data } = await axios.post('/api/user/login', { email, password }, {
            'Content-Type': 'application/json'
        });
        if (data.email) {
            dispatch({ type: USER_LOGIN_SUCCESS, payload: data });
            localStorage.setItem('userInfo', JSON.stringify(data))
        } else {
            dispatch({ type: USER_LOGIN_FAIL, payload: data });
        }
    } catch (err) {
        dispatch({ type: USER_LOGIN_ERROR, payload: err.response && err.response.data.message ? err.response.data.message : err.message });
    }
}


export const userLogout = () => async (dispatch) => {
    try {
        dispatch({ type: USER_LOGOUT_REQUEST });
        localStorage.removeItem('userInfo');
        dispatch({ type: USER_LOGOUT_SUCCESS });
    } catch (err) { }
}


export const userRegister = (name, email, password) => async (dispatch) => {
    try {
        dispatch({ type: USER_REGISTER_REQUEST });
        const { data } = await axios.post('/api/user/register', { name, email, password }, {
            'Content-Type': 'application/json'
        });
        if (data.email) {
            dispatch({ type: USER_REGISTER_SUCCESS, payload: data });
        } else {
            dispatch({ type: USER_REGISTER_FAIL, payload: data });
        }
    } catch (err) {
        dispatch({ type: USER_REGISTER_ERROR, payload: err.response && err.response.data.message ? err.response.data.message : err.message });
    }
}

export const userProfileUpdate = (userUpdateInfo) => async (dispatch, getState) => {
    try {
        dispatch({ type: USER_PROFILE_UPDATE_REQUEST });
        const config = {
            headers: { Authorization: `Bearer ${userUpdateInfo.token}` },
            'Content-Type': 'application/json'
        };
        const { data } = await axios.put('/api/user/update', {
            _id: userUpdateInfo._id,
            name: userUpdateInfo.name,
            email: userUpdateInfo.email,
            oldPassword: userUpdateInfo.oldEnteredPassword,
            newPassword: userUpdateInfo.newEnteredPassword
        }, config);
        dispatch({ type: USER_PROFILE_UPDATE_SUCCESS, payload: data });
        data.token = getState().userLogin.userInfo.token;
        // dispatch({type: USER_LOGIN_REQUEST})
        // userLogin(data.email, userUpdateInfo.newEnteredPassword ? userUpdateInfo.newEnteredPassword :userUpdateInfo.oldEnteredPassword );
        dispatch({ type: USER_LOGIN_SUCCESS, payload: data });
        localStorage.setItem('userInfo', JSON.stringify(data));
    } catch (err) {
        dispatch({ type: USER_PROFILE_UPDATE_ERROR, payload: err.response && err.response.data.message ? err.response.data.message : err.message });
    }
}


export const userProfile = (token) => async (dispatch) => {
    try {
        dispatch({ type: USER_PROFILE_REQUEST });
        const config = {
            headers: { Authorization: `Bearer ${token}` }
        };
        const { data } = await axios.post('/api/user/profile', {}, config);
        dispatch({ type: USER_PROFILE_SUCCESS, payload: data });
        // localStorage.setItem('userInfo', JSON.stringify(data))
    } catch (err) {
        dispatch({ type: USER_PROFILE_ERROR, payload: err.response && err.response.data.message ? err.response.data.message : err.message });
    }
}

export const getUserOrders = (userId, token) => async (dispatch) => {
    try {
        dispatch({ type: USER_ORDERS_REQUEST });
        const config = {
            headers: { Authorization: `Bearer ${token}` }
        };
        const { data } = await axios.post('/api/user/orders', {userId}, config);
        dispatch({type: USER_ORDERS_SUCCESS, payload: data});
    } catch (err) {
        dispatch({ type: USER_ORDERS_ERROR, payload: err.response && err.response.data.message ? err.response.data.message : err.message });
    }
}