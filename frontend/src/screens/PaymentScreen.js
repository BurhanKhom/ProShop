import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Form, Row, Col, Container, Button, Card } from 'react-bootstrap'
import CheckoutSteps from '../components/CheckoutSteps'
import { savePaymentMethod } from '../actions/cartActions'

const PaymentScreen = ({ history }) => {

    const [paymentMethod, setPaymentMethod] = useState('Credit / Debit / UPI');


    const dispatch = useDispatch();

    const cart = useSelector(state => state.cart);
    const { userInfo } = useSelector(state => state.userLogin);
    useEffect(() => {
        if (!userInfo) {
            history.push('/login');
        } else if (!(cart.shippingAddress)) {
            history.push('/shipping');
        }
    }, [cart, history, userInfo])


    const formSubmitHandler = (e) => {
        e.preventDefault();
        dispatch(savePaymentMethod(paymentMethod));
        history.push('/placeorder');
    }

    return (
        <Container className=''>
            <CheckoutSteps step1 step2 step3 />
            <Row className='justify-content-center py-3'>
                <Col xs={12} md={8}>
                    <Card>
                        <Card.Body>
                            <Card.Title><h1>Payment Method</h1></Card.Title>
                            <Form onSubmit={formSubmitHandler}>
                                <Form.Group controlId="formBasicPaymentMethod">
                                    <Form.Label>
                                        Select Payment Method
                                    </Form.Label>
                                    <Form.Check type='radio' label={paymentMethod} name='paymentMethod' checked value={paymentMethod}
                                        onChange={
                                            (e) => {
                                                setPaymentMethod(e.target.value)
                                            }
                                        }>
                                    </Form.Check>
                                </Form.Group>
                                <Button type="submit" className='m-3'>
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

export default PaymentScreen
