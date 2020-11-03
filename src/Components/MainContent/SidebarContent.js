import React from "react";
import PropTypes from "prop-types";
import MaterialTitlePanel from "./MaterialTitelPanel";
import {NavigationStates} from "../../Redux/Actions/navigationActions";
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
    },
});

class SidebarContent extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            style: props.style ? {...styles.sidebar, ...props.style} : styles.sidebar,
            exercisesOpen: false
        }
        this.toggleExercise = this.toggleExercise.bind(this);
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


    render() {
        const {classes} = this.props;
        let items = []
        this.getNavigationItems(this.props.actualPage).map(navigationItem => {
            items.push(
                <ListItem button>
                    <ListItemText primary={navigationItem}/>
                </ListItem>
            );
        });
        return (
            <MaterialTitlePanel title="Menu" style={this.state.style}>
                {!items && <List
                    component="nav"
                    className={classes.root}
                >
                    {items}
                </List>
                }
                { !items && <div style={styles.divider}/> }
                <List
                    component="nav"
                    className={classes.root}
                >
                    <ListItem button component={Link} to="/">
                        <ListItemText primary="Home"/>
                    </ListItem>
                    <ListItem button onClick={this.toggleExercise}>
                        <ListItemText primary="Übungen"/>
                        {this.state.exercisesOpen ? <ExpandLess/> : <ExpandMore/>}
                    </ListItem>
                    <Collapse isOpen={this.state.exercisesOpen} timeout="auto" unmountOnExit={true}>
                        <List component="div" disablePadding>
                            <ListItem button className={classes.nested} component={Link} to="/categories">
                                <ListItemText primary="Kategorien"/>
                            </ListItem>
                            <ListItem button className={classes.nested} component={Link} to="/categorySets">
                                <ListItemText primary="Übungssets"/>
                            </ListItem>
                        </List>
                    </Collapse>
                    <ListItem button component={Link} to="/exams">
                        <ListItemText primary="Prüfungen"/>
                    </ListItem>
                    <ListItem button component={Link} to="/statistics">
                        <ListItemText primary="Statistiken"/>
                    </ListItem>
                </List>
            </MaterialTitlePanel>
        );
    }


}


SidebarContent.propTypes = {
    style: PropTypes.object
};

const Sidebar = connect(mapStateToProps, null)(SidebarContent)

export default withStyles(myStyles)(Sidebar);