import React from 'react';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import Link from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';
import withStyles from "@material-ui/core/styles/withStyles";
import AuthenticationService from "../../Services/AuthService/AuthenticationRequests";
import {ValidatorForm, TextValidator} from 'react-material-ui-form-validator';
import Fade from "react-reveal/Fade";
import {Alert} from "react-bootstrap";


function Copyright() {
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
        height: '100vh',
    },
    avatar: {
        margin: theme.spacing(1),
        backgroundColor: "#2979ff",
    },
    form: {
        width: '100%', // Fix IE 11 issue.
        marginTop: theme.spacing(3),
    },
    submit: {
        margin: theme.spacing(3, 0, 2),
        backgroundColor: "#2979ff",
    },
});

class ResetPassword extends React.Component {
    constructor(props) {
        super(props);
        this.handlePasswordReset = this.handlePasswordReset.bind(this);
        this.onChangeEmail = this.onChangeEmail.bind(this);

        this.state = {
            email: "",
            successful: false,
            message: "",
            error: false,
        };
    }


    onChangeEmail(e) {
        this.setState({
            email: e.target.value
        });
    }

    handlePasswordReset(e) {
        e.preventDefault();
        console.log("Sending following email " + this.state.email)

        AuthenticationService.resetPassword(this.state.email)
            .then(
            response => {
                if (response.status === 200) {
                    this.setState({
                        message: 'Es wurde ein E-Mail an deine Adresse "' + this.state.email + '" gesendet um das Password zurückzusetzen!',
                        successful: true,
                        email: "",
                    });
                }
            },
            error => {
                console.log(error.response)
                const resMessage =
                    (error.response &&
                        error.response.data &&
                        error.response.data.message) ||
                    error.message ||
                    error.toString();
                    this.setState({
                        successful: false,
                        message: "Es gab ein Problem beim Zurücksetzen deines Passworts!",
                        error: true,
                    });
            }
        );
    }


    render() {
        const {classes} = this.props;
        const {email, error, message, successful} = this.state;

        return (
                <Container component="main" maxWidth="xs">
                    <Fade right>
                    <CssBaseline/>
                    <div className={classes.paper}>
                        <Avatar className={classes.avatar}>
                            <LockOutlinedIcon/>
                        </Avatar>
                        <Typography component="h1" variant="h5">
                            Reset Password
                        </Typography>
                        {error &&
                            <Alert variant="danger">
                                {message}
                            </Alert>
                        }
                        { successful &&
                            <Alert variant="info">
                                {message}
                            </Alert>
                        }
                        <ValidatorForm
                            className={classes.form}
                            ref="form"
                            onSubmit={this.handlePasswordReset}
                            onError={errors => console.log(errors)}
                        >
                            <Grid container spacing={2}>
                                <Grid item xs={12}>
                                    <TextValidator
                                        fullWidth
                                        label="Email"
                                        onChange={this.onChangeEmail}
                                        name="email"
                                        value={email}
                                        validators={['required', 'isEmail']}
                                        errorMessages={['this field is required', 'email is not valid']}
                                    />
                                </Grid>
                                <Button
                                    type="submit"
                                    fullWidth
                                    variant="contained"
                                    color="primary"
                                    className={classes.submit}
                                >
                                    Password zurücksetzen
                                </Button>
                            </Grid>
                        </ValidatorForm>
                    </div>
                    <Box mt={5}>
                        <Copyright/>
                    </Box>
            </Fade>
                </Container>

        );
    }
}

export default withStyles(styles)(ResetPassword)