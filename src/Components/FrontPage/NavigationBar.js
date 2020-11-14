import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import SchoolIcon from '@material-ui/icons/School';
import Zoom from 'react-reveal/Roll';



const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
    },
    menuButton: {
        color: 'white',
        fontWeight: 700,
    },
    mainTitle: {
        flexGrow: 2,
        alignItems: 'center',
    },
    title: {
        flexGrow: 1,
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
            <AppBar position="static" color="transparent">
                <Toolbar>
                    <IconButton href="/" edge="start" className={classes.menuButton} color="inherit" aria-label="menu">
                        <SchoolIcon />
                    </IconButton>
                    <Typography variant="h6" className={classes.title} >
                        <a className={classes.link} href="https://www.hslu.ch/de-ch/technik-architektur/studium/bachelor/gebaeudetechnik-energie/" target="_blank">
                            gefördert von der Hochschule Luzern - Gebäudetechnik
                        </a>
                    </Typography>
                    <Button className={classes.menuButton} href="/login">Einloggen</Button>
                    <Button className={classes.menuButton} href="/register">Registrieren</Button>
                </Toolbar>
            </AppBar>
        </div>
    );
}