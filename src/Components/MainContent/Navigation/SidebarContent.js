import React from "react";
import PropTypes from "prop-types";
import MaterialTitlePanel from "./MaterialTitelPanel";
import {NavigationStates} from "../../../Redux/Actions/navigationActions";
import {connect} from "react-redux";
import {Collapse, Button, CardBody, Card} from 'reactstrap';
import ListSubheader from "@material-ui/core/ListSubheader";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import InboxIcon from '@material-ui/icons/MoveToInbox';
import DraftsIcon from '@material-ui/icons/Drafts';
import SendIcon from '@material-ui/icons/Send';
import List from "@material-ui/core/List";
import {ExpandLess, ExpandMore, StarBorder} from "@material-ui/icons";
import withStyles from "@material-ui/core/styles/withStyles";
import {Link} from 'react-router-dom';
import {useLocation} from "react-router";
import AuthenticationRequests from "../../../Services/AuthService/AuthenticationRequests";
import ListItemAvatar from "@material-ui/core/ListItemAvatar";
import Avatar from "@material-ui/core/Avatar";
import hsluLogo from "../../../images/hsluLogo.png";
import DataExport from "../Admin/DataExport";


const styles = {
    sidebar: {
        width: 256,
        height: "100%"
    },
    sidebarLink: {
        display: "block",
        padding: "16px 0px",
        color: "#757575",
        textDecoration: "none"
    },
    divider: {
        margin: "8px 0",
        height: 1,
        backgroundColor: "#757575"
    },
    content: {
        padding: "16px",
        height: "100%",
        backgroundColor: "white"
    }
};


const mapStateToProps = state => {
    return {actualPage: state.navigation.actualPage};
};


const navigationItems = {
    home: [],
    exercises: ["Nächste Übung", "Vorherige Übung", "Übungen beenden"],
    exam: ["Test beenden", "Alle Testaufgaben"]
}

const myStyles = theme => ({
    root: {
        width: '100%',
        maxWidth: 360,
        backgroundColor: theme.palette.background.paper,
    },
    nested: {
        paddingLeft: theme.spacing(4),
        '&:hover': {
            color: 'black',
            fontWeight: '1000',
            backgroundColor: '#d3d3d3',
        }
    },
    hsluLogo: {
        width: '100%',
        height: 'auto',
        padding: '10px',
        bottom: 0,
    },
    link : {
        '&:hover': {
            color: 'black',
            fontWeight: '1000',
            backgroundColor: '#d3d3d3',
        }
    }
});

