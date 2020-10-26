import React, {Fragment} from "react";
import SidebarContent from "./SidebarContent";
import 'bootstrap/dist/css/bootstrap.min.css';
import {BrowserRouter as Router, Route, Switch} from "react-router-dom";
import { createBrowserHistory } from "history";
import Sidebar from "react-sidebar";
import MaterialTitlePanel from "./MaterialTitelPanel";
import Home from "./Home";
import Demo from "./Demo";
import About from "./About";
import NoMatch from "./NoMatch";
import { connect } from "react-redux";
import { changeNavigationPage, NavigationStates } from "../../Redux/Actions/navigationActions";
import IconButton from "@material-ui/core/IconButton";
import AccountCircle from "@material-ui/icons/AccountCircle";
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";
import {MuiThemeProvider} from "@material-ui/core";
import createMuiTheme from "@material-ui/core/styles/createMuiTheme";
import AuthenticationRequests from "../../Services/AuthService/AuthenticationRequests";
import Exercise from "./Exercise";


const mql = window.matchMedia(`(min-width: 800px)`);


function mapDispatchToProps(dispatch) {
    return {
        changeNavigationPage: actualPage => dispatch(changeNavigationPage(actualPage))
    };
}

const theme = createMuiTheme({
    overrides: {
        MuiOutlinedInput: {
            root: {
                "&&&& $input": {
                    padding: "0px"
                }
            }
        }
    }
});

class MainContent extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            docked: mql.matches,
            open: false,
            actualPage: NavigationStates.EXERCISES,
            anchorEl: null,
            openAnchorEl: false
        };

        this.mediaQueryChanged = this.mediaQueryChanged.bind(this);
        this.toggleOpen = this.toggleOpen.bind(this);
        this.onSetOpen = this.onSetOpen.bind(this);
        this.handleClose = this.handleClose.bind(this);
        this.handleMenu = this.handleMenu.bind(this);
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

    toggleLogout(event) {
        AuthenticationRequests.logout()
        this.handleClose()
        if (event) {
            event.preventDefault();
        }
    }

    handleMenu(event){
        this.setState({
            anchorEl: event.currentTarget,
            openAnchorEl: true
        })
    };

    handleClose(){
        this.setState({
            anchorEl: null,
            openAnchorEl: false
        });
    };

    getNavigationStateByLocation(location) {
        switch (location) {
            case "/statistics":
                this.props.changeNavigationPage( this.state.actualPage )
                return NavigationStates.STATISTICS;
                break
            case "/":
                this.props.changeNavigationPage(NavigationStates.HOME)
                return NavigationStates.HOME;
                break
            case "/demo":
                this.props.changeNavigationPage(NavigationStates.DEMO)
                return NavigationStates.DEMO;
                break
            case "/exams":
                this.props.changeNavigationPage(NavigationStates.EXAMS)
                return NavigationStates.EXAMS;
                break
            case "/exercices":
                this.props.changeNavigationPage(NavigationStates.EXERCISES)
                return NavigationStates.EXERCISES;
                break
            default:
                this.props.changeNavigationPage(NavigationStates.HOME)
                return NavigationStates.NOTFOUND;
        }
    }

    getNavigationName(navigationItem) {
        switch (navigationItem) {
            case NavigationStates.STATISTICS:
                return "Statistiken";
                break
            case NavigationStates.HOME:
                return "Home";
                break
            case NavigationStates.DEMO:
                return "Demo";
                break
            case NavigationStates.EXAMS:
                return "Prüfungen";
                break
            case NavigationStates.EXERCISES:
                return "Übungen";
                break
            default:
                return "Not Found";
        }
    }



    render() {
        const navigationState = this.getNavigationStateByLocation(createBrowserHistory().location.pathname);
        const sidebar = <SidebarContent />;
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
                <span> {this.getNavigationName(navigationState)} </span>
            </span>
        );

        const navigationHeader = (
            <span>
                                <MuiThemeProvider theme={theme}>
            <IconButton
                aria-label="account of current user"
                aria-controls="menu-appbar"
                aria-haspopup="true"
                onClick={this.handleMenu}
                color="inherit"
            >

                    <AccountCircle />

            </IconButton>
                                                    </MuiThemeProvider>
        <Menu
            id="menu-appbar"
            anchorEl={this.state.anchorEl}
            anchorOrigin={{
                vertical: 'top',
                horizontal: 'right',
            }}
            keepMounted
            transformOrigin={{
                vertical: 'top',
                horizontal: 'right',
            }}
            open={this.state.openAnchorEl}
            onClose={this.handleClose}
        >
            <MenuItem onClick={this.handleClose}>Mein Profil</MenuItem>
            <MenuItem onClick={this.handleClose}>Mein Account</MenuItem>
            <MenuItem onClick={this.toggleLogout}>Ausloggen</MenuItem>
        </Menu>
                </span>
        );

        const sidebarProps = {
            sidebar,
            docked: this.state.docked,
            open: this.state.open,
            onSetOpen: this.onSetOpen,
            shadow: true,
            transitions: true
        };

        return (
            <Fragment>
                <Router>
                    <Sidebar {...sidebarProps}>
                        <MaterialTitlePanel title={contentHeader} navigation={navigationHeader}>
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

export default connect(
    null,
    mapDispatchToProps
)(MainContent);

