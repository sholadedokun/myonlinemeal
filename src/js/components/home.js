import React from 'react';
import {Row, Col, Grid} from 'react-bootstrap';
import Register from './register'
import Howitworks from './howitworks'
const home =()=>
<Row>
    <Col className="banner">
        <Register />
        <Howitworks />
    </Col>
</Row>;
export default home
