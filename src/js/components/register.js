import React, {Component} from 'react';
import {Col} from 'react-bootstrap';
import Heading from './heading';
export default class Register extends Component {
    render(){
        return(
            <Col xs="12" md="4" className="register">
                <Heading size ="md" title="Chef Cooked, Healthy Meal Delivered to you."/>
                <input type="text" name="email" placeholder="Your Email Address" />
                <button>GET STARTED</button>
                <p>
                    Already have an account? <a href="#">Login Here</a><br/>
                    By continuing, you are agreeing to our <a href="#">terms and condition</a>
                </p>
            </Col>
        )
    }
}
