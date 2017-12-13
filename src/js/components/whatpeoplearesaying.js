import React from 'react';
import {Col} from 'react-bootstrap';
import Heading from './heading'
import Comments from './comment.js'
const OurChef =(props)=>
    <Col xs="12" className="section">
        <Heading size="md" title="What People are saying" marginBottom="2em"/>
        <Col xs={12}>
        <Comments
            rate="5"
            title="Comment that changed Lives"
            comment="Some lovely comment about how the food has changed their lives, how it help save money, how it's an healthy choice and how good the meals tastes."
            name="olushola Adedokun"
        />
        <Comments
            rate="4"
            title="Another Comment that changed Lives"
            comment="So we've got another awesome comment about our services how it's an healthy choice and how good the meals tastes."
            name="Moses Oladele"
        />
        <Comments
            rate="4"
            title="Jusr Comments that are lovely"
            comment="We don't care about anything other than a very good comment healthy choice and how good the meals tastes."
            name="Uche Obi"
        />
        
        </Col>
    </Col>
export default OurChef
