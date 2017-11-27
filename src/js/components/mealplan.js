import React from 'react';
import {Col, Row} from 'react-bootstrap';
import Heading from './heading'
import Category from './categoryList'
const MealPlan =(props)=>
    <Row className="section mealPlan">
        <Col xs="12" className="details">

            <Heading title="Our Awesome Meal Plans" size="md" marginBottom="2em" />
            <p>
                Praesent dapibus, neque id cursus faucibus, tortor neque egestas augue
                eu vulpu magna erat. Aliquam erat volutpat. Nam dui mi tincidunt quis
                accumsan porttitor facilisis luctus, metus lorem feugiat tempus adipiscing.
            </p>
            <ul>
                <li className="active">3 Meals</li>
                <li>5 Meals</li>
                <li>20 Meals</li>
            </ul>
        </Col>
        <Col>
            <Row  className="tabbedContent">
            Nam dui mi tincidunt quis  accumsan porttitor facilisis luctus, metus lorem feugiat tempus adipiscing.
            Praesent dapibus, neque id cursus faucibus, tortor neque egestas augue
            eu vulpu magna erat. Aliquam erat volutpat.
            </Row>

        </Col>
    </Row>
export default MealPlan
