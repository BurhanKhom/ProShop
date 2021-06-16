import React, { useState, useEffect } from 'react'
import { Row, Col, ListGroup, Image, Card, Button, Form } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import Rating from '../components/Rating'
import { listProductDetails } from '../actions/productActions'
import { useDispatch, useSelector } from 'react-redux'
import Loader from '../components/Loader'
import Message from '../components/Message'

const ProductScreen = ({ history, match }) => {

    const [qty, setQty] = useState(1);


    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(listProductDetails(match.params.id));
    }, [dispatch, match]);

    const { loading, error, product } = useSelector(state => state.productDetails);
    
    
    const addToCardHandler = () => {
        history.push(`/cart/${match.params.id}?qty=${qty}`)
    }


    return (
        <>
            <Link to='/' className='btn btn-light'>&#8592; Go Back</Link>
            {
                loading === true ? <Loader /> : error ? <Message variant='danger' message={error} /> :
                    (

                        <Row className='p-3'>
                            <Col md={4} className='p-2'>
                                <Image src={product.image} fluid />
                            </Col>
                            <Col md={5} className='p-2'>
                                <ListGroup variant='flush'>
                                    <ListGroup.Item>
                                        <h3>{product.name}</h3>
                                        <Rating rating={product.rating} numReviews={product.numReviews} color='#FDCC0D' />
                                    </ListGroup.Item>
                                    <ListGroup.Item className='pt-3'>
                                        <h2>&#8377;{product.price}</h2>
                                    </ListGroup.Item>
                                    <ListGroup.Item>
                                        {product.description} <br />
                                    </ListGroup.Item>
                                    <ListGroup.Item>
                                        Brand: {product.brand} <br />
                                        Category: {product.category}
                                    </ListGroup.Item>
                                </ListGroup>
                            </Col>
                            <Col md={3} className='p-2'>
                                <Card>
                                    <Card.Body>
                                        <ListGroup variant='flush'>
                                            <ListGroup.Item>
                                                <Row>
                                                    <Col>Total Price</Col>
                                                    <Col>{product.price}</Col>
                                                </Row>
                                            </ListGroup.Item>
                                            {
                                                product.countInStock > 0 && (
                                                    <ListGroup.Item>
                                                        <Row>
                                                            <Col>Qty</Col>
                                                            <Col>
                                                                <Form.Control as='select' value={qty} onChange={(e) => {
                                                                    setQty(e.target.value)
                                                                }} >
                                                                    {
                                                                        [...Array(product.countInStock).keys()].map(x => {
                                                                            return <option key={x + 1} value={x + 1}>
                                                                                {x + 1}
                                                                            </option>
                                                                        })
                                                                    }
                                                                </Form.Control>

                                                            </Col>
                                                        </Row>
                                                    </ListGroup.Item>)
                                            }
                                            <ListGroup.Item>
                                                <Row>
                                                    <Col>Status</Col>
                                                    <Col>{
                                                        product.countInStock > 0 ?
                                                            <span style={{ color: 'green' }}>{'In Stock'}</span> :
                                                            <span style={{ color: 'red' }}>{'Out of Stock'}</span>
                                                    }</Col>
                                                </Row>
                                            </ListGroup.Item>
                                            <Button
                                                onClick={addToCardHandler}
                                                block disabled={product.countInStock === 0}>Add to cart</Button>
                                        </ListGroup>
                                    </Card.Body>
                                </Card>
                            </Col>
                        </Row>
                    )
            }
        </>
    )
}

export default ProductScreen