class SidebarContent extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            style: props.style ? {...styles.sidebar, ...props.style} : styles.sidebar,
            exercisesOpen: false,
            adminPanelOpen: false,
            userManagementPanelOpen: false,
            examsOpen: false,
            institutionPanelOpen: false,
        }
        this.toggleExercise = this.toggleExercise.bind(this);
        this.toggleAdmin = this.toggleAdmin.bind(this);
        this.toggleUserManagement = this.toggleUserManagement.bind(this);
        this.toggleExams = this.toggleExams.bind(this);
        this.toggleInstitutions = this.toggleInstitutions.bind(this);


    }

    getNavigationItems(navigationPage) {
        switch (navigationPage) {
            case NavigationStates.HOME:
                return navigationItems.home
            case NavigationStates.EXERCISES:
                return navigationItems.exam
            case NavigationStates.EXAMS:
                return navigationItems.exam
            default:
                return navigationItems.home
        }
    }

    toggleExercise() {
        this.setState(prevState => ({
            exercisesOpen: !prevState.exercisesOpen
        }));
    }

    toggleAdmin() {
        this.setState( prevState => ({
            adminPanelOpen: !prevState.adminPanelOpen
        }));
    }

    toggleUserManagement() {
        this.setState( prevState => ({
            userManagementPanelOpen: !prevState.userManagementPanelOpen
        }));
    }

    toggleExams() {
        this.setState( prevState => ({
            examsOpen: !prevState.examsOpen
        }));
    }

    toggleInstitutions() {
        this.setState( prevState => ({
            institutionPanelOpen: !prevState.institutionPanelOpen
        }));
    }


    render() {
        const {classes} = this.props;

        return (
            <MaterialTitlePanel title="Menu" style={this.state.style}>
                <List
                    component="nav"
                    className={classes.root}
                >
                    <ListItem button className={classes.link} component={Link} to="/">
                        <ListItemText primary="Home"/>
                    </ListItem>
                    <ListItem button className={classes.link} onClick={this.toggleExercise}>
                        <ListItemText primary="Übungen"/>
                        {this.state.exercisesOpen ? <ExpandLess/> : <ExpandMore/>}
                    </ListItem>
                    <Collapse isOpen={this.state.exercisesOpen} unmountOnExit={true}>
                        <List component="div" disablePadding>
                            <ListItem button className={classes.nested} component={Link} to="/categories">
                                <ListItemText primary="Kategorien"/>
                            </ListItem>
                            <ListItem button className={classes.nested} component={Link} to="/categorySets">
                                <ListItemText primary="Übungssets"/>
                            </ListItem>
                        </List>
                    </Collapse>
                    <ListItem button className={classes.link} component={Link} to="/exams">
                        <ListItemText primary="Prüfungen"/>
                    </ListItem>
                    <ListItem button className={classes.link} component={Link} to="/statistics">
                        <ListItemText primary="Statistiken"/>
                    </ListItem>
                    { this.props.isAdminOrTeacher &&
                        <React.Fragment>
                            <ListItem button className={classes.link} onClick={this.toggleUserManagement}>
                                <ListItemText primary="Benutzerverwaltung"/>
                                {this.state.userManagementPanelOpen ? <ExpandLess/> : <ExpandMore/>}
                            </ListItem>
                            <Collapse isOpen={this.state.userManagementPanelOpen} unmountOnExit={true}>
                                <List component="div" disablePadding>
                                    <ListItem button className={classes.nested} component={Link} to="/createusers">
                                        <ListItemText primary="Benutzer importieren"/>
                                    </ListItem>
                                    <ListItem button className={classes.nested} component={Link} to="/createuser">
                                        <ListItemText primary="Benutzer erstellen"/>
                                    </ListItem>
                                </List>
                            </Collapse>
                            <ListItem button className={classes.link} onClick={this.toggleExams}>
                                <ListItemText primary="Prüfungen und Fragen"/>
                                {this.state.examsOpen ? <ExpandLess/> : <ExpandMore/>}
                            </ListItem>
                            <Collapse isOpen={this.state.examsOpen} unmountOnExit={true}>
                                <List component="div" disablePadding>
                                    <ListItem button className={classes.nested} component={Link} to="/createexam">
                                        <ListItemText primary="Prüfung erstellen"/>
                                    </ListItem>
                                    <ListItem button className={classes.nested} component={Link} to="/createquestion">
                                        <ListItemText primary="Fragen erstellen"/>
                                    </ListItem>
                                </List>
                            </Collapse>
                            <ListItem button className={classes.link} onClick={this.toggleInstitutions}>
                                <ListItemText primary="Institutionen und Klassen"/>
                                {this.state.institutionPanelOpen ? <ExpandLess/> : <ExpandMore/>}
                            </ListItem>
                            <Collapse isOpen={this.state.institutionPanelOpen} unmountOnExit={true}>
                                <List component="div" disablePadding>
                                    <ListItem button className={classes.nested} component={Link} to="/createschoolclass">
                                        <ListItemText primary="Klasse erstellen"/>
                                    </ListItem>
                                    <ListItem button className={classes.nested} component={Link} to="/editschoolclass">
                                        <ListItemText primary="Klasse bearbeiten"/>
                                    </ListItem>
                                    <ListItem button className={classes.nested} component={Link} to="/createinstitution">
                                        <ListItemText primary="Bildungsinstitution erstellen"/>
                                    </ListItem>
                                </List>
                            </Collapse>
                            <ListItem button className={classes.link} component={Link} to="/export">
                                <ListItemText primary="Daten exportieren"/>
                            </ListItem>
                        </React.Fragment>
                    }
                </List>
                <div className={classes.hsluLogo}>
                <a href="https://www.hslu.ch/de-ch/technik-architektur/studium/bachelor/gebaeudetechnik-energie/">
                <img src={hsluLogo} className={classes.hsluLogo}/>
                </a>
                </div>

            </MaterialTitlePanel>
        );
    }
}


SidebarContent.propTypes = {
    style: PropTypes.object
};

const Sidebar = connect(mapStateToProps, null)(SidebarContent)

export default withStyles(myStyles)(Sidebar);