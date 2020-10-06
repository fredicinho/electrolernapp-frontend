import React, {Fragment} from 'react';
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import {BrowserRouter as Router, Route, Switch} from "react-router-dom";
import Sidebar from "react-sidebar";
import NavigationBar from './Components/NavigationBar';
import Home from "./Components/Home";
import About from "./Components/About";
import NoMatch from "./Components/NoMatch";

class App extends React.Component {


    render() {
        return (
            <Fragment>
                <Router>
                    <Sidebar
                        sidebar={<b>Sidebar content</b>}
                        open={this.state.sidebarOpen}
                        docked={this.state.sidebarDocked}
                        onSetOpen={this.onSetSidebarOpen}
                    >
                        <Switch>
                            <Route exact path="/" component={Home}/>
                            <Route path="/about" component={About}/>
                            <Route component={NoMatch}/>
                        </Switch>
                    </Sidebar>
                </Router>
            </Fragment>
        );
    }
}

export default App;
