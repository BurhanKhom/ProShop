import React, { useState, useEffect } from 'react'
import { Row, Col, ListGroup, Image, Card, Button } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import Rating from '../components/Rating'
import axios from 'axios'

const ProductScreen = ({ match }) => {

    const [product, setProduct] = useState([]);

    useEffect(() => {
        const fetchProduct = async () => {
            const res = await axios(`/api/products/${match.params.id}`);
            setProduct(res.data[0]);
        }
        fetchProduct();
    }, [match.params.id]);

    return (
        <>
            <Link to='/' className='btn btn-light'>&#8592; Go Back</Link>
            <Row className='p-3'>
                <Col md={5} className='p-2'>
                    <Image src={product.image} fluid />
                </Col>
                <Col md={4} className='p-2'>
                    <ListGroup variant='flush'>
                        <ListGroup.Item>
                            <h3>{product.name}</h3>
                            <Rating rating={product.rating} numReviews={product.numReviews} color='#FDCC0D' />
                        </ListGroup.Item>
                        <ListGroup.Item className='pt-3'>
                            <h2>Rs. {product.price}</h2>
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
                                    Quantity: <select>
                                        <option>1</option>
                                    </select>
                                </ListGroup.Item>
                                <ListGroup.Item>
                                    Status: {
                                        product.countInStock > 0 ?
                                            <span style={{ color: 'green' }}>{'In Stock'}</span> :
                                            <span style={{ color: 'red' }}>{'Out of Stock'}</span>
                                    }
                                </ListGroup.Item>
                                <Button block disabled={product.countInStock === 0}>Add to cart</Button>
                            </ListGroup>
                        </Card.Body>
                    </Card>
                </Col>
            </Row>
        </>
    )
}

export default ProductScreen
