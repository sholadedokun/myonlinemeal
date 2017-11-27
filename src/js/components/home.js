import React from 'react';
import {Row, Col, Grid} from 'react-bootstrap';
import Register from './register';
import Howitworks from './howitworks';
import MealPlan from './mealplan';

const home =()=>
<Row>
    <Col className="banner">
        <Register />
    </Col>
    <Howitworks />
    <MealPlan />
</Row>;
export default home
