import './App.css';
import React from 'react'
import Header from './common/header-and-footer/Header';
import Home from './home/Home';
import Footer from './common/header-and-footer/Footer';
import Login from './login/LoginForm';
import BusinessRegistration from './registration/BusinessRegistrationForm';
import Error404 from './common/error/Error404'
import {BrowserRouter as Router, Switch, Route} from 'react-router-dom';
import MemberProfileForm from "./registration/MemberProfileForm";

function App() {
    return (
        <Router>
            <div>
                {/*<Header/>*/}
                {/*/!* Matches the URL to the path and does not go through the rest of the routes*!/*/}
                {/*<Switch>*/}
                {/*    /!* Renders the correct component based on the URL*!/*/}
                {/*    <Route path={"/"} exact component={Home}/>*/}
                {/*    <Route path={"/login"} component={Login}/>*/}
                {/*    <Route path={"/registration/business"} component={BusinessRegistration}/>*/}
                {/*    <Route component={Error404} />*/}
                {/*</Switch>*/}
                {/*<Footer/>*/}
                <MemberProfileForm/>
            </div>
        </Router>
    );
}

export default App;
