import React from 'react';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Container from '@material-ui/core/Container';
import withStyles from "@material-ui/core/styles/withStyles";
import AuthenticationService from "../../../Services/AuthService/AuthenticationRequests";
import {ValidatorForm, TextValidator} from 'react-material-ui-form-validator';
import Fade from "react-reveal/Fade";
import {Alert} from "react-bootstrap";


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

const initialState = {
    username: "",
    email: "",
    password: "",
    successful: false,
    message: "",
    repeatPassword: "",
    error: false,
}

class SignUp extends React.Component {
    constructor(props) {
        super(props);
        this.handleRegister = this.handleRegister.bind(this);
        this.onChangeUsername = this.onChangeUsername.bind(this);
        this.onChangeEmail = this.onChangeEmail.bind(this);
        this.onChangePassword = this.onChangePassword.bind(this);
        this.onChangeRepeatPassword = this.onChangeRepeatPassword.bind(this);

        this.state = {
            ...initialState,
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

        AuthenticationService.register(
            this.state.username,
            this.state.email,
            this.state.password,
        ).then(
            response => {
                console.log(response)
                if (response.status === 201) {
                    this.setState({
                        ...initialState,
                        message: 'Der Benutzer "' + this.state.username + '" wurde erfolgreich erstellt!',
                        successful: true
                    });
                } else {
                    this.setState({
                        successful: false,
                        message: "Es gab ein Problem beim Erstellen des Benutzers!",
                        error: true,
                        errorMessage: "Es gab ein Problem beim Erstellen des Benutzers!"
                    })
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
                if (error.response.status === 409) {
                    this.setState({
                        successful: false,
                        message: "Es existiert bereits ein Benutzer mit dieser E-Mail Adresse oder diesem Benutzernamen!",
                        error: true,
                        errorMessage: resMessage,
                    });
                } else {
                    this.setState({
                        successful: false,
                        message: resMessage,
                        error: true,
                        errorMessage: "Es gab ein Problem beim Erstellen des Benutzers!"
                    })
                }
            }
        );
    }


    render() {
        const {classes} = this.props;
        const {email, username, password, repeatPassword, error, errorMessage, successful, message} = this.state;

        return (
                <Container component="main" maxWidth="xs">
                    <Fade right>
                    <CssBaseline/>
                    <div className={classes.paper}>
                        <Avatar className={classes.avatar}>
                            <LockOutlinedIcon/>
                        </Avatar>
                        {error &&
                        <Alert variant="danger">
                            {message}
                        </Alert>
                        }
                        {successful &&
                        <Alert variant="info">
                            {message}
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
                    </div>
            </Fade>
                </Container>

        );
    }
}

export default withStyles(styles)(SignUp)