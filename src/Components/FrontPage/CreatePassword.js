import React from 'react';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
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
import {withRouter} from "react-router";


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

class CreatePassword extends React.Component {
    constructor(props) {
        super(props);
        this.handleRegister = this.handleRegister.bind(this);
        this.onChangePassword = this.onChangePassword.bind(this);
        this.onChangeRepeatPassword = this.onChangeRepeatPassword.bind(this);

        this.state = {
            password: "",
            successful: false,
            message: "",
            repeatPassword: "",
            error: false,
            resetToken: props.match.params.token,
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

        AuthenticationService.createNewPassword(
            this.state.password,
            this.state.resetToken,
        ).then(
            response => {
                if (response.status === 200) {
                    this.setState({
                        message: "Dein Passwort wurde erfolgreich zurückgesetzt!",
                        successful: true,
                        password: "",
                        repeatPassword: "",
                    });
                } else {
                    console.log("Response with different status")
                    console.log(response.status)
                    this.setState({
                        message: "Irgendetwas ist schiefgelaufen...",
                        error: true,
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
                this.setState({
                    successful: false,
                    message: "Das Password konnte nicht zurückgesetzt werden. Versuche nochmal den Link auf dem Mail aufzurufen...",
                    error: true,
                    errorMessage: resMessage,
                });

            }
        );
    }


    render() {
        const {classes} = this.props;
        const {password, repeatPassword, error, message, successful} = this.state;

        return (
            <Container component="main" maxWidth="xs">
                <Fade right>
                    <CssBaseline/>
                    <div className={classes.paper}>
                        <Avatar className={classes.avatar}>
                            <LockOutlinedIcon/>
                        </Avatar>
                        <Typography component="h1" variant="h5">
                            New Password
                        </Typography>
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
                                    Neues Password absenden
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

export default withStyles(styles)(withRouter(CreatePassword));