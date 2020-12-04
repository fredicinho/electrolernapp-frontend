import React from 'react';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import Link from '@material-ui/core/Link';
import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';
import withStyles from "@material-ui/core/styles/withStyles";
import AuthenticationService from "../../../Services/AuthService/AuthenticationRequests";
import Form from 'react-bootstrap/Form'
import Col from "react-bootstrap/Col";
import {Alert} from "react-bootstrap";
import ApiRequests, {urlTypes} from "../../../Services/AuthService/ApiRequests";
import Select from 'react-select';
import Dropzone from "react-dropzone";
import DragAndDropCsv from "../Utils/DragAndDropCsv";


export function Copyright() {
    return (
        <Typography variant="body2" color="textSecondary" align="center">
            {'Copyright © '}
            <Link color="inherit" href="https://material-ui.com/">
                Your Website
            </Link>{' '}
            {new Date().getFullYear()}
            {'.'}
        </Typography>
    );
}

const styles = theme => ({
    paper: {
        marginTop: theme.spacing(8),
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
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

export const questionType = [
    {
        key: 'mc',
        text: 'Multiple Choice',
        value: 'MC',
        // image: {avatar: true, src: '/images/avatar/small/jenny.jpg'},
    },
    {
        key: 'fb',
        text: 'Fachbegriff',
        value: 'FB',
        // image: {avatar: true, src: '/images/avatar/small/jenny.jpg'},
    },
];

const initialState = {
    addedCsv: null,
    usersUploaded: false,
    error: "",
    usersUploadedMessage: "",
}

class ImportUsersForm extends React.Component {
    constructor(props) {
        super(props);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.onDrop = this.onDrop.bind(this);
        this.addedFile = this.addedFile.bind(this);

        this.state = {
            ...initialState
        };
    }

    handleSubmit(e) {
        e.preventDefault();
        console.log("State on submit::")
        console.log(this.state.addedCsv)
        if (this.state.addedCsv === null) {
            this.setState({
                usersUploaded: false,
                error: true,
                usersUploadedMessage: "Du musst zuerst eine CSV-Datei hinzufügen!",
            })
        } else {
            ApiRequests.apiPostFileRequest(urlTypes.CSVUSERS, this.state.addedCsv)
                .then(result => {
                    console.log("Result looks like that")
                    console.log(result.status)
                    console.log(result)
                    if (result.status === 200) {
                        this.setState({
                            ...initialState,
                            usersUploaded: true,
                            usersUploadedMessage: "Die CSV-Datei mit den neuen Benutzern wurde erfolgreich hochgeladen!",
                        });
                    } else {
                        console.log("Upload was not successful!");
                        console.log(result);
                    }
                })
                .catch(error => {
                    this.setState({
                        usersUploaded: false,
                        error: true,
                        usersUploadedMessage: "Die CSV-Datei mit den neuen Benutzern wurde erfolgreich hochgeladen!",
                    });
                    console.log(error.response)

                })
                .finally(function () {
                });
        }
    }

    onDrop(acceptedFiles) {
        console.log(acceptedFiles);
    }

    addedFile(acceptedFile) {
        if (acceptedFile != null) {
            this.setState({
                addedCsv: acceptedFile,
            })
        }

        console.log("Added csv")
        console.log(acceptedFile)

    }

    render() {
        const {classes} = this.props;
        const {usersUploaded, usersUploadedMessage, error} = this.state;

        return (
            <Container component="main" maxWidth="xl">
                <CssBaseline/>
                <div className={classes.paper}>
                    {usersUploaded &&
                    <Alert variant="info">
                        {usersUploadedMessage}
                    </Alert>
                    }
                    {error &&
                    <Alert variant="danger">
                        {usersUploadedMessage}
                    </Alert>
                    }
                    <Typography component="h1" variant="h5">
                        Füge hier eine CSV-Datei mit den zu erstellenden Benutzern hinzu! Die CSV-Datei muss folgendes Format aufweisen:
                    </Typography>
                    <Typography component="h3" variant="h5">
                        username,email,password,profession,role,schoolClassId
                    </Typography>
                    <Form onSubmit={this.handleSubmit}>
                        <DragAndDropCsv addedFile={this.addedFile}/>
                        <Button variant="primary" type="submit">
                            Submit
                        </Button>
                    </Form>
                </div>
                <Box mt={8}>
                    <Copyright/>
                </Box>
            </Container>
        );
    }


}

export default withStyles(styles)(ImportUsersForm);