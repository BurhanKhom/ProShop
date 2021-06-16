import React, { useEffect } from 'react'
import { Link } from 'react-router-dom'
import { Container, Row, Col, Card, ListGroup, Image, Button } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import CheckoutSteps from '../components/CheckoutSteps'
import Message from '../components/Message'
import { saveOrder } from '../actions/orderActions'
import { clearCart } from '../actions/cartActions'
import Loader from '../components/Loader'

const PlaceOrderScreen = ({ history }) => {

    // const history = useHistory();
    const cart = useSelector(state => state.cart);
    const { userInfo } = useSelector(state => state.userLogin);
    const { loading, error, orderDetails } = useSelector(state => state.order);

    useEffect(() => {
        if (!userInfo) {
            history.push('/login');
        }
        else if (!loading) {
            if (cart && (cart.cartItems.length === 0)) {
                history.push('/cart');
            }
            else if (cart && !(cart.shippingAddress)) {
                history.push('/shipping');
            }
            else if (cart && !(cart.paymentMethod)) {
                history.push('/payment')
            }
        }
        // else if (!loading && !error && orderDetails && orderDetails._id) {
        //     history.push(`/order/${orderDetails._id}`);
        // }
        // else {
        //     history.push('/');
        // }
    }, [cart, history, loading, userInfo])


    let tax = Number(0.018 * cart.cartItems.reduce((acc, item) => Number(Number(acc) + (Number(item.qty) * Number(item.price))).toFixed(2), 40)).toFixed(2);
    let shipping = 40;
    let delAndTax = (Number(shipping) + Number(tax)).toFixed(2);
    let total = Number(cart.cartItems.reduce((acc, item) => Number(Number(acc) + (Number(item.qty) * Number(item.price))).toFixed(2), 0)).toFixed(2);
    let orderTotal = Number(Number(total) + Number(delAndTax)).toFixed(2);

    const dispatch = useDispatch();

    const order = userInfo ? {
        user: userInfo._id,
        orderItems: cart.cartItems.map(item => {
            return {
                name: item.name, qty: item.qty, image: item.image, price: item.price, product: item._id
            }
        }),
        shippingAddress: cart.shippingAddress,
        taxPrice: tax,
        shippingPrice: shipping,
        totalPrice: orderTotal,
        paymentMethod: cart.paymentMethod

    } : null;

    const checkoutHandler = (e) => {
        e.preventDefault();
        dispatch(saveOrder(order, history));
        dispatch(clearCart());
        if (orderDetails) {
            // history.push(`/order/${orderDetails._id}`);
        }
    }

    let estimateDelivery = new Date();
    let numberOfDaysToAdd = 6;
    estimateDelivery.setDate(estimateDelivery.getDate() + numberOfDaysToAdd);
    let displayDate = estimateDelivery.toISOString();
    displayDate = displayDate.substring(0, displayDate.indexOf('T'));

    return (loading ? <Loader /> : error ? <Message variant='danger' message={error} /> : (cart && cart.cartItems.length > 0 && cart.shippingAddress && cart.paymentMethod) ? (
        <Container className=''>
            <CheckoutSteps step1 step2 step3 step4 />
            <Row className='py-3 justify-content-center'>
                <h3>Review your order</h3>
                <Col xs={12} md={12} lg={8}>
                    <Row>
                        <Col>
                            <Card>
                                <Card.Body>
                                    {/* <Card.Title>Shipping &amp; Billing details</Card.Title> */}
                                    <Row>
                                        <Col>
                                            <Card.Subtitle>Shipping Address</Card.Subtitle>
                                            <Card.Text dangerouslySetInnerHTML={{
                                                __html: `${cart.shippingAddress.address}<br/>
                                        ${cart.shippingAddress.city}, ${cart.shippingAddress.state}
                                        ${cart.shippingAddress.zip}`
                                            }}>
                                            </Card.Text>
                                        </Col>
                                        <Col>
                                            <Card.Subtitle>Payment Method</Card.Subtitle>
                                            <Card.Text>
                                                {cart.paymentMethod}
                                            </Card.Text>
                                        </Col>
                                    </Row>
                                </Card.Body>
                            </Card>
                        </Col>
                    </Row>
                    <Row>
                        <Col xs={12} md={12} lg={12}>
                            <Card>
                                <Card.Body>
                                    <Card.Title className='estimatedDeliveryDate'>Estimated Delivery by {displayDate}</Card.Title>
                                    <ListGroup variant="flush">
                                        {
                                            cart.cartItems.length > 0 ? (

                                                (cart.cartItems).map((item) => {
                                                    return (
                                                        <ListGroup.Item key={item._id}>
                                                            <Row>
                                                                <Col md={2} xs={4}>
                                                                    <Link to={`/product/${item._id}`}>
                                                                        <Image src={item.image} fluid rounded />
                                                                    </Link>
                                                                </Col>
                                                                <Col md={5} xs={8}>
                                                                    {item.name}
                                                                </Col>
                                                                <Col md={5} xs={9} className='justify-content-center'>
                                                                    {item.qty} x &#8377;{item.price.toFixed(2)} = {
                                                                        Number(Number(item.qty) * Number(item.price)).toFixed(2)
                                                                    }
                                                                </Col>
                                                            </Row>
                                                            {/* {item.name} */}
                                                        </ListGroup.Item>

                                                    )
                                                })

                                            ) : (
                                                <Message message='Your cart is empty' />
                                            )
                                        }
                                    </ListGroup>
                                </Card.Body>
                            </Card>
                        </Col>
                    </Row>
                </Col>
                <Col md={12} xs={12} lg={4}>
                    <Card>
                        <Card.Body>
                            <Card.Title>
                                Order Summary ({cart.cartItems.reduce((acc, item) => acc + Number(item.qty), 0)} items)
                            </Card.Title>
                            <ListGroup variant='flush'>
                                <ListGroup.Item>
                                    <Row>
                                        <Col>
                                            Total MRP
                                        </Col>
                                        <Col>
                                            &#8377;{total}
                                        </Col>
                                    </Row>
                                </ListGroup.Item>
                                <ListGroup.Item>
                                    <Row>
                                        <Col>
                                            Convenience Fee
                                        </Col>
                                        <Col>
                                            <span style={{
                                                color: 'green'
                                            }}>FREE</span>
                                        </Col>
                                    </Row>
                                </ListGroup.Item>
                                <ListGroup.Item>
                                    <Row>
                                        <Col>
                                            Delivery &amp; Tax
                                        </Col>
                                        <Col>&#8377;{delAndTax}</Col>
                                    </Row>
                                </ListGroup.Item>
                                <ListGroup.Item>
                                    <Row className='orderTotal'>
                                        <Col>
                                            Order Total
                                        </Col>
                                        <Col>
                                            &#8377;{orderTotal}
                                        </Col>
                                    </Row>
                                </ListGroup.Item>
                                <Button variant='outline-success'
                                    onClick={checkoutHandler}
                                // onClick={addToCardHandler}
                                >Place Order</Button>
                            </ListGroup>
                        </Card.Body>
                    </Card>
                    {loading && <Loader />}
                </Col>
            </Row>
        </Container>
    ) : <Loader />
    )
}

export default PlaceOrderScreen
