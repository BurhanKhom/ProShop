import {
    PAY_REQUEST,
    PAY_SUCCESS,
    PAY_ERROR,
    CLEAR_PAYMENT,
    ORDER_GET_SUCCESS,
    ORDER_GET_REQUEST,
    UPDATE_PROFILE,
    ORDER_SAVE_REQUEST,
    ORDER_SAVE_SUCCESS
} from '../Constants'

import axios from 'axios'

export const makePayment = (userInfo, orderId) => async (dispatch, getState) => {
    try {
        dispatch({ type: PAY_REQUEST });
        const config = {
            headers: {
                Authorization: `Bearer ${userInfo.token}`,
                'Content-Type': 'application/json'
            }
        };
        const { data } = await axios.post(`/api/order/razorpay/${orderId}`, {}, config);
        const razorPayConfig = await axios.post('/api/config/razorpay');
        debugger
        var options = {
            ...data.createdOrder,
            "key": razorPayConfig.data.key,
            "name": "BKART",
            "description": "Payment for BKart Order",
            "image": "https://i.pinimg.com/236x/2d/96/4a/2d964a6bf37d9224d0615dc85fccdd62--shopping-cart-logo-info-graphics.jpg",
            "order_id": data.id,
            "handler": async function (response) {
                let updatedOrder = getState().order.orderDetails;
                updatedOrder = {
                    ...updatedOrder,
                    isPaid: true,
                    paidAt: new Date(),
                    paymentData: {
                        payment_id: response.razorpay_payment_id,
                        order_id: response.razorpay_order_id,
                        signature: response.razorpay_signature,
                        updateTime: new Date()
                    }
                }
                dispatch({ type: PAY_SUCCESS, payload: { response, updatedOrder } });
                dispatch({ type: ORDER_SAVE_REQUEST });
                const { data } = await axios.post(`/api/order/save`, updatedOrder, config);
                dispatch({ type: ORDER_SAVE_SUCCESS, payload: data });
                dispatch({ type: ORDER_GET_REQUEST });
                dispatch({ type: ORDER_GET_SUCCESS, payload: updatedOrder });
                dispatch({ type: UPDATE_PROFILE });
            },
            "prefill": {
                "name": userInfo.name,
                "email": userInfo.email
            },
            "theme": {
                "color": "#1a1a1a"
            },
            "modal": {
                "ondismiss": function () {
                    dispatch({ type: PAY_ERROR, payload: 'Payment checkout form closed by the user' })
                }
            }
        };
        var rzp1 = new window.Razorpay(options);
        rzp1.on('payment.failed', function (response) {
            dispatch({ type: PAY_ERROR, payload: response.error.description });
        });
        rzp1.open();
    } catch (err) {
        dispatch({ type: PAY_ERROR, payload: err.response && err.response.data.message ? err.response.data.message : err.message });
    }
}

export const clearPayment = () => async (dispatch) => {
    dispatch({ type: CLEAR_PAYMENT });
    // dispatch({ type: CLEAR_ALL });
}