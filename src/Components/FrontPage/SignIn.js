import React from 'react';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Link from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';
import withStyles from "@material-ui/core/styles/withStyles";
import AuthenticationService from "../../Services/AuthService/AuthenticationRequests";
import {TextValidator, ValidatorForm} from "react-material-ui-form-validator";
import Fade from 'react-reveal/Fade';
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
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
    backgroundColor: "#2979ff",
  },
});


class SignIn extends React.Component {
  constructor(props) {
    super(props);
    this.handleLogin = this.handleLogin.bind(this);
    this.onChangeUsername = this.onChangeUsername.bind(this);
    this.onChangePassword = this.onChangePassword.bind(this);

    this.state = {
      username: "",
      password: "",
      loading: false,
      message: "",
    };
  }

  onChangeUsername(e) {
    this.setState({
      username: e.target.value
    });
  }

  onChangePassword(e) {
    this.setState({
      password: e.target.value
    });
  }

  handleLogin(e) {
    e.preventDefault();

    this.setState({
      message: "",
      loading: true
    });


    if (this.props.examSignIn) {
      console.log("Signing in for Exam")
      console.log(this.props.examSetId)
      AuthenticationService.startExam(this.state.username, this.state.password, this.props.examSetId).then(
          () => {
            console.log("Received Response")
            this.props.onExamSignIn();
          }
      )
          .catch(function (error) {
            console.log(error);
            if (error.response.status === 500) {
              this.setState({
                loading: false,
                error: true,
                errorMessage: "Der Benutzername oder das Passwort ist falsch!"
              });

            // TODO: Make an Error Screen Component!!!
          }});
    } else {
      AuthenticationService.login(this.state.username, this.state.password).then(
          () => {
            this.props.history.push("/");
            window.location.reload();
          },
          error => {
            console.log(error)
            const resMessage =
                (error.response &&
                    error.response.data &&
                    error.response.data.message) ||
                error.message ||
                error.toString();
            if (error.response.status === 500) {
              this.setState({
                loading: false,
                message: resMessage,
                error: true,
                errorMessage: "Der Benutzername oder das Passwort ist falsch!"
              });
            }
          }
      );
    }
  }


  render() {
    const { classes } = this.props;
    const { username, password, error, errorMessage } = this.state;

    return (

        <Container component="main" maxWidth="xs">
          <Fade right>
          <CssBaseline />
          <div className={classes.paper}>
            <Avatar className={classes.avatar}>
              <LockOutlinedIcon />
            </Avatar>
            <Typography component="h1" variant="h5">
              Sign in
            </Typography>
            {error &&
              <Alert variant="danger">
              {errorMessage}
              </Alert>
            }
            <ValidatorForm
                className={classes.form}
                ref="form"
                onSubmit={this.handleLogin}
                onError={errors => console.log(errors)}
            >
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
              <FormControlLabel
                  control={<Checkbox value="remember" color="primary" />}
                  label="Remember me"
              />
              <Button
                  type="submit"
                  disabled={this.state.loading}
                  fullWidth
                  variant="contained"
                  color="primary"
                  className={classes.submit}
                  onClick={this.handleLogin}
              >
                Sign In
              </Button>
            </ValidatorForm>
            { !this.props.examSignIn &&
                <Grid container>
                  <Grid item xs>
                    <Link href="/resetpassword" variant="body2">
                      Forgot password?
                    </Link>
                  </Grid>
                  <Grid item>
                    <Link href="/register" variant="body2">
                      {"Don't have an account? Sign Up"}
                    </Link>
                  </Grid>
                </Grid>
            }
            { this.props.onExamSignIn &&
              <Button
                  fullWidth
                  variant="contained"
                  color="secondary"
                  className={classes.submit}
                  onClick={this.props.onGoBack}
              >
                Zurück
              </Button>

            }
          </div>
          </Fade>
        </Container>

    );
  }
}

SignIn.defaultProps = {
  examSignIn: false,
}

export default withStyles(styles)(SignIn);