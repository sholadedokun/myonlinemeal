import React, {Component} from 'react';
import {Col, Row} from 'react-bootstrap';
import Heading from './heading'
import {getSubScription} from '../actions/subScriptionActions'
import {connect} from 'react-redux'
import {modalStatus, fetchUser} from '../actions/userActions'
import _ from 'lodash'
import moment from 'moment';
class Dashboard extends Component{
    constructor(props){
        super();
    }
    componentWillMount(){
        this.props.fetchUser().then(data=>{
            let user = this.props.userDetails
            if(user.currentDeliveryAddress=='' || !user.currentDeliveryAddress){
                this.props.modalStatus(true, 'completeRegisteration', 1);
            }
            else if(user.defaultMeal=='' || !user.defaultMeal){
                this.props.modalStatus(true, 'completeRegisteration', 2);
            }

        })
        this.props.getSubScription().then(data =>{
            if(data==null){
                this.props.modalStatus(true, 'plans')
            }

        })
    }
    render(){
        const {Subscription, currentOrders}=this.props
        return(
            <Row className="dashboard">
                <Col xs="12">
                    <Heading size="md" title="USERS Dashboards" marginBottom="2em"/>
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
function mapStateToProps(state){
    return{
        Subscription:state.subScription.subScriptions,
        currentOrders:state.orders.allCurrentOrders,
        userDetails:state.user.userDetails
    }
}
export default connect(mapStateToProps, {getSubScription, modalStatus, fetchUser})(Dashboard)
