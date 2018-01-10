import React, {Component} from 'react';
import {connect} from 'react-redux';
import {Row, Col} from 'react-bootstrap';
import Heading from './heading';
import _ from 'lodash'
import Delivery from  './delivery'
import {saveDelivery} from '../actions/userActions'
import {setDefaultMeal} from '../actions/subScriptionActions'

class CompleteRegisteration extends Component {
    constructor(props){
        super(props)
        this.state={
            defaultMeal:'',
            currentStep:1,
            totalStep:3,
            delivery:{
                street:'',
                landMark:'',
                city:'Opebi',
                state:'Lagos',
                country:'Nigeria'
            }
        }
    }
    next(step){
        switch (step){
            case 1:
                    return this.props.saveDelivery(this.state.delivery).then(data=>this.setState({currentStep: ++step}))
            case 2:
                return this.props.setDefaultMeal(this.state.defaultMeal).then(data=>this.setState({currentStep: ++step}))
            default:
                return
        }
    }
    componentWillMount(){
        this.setState({currentStep:this.props.position})
    }
    updatePhoneAndDeliver(key, value){
        this.setState({delivery:{...this.state.delivery, [key]:value}})
    }
    render(){
        const {defaultMeal, currentStep, totalStep, delivery} = this.state;
        const {allMeals} = this.props;
        return(
            <Row className="loginModal">
                <Heading size="sm" title="Complete Registeration" />
                <Heading size="xs" title={`step ${currentStep} of ${totalStep}`} />
                {
                    currentStep==1 ?
                        <Delivery inputDetails={delivery} inputUpdate={this.updatePhoneAndDeliver.bind(this)} />
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
export default connect(mapStateToProps, {saveDelivery, setDefaultMeal})(CompleteRegisteration)
