import React, { useEffect } from 'react'
import { Row, Col } from 'react-bootstrap'
import Product from '../components/Product'
import Loader from '../components/Loader'
import Message from '../components/Message'
import { useDispatch, useSelector } from 'react-redux'
import { listProducts } from '../actions/productActions'


const HomeScreen = () => {
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(listProducts());
    }, [dispatch]);
    
    const { loading, error, products } = useSelector(state => state.productList);
    
    return (
        <>
            <h1>Latest Products</h1>
            {
                loading ? <Loader /> : error ? <Message message={error} variant='danger'/> :
                    <Row>
                        {
                            products.map(product => {
                                return (
                                    <Col key={product._id} sm={12} md={6} lg={4} xl={3}>
                                        <Product product={product} />
                                    </Col>
                                );
                            })
                        }
                    </Row>
            }
        </>
    )
}

export default HomeScreen
