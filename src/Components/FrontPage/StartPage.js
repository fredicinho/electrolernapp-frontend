import React from "react";
import NavigationBar from "./NavigationBar";
import StartPageContent from "./StartPageContent";
import {BrowserRouter as Router, Route, Switch} from "react-router-dom";
import SignIn from "./SignIn";
import SignUp from "./SignUp";
import Demo from "./Demo";
import {Redirect} from "react-router-dom";



class StartPage extends React.Component {

    render() {
        return (
            <Router>
                <NavigationBar/>
                <Switch>
                    <Route path="/login" component={SignIn}/>
                    <Route path="/register" component={SignUp}/>
                    <Route path="/demo" component={Demo}/>
                    <Route path="/"> {this.props.redirect ? <Redirect to="/login" /> : <StartPageContent />} </Route>
                </Switch>
            </Router>
        );
    }
}

export default StartPage;