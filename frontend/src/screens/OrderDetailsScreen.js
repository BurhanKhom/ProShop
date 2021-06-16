import React, { useEffect } from 'react'
import { Link } from 'react-router-dom'
import { Container, Row, Col, Card, ListGroup, Image, Button } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import Message from '../components/Message'
import { getOrderDetails } from '../actions/orderActions'
import Loader from '../components/Loader'
import { makePayment } from '../actions/razorActions'
import { getUserOrders } from '../actions/userActions'

const OrderDetailsScreen = ({ match, history }) => {

    const dispatch = useDispatch();
    const { userInfo } = useSelector(state => state.userLogin);
    const { loading, error, orderDetails } = useSelector(state => state.order);
    const { error: paymentError, loading: paymentLoading, data } = useSelector(state => state.paymentResult);

    useEffect(() => {
        dispatch(getOrderDetails(match.params.id));
        // if (!orderDetails) {
        //     dispatch(getOrderDetails(match.params.id));
        // }
        // if (!paymentLoading && data && data.updatedOrder) {
        //     dispatch(saveOrder(data.updatedOrder));
        //     dispatch(getUserOrders(userInfo._id, userInfo.token));
        //     dispatch(clearPayment());
        //     // dispatch(clearCart());
        // }
    }, [dispatch, match.params.id]);


    const loadRazorPayScript = async () => {
        let promise = new Promise((resolve) => {
            let script = document.createElement("script");
            script.setAttribute("src", "https://checkout.razorpay.com/v1/checkout.js");
            document.body.appendChild(script);
            script.onload = () => {
                resolve(true);
            }
        });
        await promise;
        return promise;
    }



    const payButtonHandler = async () => {
        let razorPayScriptLoaded = await loadRazorPayScript();
        if (razorPayScriptLoaded) {
            dispatch(makePayment(userInfo, match.params.id));
        }
        getUserOrders(userInfo._id, userInfo.token);
        // getOrderDetails(match.params.id);
    }

    const printButtonHandler = () => {
        window.print();
    }

    return (<>
        {paymentError && <Message variant='danger' message={paymentError} />}
        {data && data.error && <Message variant='danger' message={data.error.description} />}
        {data && data.response && <Message variant='success' message='Payment Successful' />}
        {
            loading || paymentLoading ? <Loader /> :
                error ? <Message variant='danger' message={error} /> :
                    orderDetails ? (
                        <Container>
                            <Row className='py-3'>
                                <h3>Your order</h3>
                                <Col xs={12} md={12} lg={8}>
                                    <Row>
                                        <Col>
                                            <Card>
                                                <Card.Body>
                                                    <Row>
                                                        <Col xs={12} sm={3}>
                                                            <Card.Text>
                                                                Order Date
                                                            </Card.Text>
                                                        </Col>
                                                        <Col>
                                                            <Card.Text>
                                                                {new Date(orderDetails.createdAt).toISOString().substring(0, new Date(orderDetails.createdAt).toISOString().indexOf('T'))}
                                                            </Card.Text>
                                                        </Col>
                                                    </Row>
                                                    <Row>
                                                        <Col xs={12} sm={3}>
                                                            <Card.Text>Order#</Card.Text>
                                                        </Col>
                                                        <Col>
                                                            <Card.Text>
                                                                {orderDetails._id}
                                                            </Card.Text>
                                                        </Col>
                                                    </Row>
                                                </Card.Body>
                                            </Card>
                                        </Col>
                                    </Row>
                                    <Row>
                                        <Col>
                                            <Card>
                                                <Card.Body>
                                                    <Row>
                                                        <Col>
                                                            <Card.Subtitle>Shipping Address</Card.Subtitle>
                                                            <Card.Text dangerouslySetInnerHTML={{
                                                                __html: `${userInfo.name} / ${userInfo.email}<br/>${orderDetails.shippingAddress.address}<br/>
                                        ${orderDetails.shippingAddress.city}, ${orderDetails.shippingAddress.state}
                                        ${orderDetails.shippingAddress.zip}`
                                                            }}>
                                                            </Card.Text>
                                                        </Col>
                                                        <Col>
                                                            <Card.Subtitle>Payment Method</Card.Subtitle>
                                                            <Card.Text>
                                                                {orderDetails.paymentMethod} <br />
                                                            </Card.Text>
                                                        </Col>
                                                    </Row>
                                                </Card.Body>
                                            </Card>
                                        </Col>
                                    </Row>
                                    <Row>
                                        <Col xs={12}>
                                            <Card>
                                                <Card.Body>
                                                    <Card.Title>Ordered Items</Card.Title>
                                                    <ListGroup variant="flush">
                                                        {
                                                            orderDetails.orderItems.length > 0 ? (

                                                                (orderDetails.orderItems).map((item) => {
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
                                                                                    {item.qty} x &#8377;{item.price.toFixed(2)} = &#8377;{
                                                                                        Number(Number(item.qty) * Number(item.price)).toFixed(2)
                                                                                    }
                                                                                </Col>
                                                                            </Row>
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
                                    <Row>
                                        <Card>
                                            <Card.Body>
                                                <Card.Title>
                                                    Order Summary ({orderDetails.orderItems.reduce((acc, item) => acc + Number(item.qty), 0)} items)
                                                </Card.Title>
                                                <ListGroup variant='flush'>
                                                    <ListGroup.Item>
                                                        <Row>
                                                            <Col>
                                                                Total MRP
                                                            </Col>
                                                            <Col>
                                                                &#8377;{Number(orderDetails.totalPrice - Number(Number(orderDetails.taxPrice) + Number(orderDetails.shippingPrice))).toFixed(2)}
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
                                                            <Col>&#8377;{Number(Number(orderDetails.taxPrice) + Number(orderDetails.shippingPrice)).toFixed(2)}</Col>
                                                        </Row>
                                                    </ListGroup.Item>
                                                    <ListGroup.Item>
                                                        <Row className='orderTotal'>
                                                            <Col>
                                                                Order Total
                                                            </Col>
                                                            <Col>
                                                                &#8377;{Number(orderDetails.totalPrice).toFixed(2)}
                                                            </Col>
                                                        </Row>
                                                    </ListGroup.Item>
                                                    {
                                                        !orderDetails.isPaid &&
                                                        (<>
                                                            <Button variant='outline-success' id="rzp-btn"
                                                                onClick={payButtonHandler}>Pay Now
                                                            </Button>
                                                        </>
                                                        )
                                                    }
                                                    {
                                                        orderDetails.isPaid &&
                                                        <Button variant='outline-success' id="rzp-btn"
                                                            onClick={printButtonHandler}
                                                        >Print Invoice</Button>
                                                    }
                                                </ListGroup>
                                            </Card.Body>
                                        </Card>
                                    </Row>
                                    <Row>
                                        <Card>
                                            <Card.Body>
                                                <Card.Title>Status</Card.Title>
                                                <Col>
                                                    <Card.Text>{orderDetails.isPaid ? <i className='fas fa-check-circle' /> : <i className='fas fa-times' />} PAID</Card.Text>
                                                </Col>
                                                <Col>
                                                    <Card.Text>{orderDetails.isDelivered ? <i className='fas fa-check-circle' /> : <i className='fas fa-times' />} DELIVERED</Card.Text>
                                                </Col>
                                            </Card.Body>
                                        </Card>
                                    </Row>
                                </Col>

                            </Row>
                        </Container>
                    ) : 'Order Info Not Found'
        }</>)
}

export default OrderDetailsScreen
