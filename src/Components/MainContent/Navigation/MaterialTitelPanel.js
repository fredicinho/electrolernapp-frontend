import React from "react";
import PropTypes from "prop-types";
import {changeNavigationPage} from "../../../Redux/Actions/navigationActions";
import {connect} from "react-redux";
import { withRouter } from 'react-router-dom';
import {getNavigationStateByLocation} from "./NavigationUtils";


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
    justifyContent: "space-between",
},
  headerTitle: {
    textAlign: "center"
  },
  navigationHeader: {
    textAlign: "right"
  }
};

function mapDispatchToProps(dispatch) {
  return {
    changeNavigationPage: actualPage => dispatch(changeNavigationPage(actualPage))
  };
}

const MaterialTitlePanel = props => {
  const rootStyle = props.style
    ? { ...styles.root, ...props.style }
    : styles.root;

  props.history.listen((location, action) => {
    props.changeNavigationPage(getNavigationStateByLocation(location.pathname))
  });


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
const MaterialTitlePanelView = connect(null, mapDispatchToProps)(MaterialTitlePanel);
export default withRouter(MaterialTitlePanelView);
