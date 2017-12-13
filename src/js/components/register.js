import React, {Component} from 'react';
import {Col} from 'react-bootstrap';
import Heading from './heading';
import {connect} from 'react-redux';
import {modalStatus} from '../actions/userActions'
class Register extends Component {
    render(){
        return(
            <Col xs={12}  sm={4} smOffset={7} className="register">
                <Heading size="md" title="Chef Cooked, Healthy Meal Delivered to you."/>
                <input type="text" name="email" placeholder="Your Email Address" />
                <button>GET STARTED</button>
                <p>
                    Already have an account? <a onClick={()=>this.props.modalStatus(true, 'login')} >Login Here</a><br/>
                    By continuing, you are agreeing to our <a>terms and condition</a>
                </p>
            </Col>
        )
    }
}
export default connect(null, {modalStatus})(Register)
