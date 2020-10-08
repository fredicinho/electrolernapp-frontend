import React, {Fragment} from 'react';
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import {BrowserRouter as Router, Route, Switch} from "react-router-dom";
import Sidebar from "react-sidebar";
import Home from "./Components/Home";
import About from "./Components/About";
import NoMatch from "./Components/NoMatch";
import SidebarContent from "./Components/SidebarContent";
import MaterialTitlePanel from "./Components/MaterialTitelPanel";
import Demo from "./Components/Demo";

const mql = window.matchMedia(`(min-width: 800px)`);

class App extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            docked: mql.matches,
            open: false
        };

        this.mediaQueryChanged = this.mediaQueryChanged.bind(this);
        this.toggleOpen = this.toggleOpen.bind(this);
        this.onSetOpen = this.onSetOpen.bind(this);
    }

    componentWillMount() {
        mql.addListener(this.mediaQueryChanged);
    }

    componentWillUnmount() {
        mql.removeListener(this.mediaQueryChanged);
    }

    onSetOpen(open) {
        this.setState({ open });
    }

    mediaQueryChanged() {
        this.setState({
            docked: mql.matches,
            open: false
        });
    }

    toggleOpen(ev) {
        this.setState({ open: !this.state.open });

        if (ev) {
            ev.preventDefault();
        }
    }

    render() {
        const sidebar = <SidebarContent />;

        // TODO: Header in eigene Komponente einfügen
        const contentHeader = (
            <span>
        {!this.state.docked && (
            <a
                onClick={this.toggleOpen}
                href="#"
            >
                =
            </a>
        )}
                <span> Responsive React Sidebar</span>
      </span>
        );

        const sidebarProps = {
            sidebar,
            docked: this.state.docked,
            open: this.state.open,
            onSetOpen: this.onSetOpen
        };

        return (
            <Fragment>
                <Router>
                    <Sidebar {...sidebarProps}>
                        <MaterialTitlePanel title={contentHeader}>
                        <Switch>
                            <Route exact path="/" component={Home}/>
                            <Route path="/demo" component={Demo}/>
                            <Route path="/about" component={About}/>
                            <Route component={NoMatch}/>
                        </Switch>
                            </MaterialTitlePanel>
                    </Sidebar>
                </Router>
            </Fragment>
        );
    }
}

export default App;
