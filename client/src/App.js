import './App.css';
import React from 'react'
import Header from './common/header-and-footer/Header';
import Home from './home/Home';
import Footer from './common/header-and-footer/Footer';
import Login from './LoginForm';
import BusinessRegistration from './registration/BusinessRegistrationForm';
import {BrowserRouter as Router, Switch, Route} from 'react-router-dom';

function App() {
    return (
        <Router>
            <div>
                <Header/>
                {/* Matches the URL to the path and does not go through the rest of the routes*/}
                <Switch>
                    {/* Renders the correct component based on the URL*/}
                    <Route path={"/"} exact component={Home}/>
                    <Route path={"/login"} component={Login}/>
                    <Route path={"/registration/business"} component={BusinessRegistration}/>
                </Switch>
                <Footer/>
            </div>
        </Router>
    );
}

export default App;
