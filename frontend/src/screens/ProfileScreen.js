import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Row, Col, Button, Form, Container } from 'react-bootstrap'
import { userProfile, userProfileUpdate } from '../actions/userActions'
import Loader from '../components/Loader'
import Message from '../components/Message'
import ProfileOrders from '../components/ProfileOrders'
import { getOrderDetails } from '../actions/orderActions'

const ProfileScreen = ({ history }) => {


    const { loading, error, userInfo } = useSelector(state => state.userProfile);
    const { userInfo: userLoginInfo } = useSelector(state => state.userLogin);
    const [name, setName] = useState(userLoginInfo.name);
    const [email, setEmail] = useState(userLoginInfo.email);
    const [password, setPassword] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [confirmNewPassword, setConfirmNewPassword] = useState('');
    const [message, setMessage] = useState(null);
    const [formSubmitted, setFormSubmitted] = useState(0);

    const dispatch = useDispatch();


    useEffect(() => {
        dispatch(userProfile(userLoginInfo.token));
        dispatch(getOrderDetails(userLoginInfo._id, userLoginInfo.token));
    }, [history, dispatch, userLoginInfo])


    const formSubmitHandler = (e) => {
        e.preventDefault();
        if (newPassword !== confirmNewPassword) {
            setMessage('Passwords does not match')
        } else {
            setMessage('')
            setFormSubmitted(1);
            const userUpdateInfo = {
                token: userLoginInfo.token,
                _id: userLoginInfo._id,
                name,
                email,
                oldEnteredPassword: password,
                newEnteredPassword: confirmNewPassword
            }
            dispatch(userProfileUpdate(userUpdateInfo));
        }

    }

    return (
        <Container>
            <Row>
                <Col xs={12} md={4}>
                    <h1>Profile</h1>
                    {message ? <Message variant='danger' message={message} /> :
                        error ? <Message variant='danger' message={error} /> :
                            loading ? <Loader /> :
                                !error && userInfo && userInfo.id && formSubmitted === 1 ? <Message variant='success' message={`Profile updated`} /> : ''
                    }
                    {userLoginInfo && (
                        <Form onSubmit={formSubmitHandler}>
                            <Form.Group controlId="formBasicName">
                                <Form.Label>Name</Form.Label>
                                <Form.Control type="text" placeholder="Enter name" value={name} required
                                    onChange={(e) => { setName(e.target.value) }} />
                            </Form.Group>

                            <Form.Group controlId="formBasicEmail">
                                <Form.Label>Email address</Form.Label>
                                <Form.Control type="email" placeholder="Enter email" value={email} required
                                    onChange={(e) => { setEmail(e.target.value) }} />
                            </Form.Group>

                            <Form.Group controlId="formBasicOldPassword">
                                <Form.Label>Old Password</Form.Label>
                                <Form.Control type="password" placeholder="Old password" required
                                    onChange={(e) => { setPassword(e.target.value) }} />
                            </Form.Group>

                            <Form.Group controlId="formBasicNewPassword">
                                <Form.Label>New Password</Form.Label>
                                <Form.Control type="password" placeholder="New password"
                                    onChange={(e) => { setNewPassword(e.target.value) }} />
                            </Form.Group>

                            <Form.Group controlId="formBasicConfirmNewPassword">
                                <Form.Label>Confirm Password</Form.Label>
                                <Form.Control type="password" placeholder="Confirm password"
                                    onChange={(e) => { setConfirmNewPassword(e.target.value) }} />
                            </Form.Group>
                            <Button type="submit" className='m-3'>
                                Update
                            </Button>
                        </Form>
                    )}
                </Col>
                <Col xs={12} md={8}>
                    <h1>My Orders</h1>
                    <ProfileOrders />
                </Col>
            </Row>
        </Container>
    )
}

export default ProfileScreen
