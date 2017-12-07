import React, { Component } from 'react';
import Header from './components/header';
import {BrowserRouter as Router,  Route } from 'react-router-dom';
import {Grid, Row} from 'react-bootstrap'
import Footer from './components/footer';
import Home from './components/home'
import Profile from './components/profile'
import Howitworks from './components/howitworks'
import Ourmission from './components/ourmission'
import Whymom from './components/whymom'
import Help from './components/help'
import requireAuth from './components/auth/require_auth';
import ReactModal from 'react-modal';
import Login from './components/auth/loginUser';
import Register from './components/auth/register';
import {modalStatus} from './actions/userActions'
import { connect } from 'react-redux';
class App extends Component {
    handleCloseModal (route) {
        // if(route) this.props.history.push(route)
        this.props.modalStatus(false, '')
    }
    render() {
        const {modalLoad, modalOpen}=this.props;
        return (
            <Router>
                <Grid fluid={true} className="App">
                    <Header className="App-header"></Header>
                    <Route  exact path="/"  component={Home} />
                    <Route  exact path="/Howitworks"  component={Howitworks} />
                    <Route  exact path="/ourmission"  component={Ourmission} />
                    <Route  exact path="/whymom"  component={Whymom} />
                    <Route  exact path="/help"  component={Help} />
                    <Footer />
                    <ReactModal
                        isOpen={modalOpen} shouldCloseOnOverlayClick={true}
                        onRequestClose={this.handleCloseModal.bind(this)}
                    >
                        {
                            (modalLoad==='login')?
                                <Login close={this.handleCloseModal.bind(this)} />:
                                <Register close={this.handleCloseModal.bind(this)} />
                        }
                    </ReactModal>
                </Grid>
            </Router>
        );
    }
}
function mapStateToProps(state){
    return{
        modalOpen:state.user.isOpen,
        modalLoad:state.user.page
    }
}
export default connect(mapStateToProps, {modalStatus})(App);
