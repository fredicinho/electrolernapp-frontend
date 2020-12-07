import React from 'react';
import CssBaseline from '@material-ui/core/CssBaseline';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';
import withStyles from "@material-ui/core/styles/withStyles";
import Fade from 'react-reveal/Fade';
import AuthenticationRequests from "../../../Services/AuthService/AuthenticationRequests";
import AccountCircle from "@material-ui/icons/AccountCircle";



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


class MyProfile extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            userDataLoaded: false,
            userData: AuthenticationRequests.getCurrentUser(),
        }
    }

    render() {
        const { classes } = this.props;
        const { userData } = this.state;

        return (

            <Container component="main" maxWidth="xs">
                <Fade right>
                    <CssBaseline />
                    <div className={classes.paper}>
                        <AccountCircle fontSize="large"/>
                        <Typography component="h3" variant="h5">
                            Benutzername: {userData.username}
                        </Typography>
                        <Typography component="h3" variant="h5">
                            E-Mail: {userData.email}
                        </Typography>
                    </div>
                </Fade>
            </Container>

        );
    }
}

export default withStyles(styles)(MyProfile);