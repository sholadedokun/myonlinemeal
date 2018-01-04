import React, {Component} from 'react'
import { Row, Col, Navbar, Nav, NavItem} from 'react-bootstrap'
import ReactModal from 'react-modal';
import { Link, withRouter } from 'react-router-dom';
import Login from './auth/loginUser';
import Register from './auth/register';
import { connect } from 'react-redux';
import Plans from './plans';
import { signoutUser, modalStatus} from '../actions/userActions';

export class Header extends Component {
    constructor(props){
        super();
        this.makeLinkActive= this.makeLinkActive.bind(this)
    }
    signoutUser(){
        this.props.signoutUser().then((data)=>{
            this.props.history.push('/')
        })

    }
    handleCloseModal (route) {
        if(route) this.props.history.push(route)
        this.props.modalStatus(false, '')
    }
    makeLinkActive(path){
        if(this.props.history.location.pathname==path) return "active"
    }
    authenticated(){
        const {modalStatus, authenticated} =this.props
        let resolvedLinks = (authenticated)?
            [

                <NavItem key={0} className={this.makeLinkActive('/dashboard')}  id="dashboard" href="/dashboard">dashboard</NavItem>,
                <NavItem key={1}   id="logout" onClick={this.signoutUser.bind(this)}>logout</NavItem>,
            ]:
            [
                <NavItem key={1}  id="login" onClick={()=>modalStatus(true, 'login')}>login</NavItem>,
                <NavItem  key={2} id="register"  onClick={()=>modalStatus(true, 'register')}>register</NavItem>
            ]
            return resolvedLinks
    }

    render(){
        const {modalOpen, modalLoad}=this.props;
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
                            <NavItem  className={this.makeLinkActive('/')} href="/">Home</NavItem>
                            <NavItem  className={this.makeLinkActive('/howitworks')} href="/howitworks">How it Works</NavItem>
                            <NavItem  className={this.makeLinkActive('/help')} href="/help">Help</NavItem>
                            {
                                this.authenticated()
                            }
                        </Nav>
                    </Navbar.Collapse>
                </Navbar>
                <ReactModal
                    isOpen={modalOpen} shouldCloseOnOverlayClick={true}
                    onRequestClose={this.handleCloseModal.bind(this)}
                >
                    {
                        (modalLoad==='login')?
                            <Login close={this.handleCloseModal.bind(this)} />:
                                (modalLoad==='register')?
                                <Register close={this.handleCloseModal.bind(this)} />:
                                <Plans close={this.handleCloseModal.bind(this)} />
                    }
                </ReactModal>
            </Row>
        )
    }
}
function mapStateToProps(state) {
  return {
      authenticated: state.user.authenticated,
      modalLoad:state.user.page,
      modalOpen:state.user.isOpen
  };
}
const mapDispatchToProps= {signoutUser, modalStatus}
export default connect(mapStateToProps, mapDispatchToProps)(withRouter(Header));
