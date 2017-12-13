import React from 'react';
import {Row, Col} from 'react-bootstrap';
import Heading from './heading';
import Icon from './icon'
const Category =(props)=>
        <Col xs="12" sm="4" className="category">
            {
                props.icon?<Icon icon={props.icon} />:''
            }
            <Heading title={props.title} size="sm" />
            {props.children}
        </Col>
export default Category
