import React, {Fragment} from "react";
import SidebarContent from "./SidebarContent";
import '../../node_modules/bootstrap/dist/css/bootstrap.min.css';
import {BrowserRouter as Router, Route, Switch} from "react-router-dom";
import { createBrowserHistory } from "history";
import Sidebar from "react-sidebar";
import MaterialTitlePanel from "./MaterialTitelPanel";
import Home from "./Home";
import Demo from "./Demo";
import About from "./About";
import NoMatch from "./NoMatch";

const mql = window.matchMedia(`(min-width: 800px)`);

class ContentWrapper extends React.Component {
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

    getTitleByLocation(location) {
        switch (location) {
            case "/statistics":
                return "Statistiken";
                break
            case "/":
                return "Home";
                break
            case "/demo":
                return "Demo";
                break
            case "/exams":
                return "Prüfungen";
                break
            case "/exercices":
                return "Übungen";
                break
            default:
                return "Whatever";
        }
    }

    render() {
        const links = ["Nächster Übungsblock", "Vorheriger Übungsblock", "Übungsblock beenden"];
        const sidebar = <SidebarContent links={links}/>;
        const history = createBrowserHistory()
        console.log(history.location.pathname)
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
                <span> {this.getTitleByLocation(createBrowserHistory().location.pathname)} </span>
      </span>
        );

        const sidebarProps = {
            sidebar,
            docked: this.state.docked,
            open: this.state.open,
            onSetOpen: this.onSetOpen,
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

export default ContentWrapper;