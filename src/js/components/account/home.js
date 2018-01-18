import React, {Component} from 'react';
import {Col, Row} from 'react-bootstrap';
import Heading from '../heading';
import {getSubScription } from '../../actions/subScriptionActions';
import {connect} from 'react-redux';
import {modalStatus, fetchUser} from '../../actions/userActions';
import DashBoard from './dashboard';
import Settings from './settings';
import {BrowserRouter as Router,  Route, Link } from 'react-router-dom';
import _ from 'lodash'
import moment from 'moment';
class Home extends Component{
     menuList={

        dashBoard:{
            label:'DashBoard',
            name:'DashBoard',
            exact: true,
            icon:'eye',
            path:'',
            component: ()=><DashBoard Subscription={this.props.Subscription} currentOrders={this.props.currentOrders} userDetails={this.props.userDetails} />
        },
        settings:{
            label:'Settings',
            name:'settings',
            exact: true,
            icon:'gear',
            path: '/settings',
            component: Settings
        }
    }
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
                this.props.modalStatus(true, 'plans', null)
            }
            else{
                //check for active subscription, If there are no active subscription, prompt modal
                let currentPlan=data.filter(plan=> plan.status=='active');
                if(currentPlan.length==0) this.props.modalStatus(true, 'plans', null);
            }
        })
    }
    render(){
        const {Subscription, currentOrders, userDetails, match}=this.props
        return(
            <Router>
                <Col xs="12">
                    <Col componentClass="ul" xs="12" className="account header">
                    {
                        _.map(this.menuList, (item, index)=>{
                            return(
                                <li key={index}><Link to={match.url+item.path}>{item.label}</Link></li>
                            )
                        })
                    }
                    </Col>
                    <Col componentClass="ul">
                    {
                        _.map(this.menuList, (item, index)=>{
                            return(
                                <Route key={index+item.path} exact={item.exact} path={match.url+item.path} component={item.component} />
                            )
                        })
                    }
                    </Col>
                </Col>
            </Router>
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
export default connect(mapStateToProps, {getSubScription, modalStatus, fetchUser})(Home)
