import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import SchoolIcon from '@material-ui/icons/School';


const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
    },
    menuButton: {
        marginRight: theme.spacing(2),
    },
    mainTitle: {
        flexGrow: 3,
    },
    title: {
        flexGrow: 1,
    },
    navigationBarStyle: {
        backgroundColor: "#03a9f4",
    },
    link: {
        textDecoration: 'none',
        color: 'white',
        '&:hover': {
            textDecoration: 'none',
        }
    },
}));

export default function NavigationBar() {
    const classes = useStyles();

    return (
        <div className={classes.root}>
            <AppBar position="static" color="primary" className={classes.navigationBarStyle}>
                <Toolbar>
                    <IconButton href="/" edge="start" className={classes.menuButton} color="inherit" aria-label="menu">
                        <SchoolIcon />
                    </IconButton>
                    <Typography variant="h6" className={classes.title} >
                        <a className={classes.link} href="https://www.hslu.ch/de-ch/technik-architektur/studium/bachelor/gebaeudetechnik-energie/" target="_blank">
                            gefördert von der Hochschule Luzern - Gebäudetechnik
                        </a>
                    </Typography>
                    <Typography variant="h2" className={classes.mainTitle}>
                        Brain Power
                    </Typography>
                    <Button color="inherit" href="/login">Einloggen</Button>
                    <Button color="inherit" href="/register">Registrieren</Button>
                </Toolbar>
            </AppBar>
        </div>
    );
}