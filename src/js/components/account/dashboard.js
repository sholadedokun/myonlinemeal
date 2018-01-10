import React, {Component} from 'react';
import {Col, Row} from 'react-bootstrap';
import Heading from '../heading';
import _ from 'lodash'
import moment from 'moment';
export default class DashBoard extends Component{
    render(){
        const {Subscription, currentOrders, userDetails}=this.props
        return(
            <Row className="dashboard">
                <Col xs="12">
                    <Heading size="md" title="USERS Dashboards" marginBottom="2em"/>
                    {userDetails?<Heading size="sm" title={`Welcome ${userDetails.firstName}`} marginBottom="3em" />:''}
                        <Heading size="sm" title="Current Order" marginBottom="1em" />
                        {
                            currentOrders?
                            _.map(currentOrders, (item, index)=>
                                <Col xs="12" key={index}>{item.status}</Col>
                            ):''
                        }
                        <Heading size="sm" title="Subscription History" marginBottom="1em" />
                        <Col xs="12" className="historyHeading">
                            <Col xs="2">Status</Col>
                            <Col xs="2">Type</Col>
                            <Col xs="2">Starts</Col>
                            <Col xs="2">Ends</Col>
                            <Col xs="2">Meals Delivered</Col>
                            <Col xs="2">Meals Remaining</Col>
                        </Col>
                        <Col xs="12" componentClass="ul" className="subscriptionList">
                            {
                                _.map(Subscription, (item, index)=>
                                    <Col xs="12" componentClass="li" key={index}>
                                        <Col xs="2">{item.status}</Col>
                                        <Col xs="2">{item.planId.name}</Col>
                                        <Col xs="2">{moment(item.subscribedDate).fromNow()}</Col>
                                    </Col>
                                )
                            }
                        </Col>
                </Col>
            </Row>
        )
    }
}
