import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { Container, Form, Button, Row, Col } from 'react-bootstrap'
import { userRegister } from '../actions/userActions';
import Message from '../components/Message'
import Loader from '../components/Loader'
const RegisterScreen = ({ location, history }) => {

    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmpassword, setConfirmPassword] = useState('');
    const [message, setMessage] = useState(null)


    const dispatch = useDispatch();

    const { loading, error, userInfo } = useSelector(state => state.userRegister)

    const redirect = location.search ? location.search.split('=')[1] : '/login';



    useEffect(() => {
        if (userInfo) {
            history.push(redirect)
        }
    }, [userInfo, redirect, history])

    const formSubmitHandler = (e) => {
        e.preventDefault();
        if (password === confirmpassword) {
            dispatch(userRegister(name, email, password));
        } else {
            if (password !== confirmpassword) {
                setMessage('Passwords does not match')
            } else {
                setMessage('')
            }
        }
    }
    return (
        <Container>
            <Row className='justify-content-center py-5'>
                <Col xs={12} md={5}>
                    <h1>Register</h1>
                    {message && <Message variant='danger' message={message} />}
                    {error && <Message variant='danger' message={error} />}
                    {loading && <Loader />}
                    <Form onSubmit={formSubmitHandler}>
                        <Form.Group controlId="formBasicName">
                            <Form.Label>Name</Form.Label>
                            <Form.Control type="text" placeholder="Enter name" required
                                onChange={(e) => { setName(e.target.value) }} />
                        </Form.Group>

                        <Form.Group controlId="formBasicEmail">
                            <Form.Label>Email address</Form.Label>
                            <Form.Control type="email" placeholder="Enter email" required
                                onChange={(e) => { setEmail(e.target.value) }} />
                            <Form.Text className="text-muted">
                                We'll never share your email with anyone else
                            </Form.Text>
                        </Form.Group>

                        <Form.Group controlId="formBasicPassword">
                            <Form.Label>Password</Form.Label>
                            <Form.Control type="password" placeholder="Password" required
                                onChange={(e) => { setPassword(e.target.value) }} />
                        </Form.Group>

                        <Form.Group controlId="formBasicConfirmPassword">
                            <Form.Label>Confirm Password</Form.Label>
                            <Form.Control type="password" placeholder="Confirm password" required
                                onChange={(e) => { setConfirmPassword(e.target.value) }} />
                        </Form.Group>
                        <Button variant="primary" type="submit" className='m-3'>
                            Submit
                        </Button>
                        <Form.Text>Already have an account? <Link to='/login'>Login</Link></Form.Text>
                    </Form>
                </Col>
            </Row>
        </Container>
    )
}

export default RegisterScreen
