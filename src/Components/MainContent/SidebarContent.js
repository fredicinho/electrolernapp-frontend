import React from "react";
import PropTypes from "prop-types";
import MaterialTitlePanel from "./MaterialTitelPanel";
import { NavigationStates } from "../../Redux/Actions/navigationActions";
import { connect } from "react-redux";
import { Collapse, Button, CardBody, Card } from 'reactstrap';



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
    return { actualPage: state.navigationReducer.actualPage };
};



const navigationItems = {
    home: ["Zufällige Übung"],
    exercises: ["Nächste Übung", "Vorherige Übung", "Übungen beenden"],
    exam: ["Test beenden", "Alle Testaufgaben"]
}

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
        let items = []
        this.getNavigationItems(this.props.actualPage).map(navigationItem => {
            items.push(
                <a href="#" style={styles.sidebarLink}>
                    {navigationItem}
                </a>
            );
        });

        return (
            <MaterialTitlePanel title="Menu" style={this.state.style}>
                <div style={styles.content}>
                  {items}
                    <div style={styles.divider}/>
                    <a href="/" style={styles.sidebarLink}>
                        Home
                    </a>
                    <a href="#" style={styles.sidebarLink} onClick={this.toggleExercise}>
                        Übungen
                    </a>
                    <Collapse isOpen={this.state.exercisesOpen}>
                        <Card>
                            <CardBody>
                                <a href="/" style={styles.sidebarLink}>
                                    Kategorien
                                </a>
                                <a href="/" style={styles.sidebarLink}>
                                    KategorieSets
                                </a>
                            </CardBody>
                        </Card>
                    </Collapse>
                    <a href="/exams" style={styles.sidebarLink}>
                        Prüfungen
                    </a>
                    <a href="/statistics" style={styles.sidebarLink}>
                        Statistiken
                    </a>
                    <a href="/demo" style={styles.sidebarLink}>
                        Demo
                    </a>
                </div>
            </MaterialTitlePanel>
        );
    }


}



SidebarContent.propTypes = {
    style: PropTypes.object
};

export default connect(mapStateToProps, null)(SidebarContent);

