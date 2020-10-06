import React, {Fragment} from 'react';
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import NavigationBar from './Components/NavigationBar';
import Home from "./Components/Home";
import About from "./Components/About";
import NoMatch from "./Components/NoMatch";
import Sidebar from "./Components/Sidebar";

function App() {
  return (
      <Fragment>
        <Router>
            <NavigationBar/>
            <Sidebar/>
            <Switch>
                <Route exact path="/" component={Home} />
                <Route path="/about" component={About} />
                <Route component={NoMatch} />
            </Switch>
        </Router>
      </Fragment>
  );
}

export default App;
