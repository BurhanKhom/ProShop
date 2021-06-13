import React from 'react'
import { Link } from 'react-router-dom'
import { Card } from 'react-bootstrap'
import Rating from './Rating'
const Product = ({ product }) => {
    return (
        <>
            <Link to={`/product/${product._id}`} style={{ textDecoration: 'none' }}>
                <Card className='my-3 rounded' variant='top'>

                    <Card.Img src={product.image} />

                    <Card.Body className='py-4'>
                        <Card.Title>
                            <strong>{product.name}</strong>
                        </Card.Title>
                        <Card.Text as='div' className='py-1'>
                            <Rating rating={product.rating} numReviews={product.numReviews} color='#FDCC0D' />
                        </Card.Text>
                        <Card.Text as='h4' className='py-4'>
                            &#8377;{product.price}
                        </Card.Text>
                    </Card.Body>
                </Card>
            </Link>
        </>
    )
}

export default Product
