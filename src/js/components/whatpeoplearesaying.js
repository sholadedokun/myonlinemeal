import React from 'react';
import {Col} from 'react-bootstrap';
import Heading from './heading'
import Comments from './comment.js'
const OurChef =(props)=>
    <Col xs="12" className="section">
        <Heading size="md" title="What People are saying" marginBottom="2em"/>
        <Comments
            rate="5"
            title="Comment that changed Lives"
            comment="Some lovely comment about how the food has changed their lives, how it help save money, how it's an healthy choice and how good the meals tastes."
            name="olushola Adedokun"
        />
    </Col>
export default OurChef
