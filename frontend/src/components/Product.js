import React from 'react'
import { Card } from 'react-bootstrap'
import Rating from './Rating'
const Product = ({ product }) => {
    return (
        <>
            <a href={`/product/${product._id}`} style={{ 'text-decoration': 'none' }}>
                <Card className='my-3 rounded' variant='top'>

                    <Card.Img src={product.image} />

                    <Card.Body className='py-4'>
                        <Card.Title as='h5'>
                            <strong>{product.name}</strong>
                        </Card.Title>
                        <Card.Text as='div' className='py-1'>
                            <Rating rating={product.rating} numReviews={product.numReviews} color='#FDCC0D'/>
                        </Card.Text>
                        <Card.Text as='h4' className='py-4'>
                            Rs. {product.price}
                        </Card.Text>
                    </Card.Body>
                </Card>
            </a>
        </>
    )
}

export default Product
