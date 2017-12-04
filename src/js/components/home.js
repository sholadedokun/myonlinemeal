import React from 'react';
import {Row, Col, Grid} from 'react-bootstrap';
import Register from './register';
import Howitworks from './howitworks';
import MealPlan from './mealplan';
import Ourchef from './ourchef';
import WhatPeopleAreSaying from './whatpeoplearesaying'

const home =()=>
<Row>
    <Col className="banner">
        <Register />
    </Col>
    <Howitworks />
    <MealPlan />
    <Ourchef />
    <WhatPeopleAreSaying />
</Row>;
export default home
