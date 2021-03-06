import React, {Component} from 'react';
import {signUpUser} from '../../actions/userActions';
import {connect} from 'react-redux';
import {Row} from 'react-bootstrap';
import Heading from '../heading';
import _ from 'lodash'

class RegisterUser extends Component {
    constructor(props){
        super(props)
        this.state={
            email:"",
            firstName:"",
            lastName:"",
            phone:"",
            password_confirmation:"",
            password:""
        }
    }
    registerUser(){

        let params= _.omit(this.state, ['password_confirmation'])
        this.props.signUpUser(params).then((data)=>{
            this.props.close('/dashboard')
        })

    }
    render(){
        const {email, firstName, lastName, phone,password_confirmation, password} = this.state;
        return(
            <Row>
                <Heading size="lg">register User</Heading>
                <input type="text" value={email} onChange={(e)=>this.setState({email:e.target.value})} placeholder="Email" />
                <input type="text" value={firstName} onChange={(e)=>this.setState({firstName:e.target.value})} placeholder="Firstname" />
                <input type="text" value={lastName} onChange={(e)=>this.setState({lastName:e.target.value})} placeholder="Lastname" />
                <input type="text" value={phone} onChange={(e)=>this.setState({phone:e.target.value})} placeholder="Phone" />
                <input type ="password" value={password} onChange={(e)=>this.setState({password:e.target.value})} placeholder="Password" />
                <input type ="password" value={password_confirmation} onChange={(e)=>this.setState({password_confirmation:e.target.value})} placeholder="Confirm Password"  />
                <button onClick={this.registerUser.bind(this)}>register</button>
                {
                    this.props.error? 'Wrong email or Password, Please try again.':''
                }
            </Row>
        )
    }
}
function mapStateToProps(state){
    return(
        {authenticated:state.user.authenticated}
    )
}
const mapDispatchToProps = {signUpUser}
export default connect(mapStateToProps, mapDispatchToProps)(RegisterUser)
