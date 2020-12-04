import React from "react";
import background from "../../images/backgroundBlue.jpg"
import withStyles from "@material-ui/core/styles/withStyles";
import Box from '@material-ui/core/Box';
import Zoom from 'react-reveal/Zoom';
import '../../CSS/NavigationBar.css';
import logo from "../../images/logoWhite.png"


const styles = theme => ({
    root: {
        backgroundImage: `url(${background})`,
        backgroundRepeat: 'no-repeat',
        backgroundSize: 'auto auto',
        backgroundPosition: 'center',
        flexDirection: 'column',
    },
});

class StartPageContent extends React.Component {

    render() {
        const {classes} = this.props;
        return (
                <Box className={classes.root}
                     display="flex"
                     justifyContent="center"
                     alignItems="center"
                     minHeight="100vh"
                >
                    <Zoom>
                        <img src={logo} alt="Logo Brain Power"/>

                    </Zoom>

                </Box>
        );
    }
}

export default withStyles(styles)(StartPageContent);

// <span className='transparent_btn transparent_btn.blue'>Probier eine Demo aus!</span>
