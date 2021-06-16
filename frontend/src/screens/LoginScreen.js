import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { Container, Form, Button, Row, Col } from 'react-bootstrap'
import { userLogin } from '../actions/userActions';
import Message from '../components/Message'
import Loader from '../components/Loader'
const LoginScreen = ({ location, history }) => {

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');


    const dispatch = useDispatch();

    const { loading, error, userInfo } = useSelector(state => state.userLogin)

    const redirect = location.search ? location.search.split('=')[1] : '/';

    useEffect(() => {
        if (userInfo && redirect) {
            history.push(redirect)
        }
    }, [userInfo, location, redirect, history])

    const formSubmitHandler = (e) => {
        e.preventDefault();
        dispatch(userLogin(email, password));

    }
    return (
        <Container className='py-5'>
            <Row className='justify-content-center'>
                <Col xs={12} md={5}>
                    <h1>Sign In</h1>
                    {error && <Message variant='danger' message={error} />}
                    {loading && <Loader />}
                    <Form onSubmit={formSubmitHandler}>
                        <Form.Group controlId="formBasicEmail">
                            <Form.Label>Email address</Form.Label>
                            <Form.Control type="email" placeholder="Enter email"
                                onChange={(e) => { setEmail(e.target.value) }} />
                        </Form.Group>
                        <br/>
                        <Form.Group controlId="formBasicPassword">
                            <Form.Label>Password</Form.Label>
                            <Form.Control type="password" placeholder="Password"
                                onChange={(e) => { setPassword(e.target.value) }} />
                        </Form.Group>
                        <Button variant="primary" type="submit" className='m-3'>
                            Submit
                        </Button>
                        <Form.Text>Don't have an account? <Link to={`/register/?redirect=login`}>Register Now</Link></Form.Text>
                    </Form>
                </Col>
            </Row>
        </Container>
    )
}

export default LoginScreen
