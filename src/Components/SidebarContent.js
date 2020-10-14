import React from "react";
import PropTypes from "prop-types";
import MaterialTitlePanel from "./MaterialTitelPanel";

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

class SidebarContent extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            style: props.style ? {...styles.sidebar, ...props.style} : styles.sidebar,
            navigationItems: [],
        }
    }

    render() {
        const items = this.state.navigationItems;
        this.props.links.map(links => {
            items.push(
                <a href="#" style={styles.sidebarLink}>
                    {links}
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
                    <a href="/exercices" style={styles.sidebarLink}>
                        Übungen
                    </a>
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

export default SidebarContent;
