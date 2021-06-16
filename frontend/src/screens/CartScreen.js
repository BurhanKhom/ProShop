import React, { useEffect } from 'react'
import { Link } from 'react-router-dom'
import { ListGroup, Row, Col, Button } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import { addToCart } from '../actions/cartActions'
import Message from '../components/Message'
import CartProduct from '../components/CartProduct'
import Loader from '../components/Loader'

const CartScreen = ({ match, location, history }) => {

    const dispatch = useDispatch();
    const { loading } = useSelector(state => state.order);
    const { loading: cartLoading, cartItems } = useSelector(state => state.cart);

    useEffect(() => {
        if (match.params.id) {
            const qty = (location.search.split('='))[1];
            dispatch(addToCart(match.params.id, qty));
        }
    }, [dispatch, match, location.search])


    const checkoutHandler = () => {
        history.push('/login?redirect=shipping');
    }
    const backToHome = () => {
        history.push('/');
    }

    return (
        <>

            {(loading || cartLoading ? <Loader /> : cartItems.length === 0 && (<>
                <Link to='/' className='btn btn-light'>&#8592; Go back to add some items</Link>
                <Message message='The cart is empty' /></>)) ||
                <>
                    <Link to='/' className='btn btn-light'>&#8592; Go back to add some more Items</Link>
                    <h1>My Shopping Cart ({cartItems.length} Items)</h1>
                    <Row>
                        <Col md={8}>
                            <ListGroup variant='flush'>
                                {
                                    cartItems.map(item => {
                                        return (
                                            <CartProduct key={item._id} item={item} />
                                        )
                                    })
                                }
                            </ListGroup>
                        </Col>
                        <Col md={4}>
                            <ListGroup variant=''>
                                <ListGroup.Item>
                                    <h4>Price Details ({cartItems.reduce((acc, item) => acc + Number(item.qty), 0)} items)</h4>
                                </ListGroup.Item>
                                <ListGroup.Item>
                                    <Row>
                                        <Col md={8} style={{
                                            fontWeight: 'bold'
                                        }}>
                                            TOTAL AMOUNT
                                        </Col>
                                        <Col>
                                            &#8377;{cartItems.reduce((acc, item) => Number(Number(acc) + (Number(item.qty) * Number(item.price))).toFixed(2), 0)}
                                        </Col>
                                    </Row>
                                </ListGroup.Item>
                                <Button variant='outline-success'
                                    onClick={checkoutHandler}
                                // onClick={addToCardHandler}
                                >Proceed to Checkout</Button>
                                <>
                                    <Row className='justify-content-center'>
                                        <Col xs={6} md={6} sm={6} lg={2}>OR</Col>
                                    </Row>
                                </>
                                <Button variant='outline-success'
                                    onClick={backToHome}
                                >Add more items</Button>
                            </ListGroup>

                        </Col>
                    </Row>
                </>
            }
        </>
    )
}

export default CartScreen
