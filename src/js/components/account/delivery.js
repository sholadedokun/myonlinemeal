import React, {Component} from 'react';
import {connect} from 'react-redux';
import {Row, Col} from 'react-bootstrap';
import Heading from '../heading'

export default class AddPhoneAndDelivery extends Component{
    render(){
        const {inputDetails, inputUpdate} = this.props
        return(
            <Row xs="12">
                <Col xs="12">
                    <Heading size="md" title="Add Delivery Address"/>
                    <Col xs="12">
                        <label>Delivery Address</label>
                        <input type="text" placeholder="Street Name" onChange={(e)=>inputUpdate('street', e.target.value )}  value={inputDetails.street} />
                        <input type="text" placeholder="Notable Landmark" onChange={(e)=>inputUpdate('landMark', e.target.value )}  value={inputDetails.landmark} />
                        <input type="text" placeholder="city" disabled value={inputDetails.city} />
                        <input type="text" placeholder="state" disabled value={inputDetails.state} />
                        <input type="text" placeholder="Country" disabled  value={inputDetails.country}  />
                    </Col>
                </Col>
            </Row>
        )
    }
}
