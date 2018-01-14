import React, {Component} from 'react';
import {Col, Row} from 'react-bootstrap';
import Heading from '../heading';
import _ from 'lodash'
import moment from 'moment';
import {connect} from 'react-redux'
class Dashboard extends Component{
    getValidDeliveryDate(computedDay){
        let lastValidDay=computedDay[computedDay.length-1] || this.props.today
        let weekDay=this.getWeekdays(lastValidDay)
        return weekDay
    }
    getWeekdays(fromDay){
        //we don't deliver meals on saturdays, sundays and major holiday
        let weekends='Sun Sat'
        let nextDay=fromDay
        do{
            nextDay=moment(nextDay).add(1, 'day')
        }
        //don't stop the loop if the day is a weekend
        while(moment(nextDay).format('ddd').indexOf(weekends) > -1 )
        return nextDay
    }
    compareValidDays(){

    }
    upcomingSubscription(){
        //let retrieve only the orders that are from current subscription
        let subscriptions = this.props.Subscription.filter(item => item.status == 'active')
        console.log(subscriptions)
        let Analytics=subscriptions.map(subScription=>{
            //now let get all orders that has been placed using under this subscription
            let placedOrders=this.props.currentOrders.filter( order=> order.subscriptionId == subScription._id)
            //let find out which of these order has been Delivered
            let deliveredOrders=placedOrders.filter( order=> order.status == 'delivered')
            let upComingOrders=placedOrders.filter(order=> order.status=='pending')
            let remaining=subScription.planId.mealNumber - placedOrders.length
            let subAnalytics={
                placedOrders:placedOrders.length,
                upComingOrders,
                deliveredOrders:deliveredOrders.length,
                subScription:subScription._id,
                totalMeals:subScription.planId.mealNumber,
                remaining
            }
            let computedUpcoming=[];
            subAnalytics.upComing=[]
            for(let i=0; i<remaining; i++){
                //get next valid delivery date
                let validDate= this.getValidDeliveryDate(computedUpcoming)
                computedUpcoming.push(validDate)
                subAnalytics.upComing[i]={
                    deliveryDate:moment(validDate).startOf('day').add(13, 'hours').toDate(),
                    meal:this.props.userDetails.defaultMeal.name
                }
            }
            return subAnalytics
        })
        console.log(Analytics)
        //because we ahve one subscription for now
        return Analytics[0].upComing.map((item, index)=>{
            return(
                <li key={index}>
                    <Col xs="12" sm="4"><b>Meal Type:</b>{item.meal}</Col>
                    <Col xs="12" sm="4"><b>Delivery:</b>{moment(item.deliveryDate).calendar()}</Col>
                    <Col xs="12" sm="4"><b>Status:</b>Pending</Col>
                </li>
            )
        })
    }
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
                                <Col xs="12" key={index}>
                                    <Col xs="12" sm="4"><b>Meal Type:</b>{item.inventory.name}</Col>
                                    <Col xs="12" sm="4"><b>Delivery:</b>{moment(item.deliveryDate).calendar()}</Col>
                                    <Col xs="12" sm="4"><b>Status:</b>{item.status}</Col>
                                </Col>
                            ):''
                        }
                        <Heading size="sm" title="Upcoming Orders" marginBottom="1em" />
                            <Col componentClass="ul" xs="12">
                                {
                                    Subscription && currentOrders ?this.upcomingSubscription.bind(this)():''

                                }
                            </Col>
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
        today:state.user.serverDate
    }
}
export default connect(mapStateToProps)(Dashboard)
