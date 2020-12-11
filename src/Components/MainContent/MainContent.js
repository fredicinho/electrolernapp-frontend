import React, {Fragment} from "react";
import SidebarContent from "./Navigation/SidebarContent";
import 'bootstrap/dist/css/bootstrap.min.css';
import {BrowserRouter as Router, Link, Route, Switch} from "react-router-dom";
import Sidebar from "react-sidebar";
import MaterialTitlePanel from "./Navigation/MaterialTitelPanel";
import Demo from "../FrontPage/Demo";
import NoMatch from "./Utils/NoMatch";
import {connect} from "react-redux";
import {changeNavigationPage, NavigationStates} from "../../Redux/Actions/navigationActions";
import IconButton from "@material-ui/core/IconButton";
import AccountCircle from "@material-ui/icons/AccountCircle";
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";
import {MuiThemeProvider, withStyles} from "@material-ui/core";
import createMuiTheme from "@material-ui/core/styles/createMuiTheme";
import AuthenticationRequests from "../../Services/AuthService/AuthenticationRequests";
import Exercise from "./MainComponents/Exercise";
import CategoryView from "./MainComponents/CategorieView";
import CategorySets from "./MainComponents/CategorySetView";
import {getNavigationName} from "./Navigation/NavigationUtils";
import QuestionForm from "./Admin/QuestionForm";
import Home from "./MainComponents/Home";
import ExamForm from "./Admin/ExamForm";
import ExamView from "./MainComponents/ExamView";
import SchoolClassForm from "./Admin/SchoolClassForm";
import InstitutionForm from "./Admin/InstitutionForm";
import Quiz from "./Exam/Quiz";
import ReviseExam from "./Admin/ReviseExam";
import ImportUsersForm from "./Admin/ImportUsersForm";
import SignUp from "./Admin/SignUp";
import Statistics from "./MainComponents/Statistics";
import EditSchoolClassForm from "./Admin/EditSchoolClassForm";
import DataExport from "./Admin/DataExport";
import MyProfile from "./MainComponents/MyPofile";
import ListItem from "@material-ui/core/ListItem";
import ExamResultView from "./Admin/ExamResultView";


const mql = window.matchMedia(`(min-width: 800px)`);


const mapStateToProps = state => {
    return {actualPage: state.navigation.actualPage};
};


const myStyles = theme => ({

    accountIcon: {
        "& .MuiIconButton-root": {
            padding: 0
        }
    },

    title: {
        flexGrow: 1,
    },
    link: {
        textDecoration: 'none',
        color: 'white',
        '&:hover': {
            textDecoration: 'none',
        }
    },
    linkProfile : {
        '&:hover': {
            color: 'black',
            fontWeight: '1000',
            backgroundColor: '#d3d3d3',
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
            openAnchorEl: false,
        };
        this.mediaQueryChanged = this.mediaQueryChanged.bind(this);
        this.toggleOpen = this.toggleOpen.bind(this);
        this.onSetOpen = this.onSetOpen.bind(this);
        this.handleClose = this.handleClose.bind(this);
        this.handleMenu = this.handleMenu.bind(this);
        this.toggleLogout = this.toggleLogout.bind(this);
    }

    componentWillMount() {
        mql.addListener(this.mediaQueryChanged);
    }

    componentWillUnmount() {
        mql.removeListener(this.mediaQueryChanged);
    }


    onSetOpen(open) {
        this.setState({open});
    }

    mediaQueryChanged() {
        this.setState({
            docked: mql.matches,
            open: false
        });
    }

    toggleOpen(ev) {
        this.setState({open: !this.state.open});

        if (ev) {
            ev.preventDefault();
        }
    }

    toggleLogout(event) {
        AuthenticationRequests.logout()
        this.handleClose()
        window.location.reload();
        if (event) {
            event.preventDefault();
        }
    }

    handleMenu(event) {
        this.setState({
            anchorEl: event.currentTarget,
            openAnchorEl: true
        })
    };

    handleClose() {
        this.setState({
            anchorEl: null,
            openAnchorEl: false
        });
    };


    render() {
        const sidebar = <SidebarContent isAdminOrTeacher={this.props.isAdminOrTeacher}/>;
        const {classes} = this.props;
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
                <span> {getNavigationName(this.props.actualPage)} </span>
            </span>
        );

        const navigationHeader = (
            <span>
                <div className={classes.accountIcon}>
                    <IconButton
                      aria-label="account of current user"
                      aria-controls="menu-appbar"
                      aria-haspopup="true"
                      onClick={this.handleMenu}
                      color="inherit"
                    >
                        <AccountCircle/>
                    </IconButton>
                </div>
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
            <MenuItem className={classes.linkProfile} component={Link} to="/myprofile" onClick={this.handleClose}>Mein Profil</MenuItem>
            <MenuItem className={classes.linkProfile} onClick={this.toggleLogout}>Ausloggen</MenuItem>
        </Menu>
                </span>
        );

        const sidebarProps = {
            sidebar,
            docked: this.state.docked,
            open: this.state.open,
            onSetOpen: this.onSetOpen,
            shadow: true,
            transitions: true,
        };

        return (
            <Fragment>
                <Router>
                    <Sidebar {...sidebarProps} isAdminOrTeacher={this.props.isAdminOrTeacher}>
                        <MaterialTitlePanel title={contentHeader} navigation={navigationHeader}>
                            <Switch>
                                <Route exact path="/" component={Home}/>
                                <Route path="/demo" component={Demo}/>
                                <Route path="/categories" component={CategoryView}/>
                                <Route path="/categorySets" component={CategorySets}/>
                                <Route path="/exercises" component={Exercise}/>
                                <Route path="/exams" component={ExamView}/>
                                <Route path="/exam" component={Quiz}/>
                                <Route path="/statistics" component={Statistics}/>
                                <Route path="/myprofile" component={MyProfile}/>
                                {this.props.isAdminOrTeacher &&
                                <React.Fragment>
                                    <Route path="/createquestion" component={QuestionForm}/>
                                    <Route path="/createexam" component={ExamForm}/>
                                    <Route path="/createschoolclass" component={SchoolClassForm}/>
                                    <Route path="/editschoolclass" component={EditSchoolClassForm}/>
                                    <Route path="/createinstitution" component={InstitutionForm}/>
                                    <Route path="/reviseexam" component={ReviseExam}/>
                                    <Route path="/createusers" component={ImportUsersForm}/>
                                    <Route path="/createuser" component={SignUp}/>
                                    <Route path="/export" component={DataExport}/>
                                    <Route path="/examresults" component={ExamResultView}/>
                                </React.Fragment>
                                }
                                <Route component={NoMatch}/>
                            </Switch>
                        </MaterialTitlePanel>
                    </Sidebar>
                </Router>
            </Fragment>
        );
    }
}

const mainComponent = withStyles(myStyles)(MainContent);

export default connect(
    mapStateToProps,
    null
)(mainComponent);

