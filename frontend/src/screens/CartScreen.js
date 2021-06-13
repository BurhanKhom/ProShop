import React, { useEffect } from 'react'
import { ListGroup, Row, Col } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import { addToCart } from '../actions/cartActions'
import Message from '../components/Message'
import CartProduct from '../components/CartProduct'

const CartScreen = ({ match, location }) => {

    const dispatch = useDispatch();

    useEffect(() => {
        if (match.params.id) {
            const qty = (location.search.split('='))[1];
            dispatch(addToCart(match.params.id, qty));
        }
    }, [dispatch, match])

    const { cartItems } = useSelector(state => state.cart);

    return (
        <>

            {(cartItems.length === 0 &&
                <Message message='The cart is empty' />) ||
                <><h1>My Shopping Cart ({cartItems.length} Items)</h1>
                <Row>
                    <Col md={6}>
                    <ListGroup>
                        {
                            cartItems.map(item => {
                                return (
                                    <CartProduct item={item}/>
                                )
                            })
                        }
                    </ListGroup>
                    </Col>
                    <Col md={3}>
                        Checkout
                    </Col>
                </Row>
                </>
            }
        </>
    )
}

export default CartScreen
