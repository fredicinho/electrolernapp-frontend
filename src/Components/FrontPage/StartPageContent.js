import React from "react";
import Button from "@material-ui/core/Button";
import Container from "@material-ui/core/Container";
import background from "../../images/backgroundImage.jpg"
import withStyles from "@material-ui/core/styles/withStyles";
import Box from '@material-ui/core/Box';


const styles = theme => ({
    root: {
        backgroundImage:  `url(${background})`,
        backgroundRepeat: 'no-repeat',
        backgroundSize: '100% auto',
    }
});

class StartPageContent extends React.Component {

    render() {
        const { classes } = this.props;
        return(
            <Box className={classes.root}
                display="flex"
                justifyContent="center"
                alignItems="center"
                minHeight="100vh"
            >
                    <Box width="auto" height="auto">
                        <Button variant="contained" color="primary"> Getting Started </Button>
                        <Button variant="contained" color="primary" href="/demo"> Demo </Button>
                    </Box>
            </Box>

        );
    }
}

export default withStyles(styles)(StartPageContent);