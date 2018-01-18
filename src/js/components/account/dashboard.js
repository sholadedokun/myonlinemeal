import React, {Component} from 'react';
import {Col, Row} from 'react-bootstrap';
import Heading from '../heading';
import _ from 'lodash'
import moment from 'moment';
import {connect} from 'react-redux'
class Dashboard extends Component{
    constructor(){
        super();
        this.state={
            currentOrders:[]
        }
    }
    getValidDeliveryDate(computedDay){
        let lastValidDay=computedDay[computedDay.length-1] || this.props.today
        let weekDay=this.getWeekdays(lastValidDay)
        return weekDay
    }
    getWeekdays(fromDay){
        //we don't deliver meals on saturdays, sundays and major holiday
        let weekends="Sat Sun";
        let nextDay=fromDay;

        do{
            nextDay=moment(nextDay).add(1, 'day')
        }
        //don't stop the loop if the day is a weekend
        while(weekends.indexOf(moment(nextDay).format('ddd')) > -1 )
        return nextDay
    }
    compareValidDays(){

    }
    componentWillReceiveProps(nextProps){
        //let retrieve only the orders that are from current subscription
        if(nextProps.Subscription && nextProps.currentOrders){
            // let subscriptions = nextProps.Subscription.filter(item => item.status == 'active')
            let Analytics=nextProps.Subscription.map(subScription=>{
                //now let get all orders that has been placed using under this subscription
                let placedOrders=nextProps.currentOrders.filter( order=> order.subscriptionId == subScription._id)
                // let find out which of these order has been Delivered
                let deliveredOrders=placedOrders.filter( order=> order.status == 'delivered')
                let currentOrders=placedOrders.filter( order=> moment(order.deliveryDate).toDate().toString() == moment().startOf('day').add(13, 'hours').toDate().toString())
                let upComingOrders=placedOrders.filter(order=> order.status=='pending')
                let remaining=subScription.planId.mealNumber - placedOrders.length

                let subAnalytics={
                    placedOrders:placedOrders.length,
                    upComingOrders,
                    status:subScription.status,
                    currentOrders,
                    subScriptionName:subScription.planId.name,
                    subscribedDate:subScription.subscribedDate,
                    unixDate:moment(subScription.subscribedDate).unix(),
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
                        meal:nextProps.userDetails.defaultMeal.name
                    }
                }
                return subAnalytics
            })
            console.log(Analytics)
            //sort the Analytics by most recent subScription Date
            Analytics.sort((a,b)=> b.unixDate - a.unixDate)
            this.setState({Analytics})
        }

    }
    render(){
        const {Subscription, currentOrders, userDetails}=this.props
        return(
            <Row className="dashboard">
                <Col xs="12">
                    <Heading size="md" title="USERS Dashboards" marginBottom="2em"/>
                    {userDetails?<Heading size="sm" title={`Welcome ${userDetails.firstName}`} marginBottom="3em" />:''}
                        <Heading size="sm" title="Current Order" marginBottom="1em" />
                        {   this.state.Analytics?
                            _.map(this.state.Analytics[0].currentOrders, (item, index)=>
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
                                    this.state.Analytics?
                                     this.state.Analytics[0].upComing.map((item, index)=>{
                                        return(
                                            <li key={index}>
                                                <Col xs="12" sm="4"><b>Meal Type:</b>{item.meal}</Col>
                                                <Col xs="12" sm="4"><b>Delivery:</b>{moment(item.deliveryDate).calendar()}</Col>
                                                <Col xs="12" sm="4"><b>Status:</b>Pending</Col>
                                            </li>
                                        )
                                    }):''
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
                                this.state.Analytics?
                                _.map(this.state.Analytics, (item, index)=>
                                    <Col xs="12" componentClass="li" key={index}>
                                        <Col xs="2">{item.status}</Col>
                                        <Col xs="2">{item.subScriptionName}</Col>
                                        <Col xs="2">{moment(item.subscribedDate).fromNow()}</Col>
                                        <Col xs="2"></Col>
                                        <Col xs="2">{item.deliveredOrders}</Col>
                                        <Col xs="2">{item.remaining}</Col>
                                    </Col>
                                ):''
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
