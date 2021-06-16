import React, { useEffect } from 'react'
import { Link } from 'react-router-dom'
import { Row, Col, Button, ListGroup, Card } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import { getUserOrders } from '../actions/userActions'
import Loader from '../components/Loader'
import Message from '../components/Message'


const ProfileOrders = () => {

    const { userInfo } = useSelector(state => state.userLogin);
    const { loading, error, userOrders } = useSelector(state => state.userOrder);

    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getUserOrders(userInfo._id, userInfo.token));
    }, [dispatch, userInfo])


    return (
        loading ? <Loader /> : error ? <Message message={error} /> : (
            <div>
                {
                    userOrders.map((order) => {
                        return (
                            <Card key={order._id} className='my-3'>
                                <Card.Header as='h6'>
                                    <Row className='justify-content-center'>
                                        <Col xs={10} sm={10} md={10} lg={10}>
                                            Order# {order._id}<br />
                                            <h5>Placed on {new Date(order.createdAt).toDateString()}</h5>
                                        </Col>
                                        <Col xs={4} sm={4} md={4} lg={2}>
                                            <Link to={`/order/${order._id}`}>
                                                <Button size='sm'>View Details</Button>
                                            </Link>
                                        </Col>
                                    </Row>

                                </Card.Header>
                                <Card.Body>
                                    <Row>
                                        <Col xs={12} sm={12} lg={6}>
                                            <Card.Subtitle>Items</Card.Subtitle>
                                            <Row>
                                                <ListGroup className='profileOrdersList' variant='flush'>
                                                    {
                                                        (order.orderItems).map((item) => {
                                                            return (
                                                                <ListGroup.Item key={item._id}>
                                                                    {item.name}
                                                                </ListGroup.Item>
                                                            )
                                                        })
                                                    }
                                                </ListGroup>
                                            </Row>
                                        </Col>
                                        <Col xs={12} sm={12} md={12} lg={6}>
                                            <Card.Subtitle>Status</Card.Subtitle>
                                            <Row>
                                                <Col xs={12} md={12} lg={4}>
                                                    <Card.Text>
                                                        {
                                                            order.isPaid ? <i className='fas fa-check-circle' /> :
                                                                <i className='fas fa-times' />
                                                        } PAID
                                                    </Card.Text>
                                                </Col>
                                                <Col xs={12} md={12} lg={8}>
                                                    <Card.Text>
                                                        {
                                                            order.isDelivered ? <i className='fas fa-check-circle' /> :
                                                                <i className='fas fa-times' />
                                                        } DELIVERED
                                                    </Card.Text>
                                                </Col>
                                            </Row>
                                        </Col>
                                    </Row>
                                </Card.Body>
                            </Card>
                        )

                    })
                }
            </div >
        )
    )
}

export default ProfileOrders
