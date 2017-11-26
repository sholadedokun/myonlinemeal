import React from 'react';
import {Row, Col} from 'react-bootstrap';
import Heading from './heading';
import Icon from './icon'
const Category =(props)=>
    <Row>
        <Col xs="12" md="4" className="category">
            {
                props.icon?<Icon icon={props.icon} />:''
            }
            <Heading title={props.title} size="sm" />
            {props.children}
        </Col>
    </Row>
export default Category
