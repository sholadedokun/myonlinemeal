import React, {Component} from 'react'
import { Row, Col, Navbar, Nav, NavItem} from 'react-bootstrap'

import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { signoutUser, modalStatus} from '../actions/userActions';

export class Header extends Component {

    signoutUser(){
        this.props.signoutUser().then((data)=>{
            this.props.history.push('/')
        })

    }
    authenticated(){
        const {modalStatus} =this.props
        let resolvedLinks = (this.props.authenticated)?
            [

                <NavItem key={0} id="dashboard" href="/dashboard">dashboard</NavItem>,
                <NavItem key={1}   id="logout" onClick={this.signoutUser.bind(this)}>logout</NavItem>,
            ]:
            [
                <NavItem key={1}  id="login" onClick={()=>modalStatus(true, 'login')}>login</NavItem>,
                <NavItem  key={2} id="register"  onClick={()=>modalStatus(true, 'register')}>register</NavItem>
            ]
            return resolvedLinks
    }

    render(){
        const {modalStatus} =this.props
        return(
            <Row className="header">
                <Navbar inverse collapseOnSelect>
                    <Navbar.Header>
                        <Navbar.Brand>
                            <a href="#">MOM</a>
                        </Navbar.Brand>
                        <Navbar.Toggle />
                    </Navbar.Header>
                    <Navbar.Collapse>
                        <Nav>
                            <NavItem className="active" href="/">Home</NavItem>
                            <NavItem href="/howitworks">How it Works</NavItem>
                            <NavItem href="/help">Help</NavItem>
                            {
                                this.authenticated()
                            }
                        </Nav>
                    </Navbar.Collapse>
                </Navbar>

            </Row>
        )
    }
}
function mapStateToProps(state) {
  return { signoutUser: state.user.authenticated };
}
const mapDispatchToProps= {signoutUser, modalStatus}
export default connect(mapStateToProps, mapDispatchToProps)(Header);
