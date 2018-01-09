import React, {Component} from 'react';
import {connect} from 'react-redux';
import {Row, Col} from 'react-bootstrap';
import Heading from './heading'

export default class AddPhoneAndDelivery extends Component{
    sendDetails(){

    }
    render(){
        const {inputDetails, inputUpdate} = this.props
        return(
            <Row xs="12">
                <Col xs="12">
                    <Heading size="md" title="Add Phone Number and Delivery Address"/>
                    <form onSubmit={this.sendDetails.bind(this)}>
                        <Col xs="12">
                            <label>Phone Number</label>
                            <input type="text" placeholde="Type Phone Number" />
                        </Col>
                        <Col xs="12">
                            <label>Delivery Address</label>
                            <input type="text" placeholder="Street Name" onChange={(e)=>inputUpdate('street', e.target.value )}  value={inputDetails.street}  />
                            <input type="text" placeholder="Notable Landmark" onChange={(e)=>inputUpdate('landmark', e.target.value )}  value={inputDetails.landmark}  />
                            <input type="text" placeholder="city" value={inputDetails.city} />
                            <input type="text" placeholder="state" disabled value={inputDetails.state} />
                            <input type="text" placeholder="state" disabled  value={inputDetails.country}  />
                        </Col>
                    </form>
                </Col>
            </Row>
        )
    }
}
