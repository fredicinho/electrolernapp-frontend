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

class SignUp extends React.Component {
    constructor(props) {
        super(props);
        this.handleRegister = this.handleRegister.bind(this);
        this.onChangeUsername = this.onChangeUsername.bind(this);
        this.onChangeEmail = this.onChangeEmail.bind(this);
        this.onChangePassword = this.onChangePassword.bind(this);
        this.onChangeRepeatPassword = this.onChangeRepeatPassword.bind(this);

        this.state = {
            username: "",
            email: "",
            password: "",
            successful: false,
            message: "",
            repeatPassword: "",
            error: false,
        };
    }

    componentDidMount() {
        // custom rule will have name 'isPasswordMatch'
        ValidatorForm.addValidationRule('isPasswordMatch', (value) => {
            if (value !== this.state.password) {
                return false;
            }
            return true;
        });
    }

    onChangeUsername(e) {
        this.setState({
            username: e.target.value
        });
    }

    onChangeEmail(e) {
        this.setState({
            email: e.target.value
        });
    }

    onChangePassword(e) {
        this.setState({
            password: e.target.value
        });
    }

    onChangeRepeatPassword(e) {
        this.setState({
            repeatPassword: e.target.value
        });
    }

    handleRegister(e) {
        e.preventDefault();

        this.setState({
            message: "",
            successful: false
        });

        console.log("Registering now")
        console.log(this.state.username, this.state.email, this.state.password)
        AuthenticationService.register(
            this.state.username,
            this.state.email,
            this.state.password,
        ).then(
            response => {
                this.setState({
                    message: response.data.message,
                    successful: true
                });
                this.props.history.push("/login");
                window.location.reload();
            },
            error => {
                console.log(error.response)
                const resMessage =
                    (error.response &&
                        error.response.data &&
                        error.response.data.message) ||
                    error.message ||
                    error.toString();
                if (error.response.status === 409) {
                    this.setState({
                        successful: false,
                        message: resMessage,
                        error: true,
                        errorMessage: "Es existiert bereits ein Benutzer mit dieser E-Mail Adresse oder diesem Benutzernamen!"
                    });
                }
            }
        );
    }


    render() {
        const {classes} = this.props;
        const {email, username, password, repeatPassword, error, errorMessage} = this.state;

        return (
                <Container component="main" maxWidth="xs">
                    <Fade right>
                    <CssBaseline/>
                    <div className={classes.paper}>
                        <Avatar className={classes.avatar}>
                            <LockOutlinedIcon/>
                        </Avatar>
                        <Typography component="h1" variant="h5">
                            Sign up
                        </Typography>
                        {error &&
                        <Alert variant="danger">
                            {errorMessage}
                        </Alert>
                        }
                        <ValidatorForm
                            className={classes.form}
                            ref="form"
                            onSubmit={this.handleRegister}
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
                                <Grid item xs={12}>
                                    <TextValidator
                                        fullWidth
                                        label="Benutzername"
                                        onChange={this.onChangeUsername}
                                        name="username"
                                        validators={['required']}
                                        errorMessages={['this field is required']}
                                        value={username}
                                    />
                                </Grid>
                                <Grid item xs={12}>
                                    <TextValidator
                                        fullWidth
                                        label="Passwort"
                                        onChange={this.onChangePassword}
                                        name="password"
                                        type="password"
                                        validators={['required']}
                                        errorMessages={['this field is required']}
                                        value={password}
                                    />
                                </Grid>
                                <Grid item xs={12}>
                                    <TextValidator
                                        fullWidth
                                        label="Passwort wiederholen"
                                        onChange={this.onChangeRepeatPassword}
                                        name="repeatPassword"
                                        type="password"
                                        validators={['isPasswordMatch', 'required']}
                                        errorMessages={['password mismatch', 'this field is required']}
                                        value={repeatPassword}
                                    />
                                </Grid>
                                <Button
                                    type="submit"
                                    fullWidth
                                    variant="contained"
                                    color="primary"
                                    className={classes.submit}
                                >
                                    Sign Up
                                </Button>
                            </Grid>
                        </ValidatorForm>
                        <Grid container justify="center">
                            <Grid item>
                                <Link href="/login" variant="body2">
                                    Already have an account? Sign in
                                </Link>
                            </Grid>
                        </Grid>
                    </div>
                    <Box mt={5}>
                        <Copyright/>
                    </Box>
            </Fade>
                </Container>

        );
    }
}

export default withStyles(styles)(SignUp)