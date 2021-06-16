import React, { useState, useEffect } from 'react'
import { Form, Row, Col, Container, Button, Card } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import CheckoutSteps from '../components/CheckoutSteps'
import { saveAddress } from '../actions/cartActions'

const ShippingScreen = ({ history }) => {

    const [address, setAddress] = useState('');
    const [state, setState] = useState('');
    const [city, setCity] = useState('');
    const [zip, setZip] = useState('');

    const dispatch = useDispatch();

    const shippingData = useSelector(state => state.cart.shippingAddress);
    const { userInfo } = useSelector(state => state.userLogin);

    useEffect(() => {
        if (!userInfo) {
            history.push('/login');
        }
        else if (shippingData) {
            setAddress(shippingData.address)
            setState(shippingData.state)
            setCity(shippingData.city)
            setZip(shippingData.zip)
        }
    }, [shippingData, history, userInfo])

    const formSubmitHandler = (e) => {
        e.preventDefault();
        dispatch(saveAddress(address, state, city, zip))
        history.push('/payment');
    }

    return (
        <Container className=''>
            <CheckoutSteps step1 step2 />
            <Row className='justify-content-center py-3'>
                <Col xs={12} lg={8}>
                    <Card>
                        <Card.Body>
                            <Card.Title><h1>Shipping Address</h1></Card.Title>
                            <Form onSubmit={formSubmitHandler}>
                                <Form.Group controlId="formBasicAddress">
                                    <Form.Label>Address Line</Form.Label>
                                    <Form.Control type="text" placeholder="Enter address" value={address} required
                                        onChange={(e) => { setAddress(e.target.value) }} />
                                </Form.Group>
                                <Form.Group controlId="formBasicState">
                                    <Form.Label>State</Form.Label>
                                    <Form.Control type="text" placeholder="Enter state" value={state} required
                                        onChange={(e) => { setState(e.target.value) }} />
                                </Form.Group>
                                <Form.Group controlId="formBasicCity">
                                    <Form.Label>City</Form.Label>
                                    <Form.Control type="text" placeholder="Enter city" value={city} required
                                        onChange={(e) => { setCity(e.target.value) }} />
                                </Form.Group>
                                <Form.Group controlId="formBasicZip">
                                    <Form.Label>Pincode</Form.Label>
                                    <Form.Control type="text" placeholder="Enter pincode" value={zip} pattern="[0-9]+" required
                                        onChange={(e) => { setZip(e.target.value) }} />
                                </Form.Group>
                                <Button type="submit" className='m-3' block>
                                    Continue
                                </Button>
                            </Form>

                        </Card.Body>
                    </Card>
                </Col>
            </Row>
        </Container>
    )
}

export default ShippingScreen
