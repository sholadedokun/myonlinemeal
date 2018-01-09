import React, {Component} from 'react';
import {connect} from 'react-redux';
import {Row, Col} from 'react-bootstrap';
import Heading from './heading';
import _ from 'lodash'
import PhoneAndDelivery from  './phoneAndDelivery'

class CompleteRegisteration extends Component {
    constructor(props){
        super(props)
        this.state={
            defaultMeal:'',
            currentStep:1,
            totalStep:3,
            phoneAndDelivery:{
                phoneNumber:'',
                street:'',
                landmark:'',
                city:'Opebi',
                state:'Lagos',
                country:'Nigeria'
            }
        }
    }
    next(step){

        this.setState({currentStep: ++step})
    }
    updatePhoneAndDeliver(key, value){
        this.setState({phoneAndDelivery:{...this.state.phoneAndDelivery, [key]:value}})
    }
    render(){
        const {defaultMeal, currentStep, totalStep, phoneAndDelivery} = this.state;
        const {allMeals} = this.props;
        return(
            <Row className="loginModal">
                <Heading size="sm" title="Complete Registeration" />
                <Heading size="xs" title={`step ${currentStep} of ${totalStep}`} />
                {
                    currentStep==1 ?
                        <PhoneAndDelivery inputDetails={phoneAndDelivery} inputUpdate={this.updatePhoneAndDeliver.bind(this)} />
                        :
                        (currentStep==2)?
                                <Col xs="12">
                                    <Heading size="xs" title="Select Default Meal" />
                                    <select value={defaultMeal} onChange={(e)=>this.setState({defaultMeal:e.target.value})}>
                                        <option value="">Select One</option>
                                        {
                                            _.map(allMeals, (item, index)=><option key={index} value={item._id}>{item.name}</option>)
                                        }
                                    </select>
                                </Col>:''

                }
                {currentStep!=1? <button onClick={this.next.bind(this, (currentStep-2))}>back</button>:'' }
                <button onClick={this.next.bind(this, currentStep)}>{currentStep<totalStep?'Continue':'Finish'}</button>

            </Row>
        )
    }
}
function mapStateToProps(state){
    return(
        {allMeals:state.orders.allMealOptions}
    )
}
export default connect(mapStateToProps)(CompleteRegisteration)
