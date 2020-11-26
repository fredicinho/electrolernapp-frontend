import React from 'react';
import {changeNavigationPage} from "../../../Redux/Actions/navigationActions";
import ApiRequests, {urlTypes} from "../../../Services/AuthService/ApiRequests";
import Loader from "../Utils/Loader";
import Grid from "@material-ui/core/Grid";
import {connect} from "react-redux";
import withStyles from "@material-ui/core/styles/withStyles";
import ExamCard from "../Utils/ExamCard";

const myStyles = theme => ({
    root: {
        flexGrow: 1,
    },
    paper: {
        padding: theme.spacing(2),
        textAlign: 'center',
        color: theme.palette.text.secondary,
    },

});

function mapDispatchToProps(dispatch) {
    return {
        changeNavigationPage: actualPage => dispatch(changeNavigationPage(actualPage))
    };
}

class ExamView extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            exams: [],
            isLoaded: false,
        }
    }

    componentDidMount() {
        ApiRequests.apiGetRequest(urlTypes.EXAMSET)
            .then(result => {
                console.log(result.data)
                this.setState({
                    isLoaded: true,
                    exams: result.data,
                });
            })
            .catch(function (error) {
                console.log(error);
                // TODO: Make an Error Screen Component!!!
            })
            .finally(function () {
            });
    }

    render() {
        const {error, isLoaded, exams} = this.state;
        const { classes } = this.props
        if (error) {
            return <div>Error: {error.message}</div>;
        } else if (!isLoaded) {
            return <Loader/>
        } else {
            let examItems = [];
            exams.map((exam) => {
                console.log("Exam looks like that ::")
                console.log(exam)
                examItems.push(
                    <Grid item xs={12} sm={6} md={4} lg={3} justify="space-around">
                        <ExamCard exam={exam}/>
                    </Grid>)
            });
            return (
                <div className={classes.root} justify="center">
                    <Grid container spacing={3}>
                        {examItems}
                    </Grid>
                </div>
            );
        }
    }
}
const ExamViewDefault = connect(null, mapDispatchToProps)(ExamView)

export default withStyles(myStyles)(ExamViewDefault);