import React from 'react';
import {Col, Row} from 'react-bootstrap';
import Heading from './heading'
import Category from './categoryList'
const HowItWorks =(props)=>
    <Col xs="12" className="section">
        <Heading size="md" title="How It Works" marginBottom="2em"/>
        <Col xs={12}>
            <Category xs="12" sm="6" md="4" title="You Choose A Meal Plan" img="" icon="spoon">
                Simple Text to briefly explain what this category is meant to do, this paragraph should not be more than 25 words.
            </Category>
            <Category xs="12" sm="6" md="4" title="Our Chef Cooks the Meal" img="" icon="fire">
                Simple Text to briefly explain what this category is meant to do, this paragraph should not be more than 25 words.
            </Category>
            <Category xs="12" sm="6" md="4" title="Meal Delivered, You Enjoy " img="" icon="truck">
                Simple Text to briefly explain what this category is meant to do, this paragraph should not be more than 25 words.
            </Category>
        </Col>
    </Col>
export default HowItWorks
