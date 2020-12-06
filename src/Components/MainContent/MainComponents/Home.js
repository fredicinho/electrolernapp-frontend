import React from 'react';
import "../../../CSS/Home.css"
import Box from "@material-ui/core/Box";
import Zoom from "react-reveal/Zoom";
import logo from "../../../images/logoBlue.png";
import background from "../../../images/backgroundBlue.jpg";
import hsluLogo from "../../../images/hsluLogo.png";
import electricity from "../../../images/electricity.png";
import withStyles from "@material-ui/core/styles/withStyles";
import Fade from "react-reveal/Fade";
import Typography from "@material-ui/core/Typography";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardMedia from "@material-ui/core/CardMedia";
import CardContent from "@material-ui/core/CardContent";
import CardActions from "@material-ui/core/CardActions";
import Button from "@material-ui/core/Button";
import Card from "@material-ui/core/Card";
import {Link} from "react-router-dom";

const styles = theme => ({
    rootCard: {
        maxWidth: 500,
        padding: theme.spacing(2),
    },
    media: {
        height: 140,
    },
    root: {
        marginTop: theme.spacing(8),
        display: 'flex',
        flexWrap: 'wrap',
        flexDirection: 'column',

},
    hslu: {
        marginTop: theme.spacing(8),
        color: "#03a9f4",
        fontFamily: 'Baloo Tamma',
        fontWeight: 'bold',
    },
});

class Home extends React.Component {

    render() {
        const {classes} = this.props;

        return (
            <main>
                <Box className={classes.root}
                     display="flex"
                     justifyContent="center"
                     alignItems="center"

                >
                    <Zoom>
                        <img src={logo} alt="Logo Brain Power"/>

                        <Typography className={classes.hslu} component="h1" variant="h4">
                            Gefördert von der Hochschule Luzern - Gebäudetechnik
                        </Typography>
                    </Zoom>
                </Box>
            </main>
        );
    }
}

export default withStyles(styles)(Home);