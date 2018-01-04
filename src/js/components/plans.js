import React, {Component} from 'react';
import {connect} from 'react-redux';
import {Row} from 'react-bootstrap';
import Heading from './heading';
import {subscribeToPlan} from '../actions/subScriptionActions'
import _ from 'lodash'

class Plans extends Component {
    constructor(props){
        super(props)
    }
    subscribe(id){
        this.props.subscribeToPlan(id).then(data=>{
            this.props.close()
        })
    }

    render(){
        console.log(this.props)
        return(
            <Row className="loginModal">
                <ul>
                {
                    (this.props.plans)?
                    _.map(this.props.plans, (item, index)=>{
                        return(
                            <li>
                                <Heading size="md" title={item.name} />
                                <p>
                                    {item.amount}
                                </p>
                                <button onClick={this.subscribe.bind(this, item._id)}>Subscribe</button>
                            </li>
                        )
                    }):''
                }
                </ul>
            </Row>
        )
    }
}
function mapStateToProps(state){
    return(
        {plans:state.plans.allPlans}
    )
}

export default connect(mapStateToProps, {subscribeToPlan})(Plans)
