import React, {Component} from 'react';
import {Row, Col} from 'react-bootstrap';
import Delivery from './delivery';
import Heading from '../heading'
// import {change}
export default class Settings extends Component{
    constructor(){
        super();
        this.state={
            email:'',
            phone:'',
            defaultMeal:'',
            delivery:'',
            password:''
        }
    }
    render(){
        const {email, phone, defaultMeal, delivery, password}=this.state;
        const {userDetails} = this.props;
        return(
            <Row>
                <Heading title="Account Settings" size="md" marginBottom="2em" />
                <Heading title="General Details" size="sm" marginBottom="1em" />
                <Col xs="12">
                    <label> Change Email Address</label>
                    <span>Current Email: {userDetails}</span>
                    <Col xs="12"><input type="text" value={email} onChange={(e)=>this.setState({email:e.target.value})} /></Col>
                    <button> Change Email Address </button>
                </Col>
                <Col xs="12">
                    <label>Change Phone Number</label>
                    <span>Current Phone: {userDetails}</span>
                    <Col xs="12"><input type="text" value={phone} onChange={(e)=>this.setState({phone:e.target.value})} /></Col>
                    <button>Change Phone Number</button>
                </Col>
                <Col xs="12">
                    <label>Add Delivery Address</label>
                    <span>Current Phone: {userDetails}</span>
                    <Col xs="12"><input type="text" value={delivery} onChange={(e)=>this.setState({delivery:e.target.value})} /></Col>
                    <button>Add Delivery Address</button>
                </Col>
                <Col xs="12">
                    <label>Change default meal</label>
                    <span>Current Meal: {userDetails}</span>
                    <Col xs="12"><input type="text" value={defaultMeal} onChange={(e)=>this.setState({defaultMeal:e.target.value})} /></Col>
                    <button>Change Default Meal</button>
                </Col>
                <Col xs="12">
                    <label>Change Passord</label>
                    <Col xs="12"><input type="text" value={password} placeholder="Enter Password" onChange={(e)=>this.setState({password:e.target.value})} /></Col>
                    <Col xs="12"><input type="text" value={password} placeholder="Confirm Password" onChange={(e)=>this.setState({conPassword:e.target.value})} /></Col>
                    <button>Change Password</button>
                </Col>

            </Row>
        )
    }
}
