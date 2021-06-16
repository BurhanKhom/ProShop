import React from 'react'
import { useHistory, Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { Navbar, Nav, Container, NavDropdown } from 'react-bootstrap'
import { LinkContainer } from 'react-router-bootstrap'
import { userLogout } from '../actions/userActions'

const Header = () => {

    const { userInfo } = useSelector(state => state.userLogin);

    const dispatch = useDispatch();

    const history = useHistory();

    const logoutHandler = (e) => {
        e.preventDefault();
        dispatch(userLogout());
        history.push('/login')
    }

    return (
        <header>
            <Navbar bg="dark" variant="dark" expand="lg" collapseOnSelect>
                <Container>
                    <LinkContainer to='/'>
                        <Navbar.Brand>BKART</Navbar.Brand>
                    </LinkContainer>
                    <Navbar.Toggle aria-controls="basic-navbar-nav" />
                    <Navbar.Collapse id="basic-navbar-nav">
                        <Nav className="ms-auto">
                            <LinkContainer to='/cart'>
                                <Nav.Link>
                                    <i className="fas fa-shopping-cart" />&nbsp;Cart
                                </Nav.Link>
                            </LinkContainer>
                            {
                                userInfo ?
                                    <NavDropdown title={userInfo.name} id="username">
                                        <NavDropdown.Item as={Link} to='/profile'>Profile</NavDropdown.Item>
                                        <NavDropdown.Item onClick={logoutHandler}>Logout</NavDropdown.Item>
                                    </NavDropdown>
                                    :
                                    <LinkContainer to='/login'>
                                        <Nav.Link>
                                            <i className="fas fa-user" /><>&nbsp;Sign in</>
                                        </Nav.Link>
                                    </LinkContainer>
                            }
                        </Nav>
                    </Navbar.Collapse>
                </Container>
            </Navbar>
        </header>
    )
}

export default Header
