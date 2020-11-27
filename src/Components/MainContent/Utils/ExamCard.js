import React from "react";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardMedia from "@material-ui/core/CardMedia";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";
import CardActions from "@material-ui/core/CardActions";
import Button from "@material-ui/core/Button";
import Card from "@material-ui/core/Card";
import withStyles from "@material-ui/core/styles/withStyles";
import {connect} from "react-redux";
import { Redirect } from 'react-router';
import {urlTypes} from "../../../Services/AuthService/ApiRequests";
import {selectExam, selectExamReview} from "../../../Redux/Actions/examActions";
import AuthenticationRequests from "../../../Services/AuthService/AuthenticationRequests";


const myStyles = theme => ({
    root: {
        maxWidth: 500,
        padding: theme.spacing(2),
    },
    media: {
        height: 140,
    },
});

function mapDispatchToProps(dispatch) {
    return {
        selectExam: exam => dispatch(selectExam(exam)),
        selectExamReview: exam => dispatch(selectExamReview(exam)),
    };
}

class ExamCard extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            redirectToExam: false,
            redirectToExamReview: false,
        }
        this.handleToggleForExam = this.handleToggleForExam.bind(this);
        this.handleToggleForExamReview = this.handleToggleForExamReview.bind(this);
    }

    handleToggleForExam(event) {
        event.preventDefault();
        const selectedExam = {
            selectedExamTitle: this.props.exam.title,
            selectedExamId: this.props.exam.examSetId,
            selectedExamUrl: urlTypes.EXAMSET + this.props.exam.examSetId,
        }
        this.props.selectExam(selectedExam)
        this.setState({redirectToExam: true});
    }

    handleToggleForExamReview(event) {
        event.preventDefault();
        const selectedExamToReview = {
            selectedExamTitle: this.props.exam.title,
            selectedExamId: this.props.exam.examSetId,
            urlOfClassesInExam: this.props.exam.links[1].href,
        }
        this.props.selectExamReview(selectedExamToReview);
        this.setState({redirectToExamReview: true})
    }


    render() {
        const { classes, exam } = this.props;
        if (this.state.redirectToExam) {
            return <Redirect push to="/exam" />;
        } else if (this.state.redirectToExamReview) {
            return <Redirect push to="/reviseexam"/>
        } else {
            return (
                <Card className={classes.root}>
                    <CardActionArea>
                        <CardMedia
                            className={classes.media}
                            //image="/static/images/cards/contemplative-reptile.jpg"
                            title={exam.title}
                        />
                        <CardContent>
                            <Typography gutterBottom variant="h5" component="h2">
                                {exam.title}
                            </Typography>
                            <Typography variant="body2" color="textSecondary" component="p">
                                {exam.startDate} - {exam.endDate}
                            </Typography>
                        </CardContent>
                    </CardActionArea>
                    <CardActions>
                        <Button size="small" color="primary" onClick={this.handleToggleForExam}>
                            Zur Prüfung
                        </Button>
                        { (AuthenticationRequests.isAdmin() || AuthenticationRequests.isTeacher()) &&
                            <Button size="small" color="primary" onClick={this.handleToggleForExamReview}>
                                Prüfung auswerten
                            </Button>
                        }
                    </CardActions>
                </Card>
            );
        }
    }


}

const ExamCardView = connect(null, mapDispatchToProps)(ExamCard)

export default withStyles(myStyles)(ExamCardView);