import React, {Component} from 'react'
import { Row, Col, Navbar, Nav, NavItem} from 'react-bootstrap'
import Login from './auth/loginUser';
import Register from './auth/register';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { signoutUser} from '../actions/userActions';
import ReactModal from 'react-modal';
class Header extends Component {
    constructor(props){
        super(props);
        this.state={
            modalOpen:false,
            modalLoad:'login',
        }
    }
    signoutUser(){
        this.props.signoutUser().then((data)=>{
            this.props.history.push('/')
        })

    }
    authenticated(){
        let resolvedLinks = (this.props.authenticated)?
            [

                <NavItem href="/dashboard">dashboard</NavItem>,
                <NavItem onClick={this.signoutUser.bind(this)}>logout</NavItem>,
            ]:
            [
                <NavItem  onClick={()=>this.setState({modalLoad:'login', modalOpen:true})}>login</NavItem>,
                <NavItem  onClick={()=>this.setState({modalLoad:'register', modalOpen:true})}>register</NavItem>
            ]
            return resolvedLinks
    }
    handleCloseModal (route) {
        // if(route) this.props.history.push(route)
        this.setState({ modalOpen: false });
    }
    render(){
        const {modalOpen, modalLoad}=this.state;
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
                <ReactModal
                    isOpen={modalOpen} shouldCloseOnOverlayClick={true}
                    onRequestClose={this.handleCloseModal.bind(this)}
                >
                    {
                        (modalLoad==='login')?<Login close={this.handleCloseModal.bind(this)} />:<Register close={this.handleCloseModal.bind(this)} />
                    }
                </ReactModal>
            </Row>
        )
    }
}
function mapStateToProps(state) {
  return { signoutUser: state.user.authenticated };
}
const mapDispatchToProps= {signoutUser}
export default connect(mapStateToProps, mapDispatchToProps)(Header);
