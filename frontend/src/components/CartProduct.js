import React from 'react'
import { Link } from 'react-router-dom'
import { ListGroup, Button, Row, Col, Image, Form } from 'react-bootstrap'
import { useDispatch } from 'react-redux'
import { addToCart } from '../actions/cartActions'

const CartProduct = ({ item }) => {
    const dispatch = useDispatch();

    return (
        <>
            <ListGroup.Item>
                <Row>
                    <Col md={3}>
                        <Link to={`/product/${item._id}`}>
                            <Image src={item.image} rounded fluid />
                        </Link>
                    </Col>
                    <Col md={4}>
                        <Row style={{
                            fontWeight: 'bold   '
                        }}>
                            <Col md={12}>{item.name}</Col>
                        </Row>
                        <Row style={{
                            opacity: 0.9
                        }}>
                            <Col>Sold by</Col>
                            <Col>{item.brand}</Col>
                        </Row>
                        <Row>
                            <Col md={5}>
                                Qty
                                <Form.Control as='select'
                                    value={item.qty}
                                    onChange={(e) => { dispatch(addToCart(item._id, e.target.value)) }}>
                                    {
                                        [...Array(item.countInStock).keys()].map(x => {
                                            return <option key={x + 1} value={x + 1}>
                                                {x + 1}
                                            </option>
                                        })
                                    }
                                </Form.Control>
                            </Col>
                        </Row>
                    </Col>
                    <Col md={3} style={{
                        fontWeight: 'bold'
                    }}>
                        &#8377;{Number(item.price) * Number(item.qty)}
                    </Col>
                    <Col md={2}>
                        <Button variant='outline-dark' size='sm'>
                            <i className='fas fa-trash'></i>
                        </Button>
                    </Col>
                </Row>
            </ListGroup.Item>
        </>
    )
}

export default CartProduct
