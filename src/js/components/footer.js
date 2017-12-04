import React from 'react';
import {Row, Col} from 'react-bootstrap';
import Heading from './heading'
import Comments from './comment.js'
import Icon from './icon';
const Footer =(props)=>
    <Row className="section footer">
        <Col xs="12">
            <Heading size="sm" title="Fresh, Healthy, Affordable, Convinient Meal" marginBottom="1em"/>
            <p>
                Cool Stuffs to say about our business model and why customers should subscribe to our
                services and follow our us on social media.
            </p>
            <Icon icon="facebook"/>
            <Icon icon="twitter"/>
            <Icon icon="instagram"/>
        </Col>
        <Col xs="12" className="hrule" />
        <Col xs="12">
            <Heading size="sm" title="About" marginBottom="1em" />
            <ul>
                <li><a>How it Works</a></li>
                <li><a>Our Mission</a></li>
                <li><a>Why MOM</a></li>
            </ul>
        </Col>
        <Col xs="12" className="hrule" />
        <Col xs="12">
            <Heading size="sm" title="Account" marginBottom="1em" />
            <ul>
                <li><a>Sign Up</a></li>
                <li><a>Your Account</a></li>
                <li><a>Login</a></li>
            </ul>
        </Col>
        <Col xs="12" className="hrule" />
        <Col xs="12">
            <Heading size="sm" title="Contact Us" marginBottom="1em" />
            <p>
                Write compelling statement to make people contact us immediately using the channels
                we are have provided below.
            </p>
            <Heading size="lg" title="0818-801-9666" marginBottom="1.5em" />
        </Col>
        <Col xs="12" className="copyright">
            &copy; MyOnlineMeals Limited.
        </Col>
    </Row>
export default Footer
