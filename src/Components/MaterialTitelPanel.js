import React from "react";
import PropTypes from "prop-types";
import navbarStyles from "../CSS/NavigationBar.css";


const styles = {
  root: {
    fontFamily:
      '"HelveticaNeue-Light", "Helvetica Neue Light", "Helvetica Neue", Helvetica, Arial, "Lucida Grande", sans-serif',
    fontWeight: 300
  },
  header: {
    backgroundColor: "#03a9f4",
    color: "white",
    padding: "20px",
    fontSize: "1.5em",
    display: "flex",
    justifyContent: "space-between"
},
  headerTitle: {
    textAlign: "center"
  },
  navigationHeader: {
    textAlign: "right"
  }
};


const MaterialTitlePanel = props => {
  const rootStyle = props.style
    ? { ...styles.root, ...props.style }
    : styles.root;

  return (
    <div style={rootStyle}>
      <div style={styles.header}>
        <span style={styles.headerTitle}>{props.title}</span>
        <span style={styles.navigationHeader}>{props.navigation}</span>
      </div>
      {props.children}
    </div>
  );
};

MaterialTitlePanel.propTypes = {
  style: PropTypes.object,
  title: PropTypes.oneOfType([PropTypes.string, PropTypes.object]),
  children: PropTypes.object
};

export default MaterialTitlePanel;
