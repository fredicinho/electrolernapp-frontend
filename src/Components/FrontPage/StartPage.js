import React from "react";
import NavigationBar from "./NavigationBar";
import StartPageContent from "./StartPageContent";
import {BrowserRouter as Router, Route, Switch} from "react-router-dom";
import SignIn from "./SignIn";
import SignUp from "./SignUp";
import Demo from "./Demo";
import {Redirect} from "react-router-dom";
import background from "../../images/backgroundBlue.jpg";
import withStyles from "@material-ui/core/styles/withStyles";

const styles = theme => ({
    root: {
        backgroundImage: `url(${background})`,
        backgroundRepeat: 'no-repeat',
        backgroundSize: 'auto auto',
        backgroundPosition: 'center',
        flexDirection: 'column',
    },
});

class StartPage extends React.Component {

    render() {
        const { classes } = this.props;
        return (
            <Router>
                <div className={classes.root}>
                <NavigationBar/>
                <Switch>
                    <Route path="/login" component={SignIn}/>
                    <Route path="/register" component={SignUp}/>
                    <Route path="/demo" component={Demo}/>
                    <Route path="/"> {this.props.redirect ? <Redirect to="/login" /> : <StartPageContent />} </Route>
                </Switch>
                </div>
            </Router>
        );
    }
}

export default withStyles(styles)(StartPage);