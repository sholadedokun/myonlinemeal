import React, {Component} from 'react';
import {Col} from 'react-bootstrap';
import Heading from './heading'
import {getSubScription} from '../actions/subScriptionActions'
import {connect} from 'react-redux'
import {modalStatus} from '../actions/userActions'
class Dashboard extends Component{
    constructor(props){
        super();
    }
    componentWillMount(){
        this.props.getSubScription().then(data =>{

            if(data==null){
                this.props.modalStatus(true, 'plans')
            }

        })
    }
    render(){
        const {allPlans}=this.props
        return(
            <Col xs="12" className="section dashboard">
                <Heading size="md" title="USERS Dashboards" marginBottom="2em"/>

            </Col>
        )
    }
}
function mapStateToProps(state){
    return{
        currentSubscription:state.subScription.subScriptions
    }
}
export default connect(mapStateToProps, {getSubScription, modalStatus})(Dashboard)
