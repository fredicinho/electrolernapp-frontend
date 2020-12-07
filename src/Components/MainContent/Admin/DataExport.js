import React from 'react';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';
import withStyles from "@material-ui/core/styles/withStyles";
import Fade from 'react-reveal/Fade';
import ApiRequests, {urlTypes} from "../../../Services/AuthService/ApiRequests";


const styles = theme => ({
    paper: {
        marginTop: theme.spacing(8),
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        height: '100vh',
    },
    avatar: {
        margin: theme.spacing(1),
        backgroundColor: "#2979ff",
    },
    form: {
        width: '100%', // Fix IE 11 issue.
        marginTop: theme.spacing(1),
    },
    submit: {
        margin: theme.spacing(3, 0, 2),
        backgroundColor: "#2979ff",
    },
});


class DataExport extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            questionLoading: false,
        }
        this.downloadExams = this.downloadExams.bind(this);
        this.downloadQuestions = this.downloadQuestions.bind(this);
        this.downloadUsers = this.downloadUsers.bind(this);
    }

    downloadQuestions() {
        window.open(urlTypes.API_URL + '/api/v1/csv/questions/export', '_blank');
    }

    downloadExams() {
        window.open(urlTypes.API_URL + '/api/v1/csv/examSets/export', '_blank');
    }

    downloadUsers() {
        window.open(urlTypes.API_URL + '/api/v1/csv/users/export', '_blank');
    }

    downloadExamResults() {
        window.open(urlTypes.API_URL + '/api/v1/csv/examResults/export', '_blank');
    }

    render() {
        const { classes } = this.props;
        return (
            <Container component="main" maxWidth="xs">
                <Fade right>
                    <CssBaseline />
                    <div className={classes.paper}>
                        <Typography component="h1" variant="h5">
                            Benutzer exportieren
                        </Typography>
                        <Button
                            fullWidth
                            variant="contained"
                            color="secondary"
                            className={classes.submit}
                            onClick={this.downloadUsers}
                        >
                            Herunterladen
                        </Button>
                        <Typography component="h1" variant="h5">
                            Fragen exportieren
                        </Typography>
                        <Button
                            fullWidth
                            disabled={this.state.questionLoading}
                            variant="contained"
                            color="secondary"
                            className={classes.submit}
                            onClick={this.downloadQuestions}
                        >
                            Herunterladen
                        </Button>
                        <Typography component="h1" variant="h5">
                            Prüfungen exportieren
                        </Typography>
                        <Button
                            fullWidth
                            variant="contained"
                            color="secondary"
                            className={classes.submit}
                            onClick={this.downloadExams}
                        >
                            Herunterladen
                        </Button>
                        <Typography component="h1" variant="h5">
                            Prüfungsresultate exportieren
                        </Typography>
                        <Button
                            fullWidth
                            variant="contained"
                            color="secondary"
                            className={classes.submit}
                            onClick={this.downloadExams}
                        >
                            Herunterladen
                        </Button>


                    </div>
                </Fade>
            </Container>

        );
    }
}

export default withStyles(styles)(DataExport);