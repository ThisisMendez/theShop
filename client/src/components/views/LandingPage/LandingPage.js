import React, { useEffect, useState } from 'react'
import Axios from 'axios';
import { Icon, Col, Card, Row }from 'antd';
import ImageSlider from '../../utils/ImageSlider';

const { Meta } = Card; 

function LandingPage() {

    const [Products, setProducts] = useState([])
    const [Skip, setSkip] = useState(0)
    const [Limit, setLimit] = useState(8)
    const [PostSize, setPostSize] = useState()
    
    useEffect(() => { 
            const variables = { 
                skip: Skip, 
                limit: Limit, 
        }
        getProducts(variables)
    }, [])

 const getProducts = (variables) => { 
    Axios.post('/api/product/getProducts', variables)
        .then(response =>  { 
            if(response.data.success) { 
                        
             setProducts([...Products, ...response.data.products]) // It's products because we named it products in our product.js model Line 62

            setPostSize(response.data.postSize)

            console.log(response.data.products)

            } else { 
                alert('failed to fetch product data')
            }
        })
 }

const onLoadMore = () => { 
    let skip = Skip + Limit; 

    const variables = { 
            skip: skip, 
            limit: Limit
        }
    
    getProducts(variables)
    setSkip(skip) //this skip is different than the skip in the other method 
} 


const renderCards = Products.map((product, index) =>{ 
    return <Col lg={6} md={8} xs={24}> 
        <Card 
            hoverable={true}
            cover={<ImageSlider images={product.images} />}
        >
            <Meta 
                title={product.title}
                description={`$${product.price}`}
                    // this is how to the price in the card 
            />
        </Card> 
    </Col>
})
        return (
            <div style={{ width: '75%', margin: '3rem auto' }}> 
                <div style={{ textAlign: 'center' }}> 
                    <h2> Let's Travel Anywhere <Icon type="rocket" /> </h2>
                </div>

                {/* FIlter */}
                {/* Search */}

                {Products.length === 0 ? 
                <div style={{ display: 'flex', height: '300px', justifyContent: 'center', alignItems: 'center'}}>
                    <h2>No post yet...</h2>
                </div> :
                <div>
                    <Row gutter= {[16, 16]}> 

                        {renderCards}

                    </Row>

                </div>
                }
                <br /><br />

                {PostSize >= Limit && 
                    <div style={{display: 'flex', justifyContent: 'center' }}>
                        <button onClick={onLoadMore}>Load More</button>
                   </div>
                }
            </div>
        )
}

export default LandingPage
