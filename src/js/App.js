import React, { Component } from 'react';
import Header from './components/header';
import {BrowserRouter as Router,  Route } from 'react-router-dom';
import {Grid, Row} from 'react-bootstrap'
import Footer from './components/footer';
import Home from './components/home'
import Dashboard from './components/dashboard'
import Howitworks from './components/howitworks'
import Ourmission from './components/ourmission'
import Whymom from './components/whymom'
import Help from './components/help'
import requireAuth from './components/auth/require_auth';
import { connect } from 'react-redux';
import { getAllPlans } from './actions/planActions'
export class App extends Component {
    componentWillMount(){
        this.props.getAllPlans().then(data=>{
        })
    }
    render() {
        return (
            <Router>
                <Grid fluid={true} className="App">
                    <Header className="App-header"></Header>
                    <Route  exact path="/"  component={Home} />
                    <Route  exact path="/dashboard"   component={requireAuth(Dashboard)}  />
                    <Route  exact path="/Howitworks"  component={Howitworks} />
                    <Route  exact path="/ourmission"  component={Ourmission} />
                    <Route  exact path="/whymom"  component={Whymom} />
                    <Route  exact path="/help"  component={Help} />
                    <Footer />
                </Grid>
            </Router>
        );
    }
}

export default connect(null, {getAllPlans})(App);
