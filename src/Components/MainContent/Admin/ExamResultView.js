import React from "react";
import ReactFlexyTable from "react-flexy-table"
import "react-flexy-table/dist/index.css"
import Loader from "../Utils/Loader";
import withStyles from "@material-ui/core/styles/withStyles";


const myStyles = theme => ({
    root: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
    },
});


class ExamResultView extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            examSetOverviewLoaded: false,
            examSetOverviews: [],
        }

    }


    render() {
        const { examSetOverviewLoaded, examSetOverviews } = this.state;
        const { classes } = this.props;

        if (!examSetOverviewLoaded) {
            return(
                <div className={classes.root}>
                    <Loader/>
                </div>
            );
        } else {
            return(
                <ReactFlexyTable data={examSetOverviews} filterable/>
                );
        }
    }

}

export default withStyles(myStyles)(ExamResultView);