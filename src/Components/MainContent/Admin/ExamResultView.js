import React from "react";
import ReactFlexyTable from "react-flexy-table"
import "react-flexy-table/dist/index.css"
import Loader from "../Utils/Loader";
import withStyles from "@material-ui/core/styles/withStyles";
import {connect} from "react-redux";
import ApiRequests, {urlTypes} from "../../../Services/AuthService/ApiRequests";
import "../../../CSS/ExamView.css";


const myStyles = theme => ({
    root: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
    },
});

const mapStateToProps = state => {
    return {
        urlOfExamView: state.exam.urlOfExamView,
        selectedExamId: state.exam.selectedExamId,
        selectedExamTitle: state.exam.selectedExamTitle,
    };
};


class ExamResultView extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            examSetOverviewLoaded: false,
            examSetOverviews: [],
        }

    }

    componentDidMount() {
        ApiRequests.apiGetRequest(this.props.urlOfExamView)
            .then(response => {
                if (response.data !== undefined && response.data != 0) {
                    let examResults = response.data.map((examResultOverview) => {
                        return {
                            "Benutzername": examResultOverview.username,
                            "Erreichte Punkteanzahl" : examResultOverview.achievedPoints,
                            "Mögliche Punkteanzahl" : examResultOverview.maximalNumberOfPoints,
                            "Note" : examResultOverview.grade,
                        };
                    });
                    this.setState({
                        examSetOverviewLoaded: true,
                        examSetOverviews: examResults,
                    })
                } else {
                    this.setState({
                        examSetOverviewLoaded: true,
                    })
                }
            })
            .catch(error => {

                console.log(error.data)
            })
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

const ExamOverview = connect(mapStateToProps, null)(ExamResultView)


export default withStyles(myStyles)(ExamOverview);