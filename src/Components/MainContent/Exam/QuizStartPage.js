import React from 'react';
import clsx from 'clsx';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardMedia from '@material-ui/core/CardMedia';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import Collapse from '@material-ui/core/Collapse';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import {red} from '@material-ui/core/colors';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import logo from "../../../images/logoBlue.png"
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import withStyles from "@material-ui/core/styles/withStyles";
import moment from "moment";
import Popup from "./Popup";

const myStyles = theme => ({
    root: {
        maxWidth: 'auto',
        maxHeigth: 'auto',
    },
    media: {
        height: '50%',
        paddingTop: '56.25%', // 16:9
    },
    expand: {
        transform: 'rotate(0deg)',
        marginLeft: 'auto',
        transition: theme.transitions.create('transform', {
            duration: theme.transitions.duration.shortest,
        }),
    },
    expandOpen: {
        transform: 'rotate(180deg)',
    },
    avatar: {
        backgroundColor: red[500],
    },
});

class QuizStartPage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            expanded: false,
            showAuthenticateScreen: false,
        }
        this.handleExpandClick = this.handleExpandClick.bind(this);
        this.handleAuthenticate = this.handleAuthenticate.bind(this);
        this.handleClosePopup = this.handleClosePopup.bind(this);
    }

    handleExpandClick() {
        this.setState({
            expanded: !this.state.expanded,
        })
    };

    handleClosePopup() {
        this.setState({
            showAuthenticateScreen: !this.state.showAuthenticateScreen,
        });
    }

    handleAuthenticate() {
        this.props.startQuiz();
    }

    render() {

        const {classes} = this.props;
        console.log(this.props.examData)
        const examTime = moment(this.props.examData.startDate).format('LLLL') + " - " + moment(this.props.examData.endDate).format('LT')
        let examIsActive = false;
        if (moment() >= moment(this.props.examData.startDate) && moment() <= moment(this.props.examData.endDate)) {
            examIsActive = true;
        }
        return (
            <div>
                { this.state.showAuthenticateScreen &&
                <Popup
                    closePopup={this.handleClosePopup}
                    authenticate={this.handleAuthenticate}
                    examSetId={this.props.examData.examSetId}
                />
                }
                <Card className={classes.root}>
                    <CardHeader
                        title={this.props.examData.title}
                        subheader={examTime}
                    />
                    <CardMedia
                        className={classes.media}
                        image={logo}
                        title="Paella dish"
                    />
                    <CardContent>
                    </CardContent>
                    <CardActions disableSpacing>
                        <Button variant="contained" color="primary" disabled={!examIsActive} onClick={this.handleClosePopup}>
                            Pr??fung starten
                        </Button>
                        <IconButton
                            className={clsx(classes.expand, {
                                [classes.expandOpen]: this.state.expanded,
                            })}
                            onClick={this.handleExpandClick}
                            aria-expanded={this.state.expanded}
                            aria-label="show more"
                        >
                            <ExpandMoreIcon/>
                        </IconButton>
                    </CardActions>
                    <Collapse in={this.state.expanded} timeout="auto" unmountOnExit>
                        <CardContent>
                            <Typography paragraph>Method:</Typography>
                            <Typography paragraph>
                                Pr??fungsbestimmungen kommen hier hin....
                            </Typography>
                            <Typography paragraph>
                                Heat oil in a (14- to 16-inch) paella pan or a large, deep skillet over medium-high
                                heat. Add chicken, shrimp and chorizo, and cook, stirring occasionally until lightly
                                browned, 6 to 8 minutes. Transfer shrimp to a large plate and set aside, leaving chicken
                                and chorizo in the pan. Add piment??n, bay leaves, garlic, tomatoes, onion, salt and
                                pepper, and cook, stirring often until thickened and fragrant, about 10 minutes. Add
                                saffron broth and remaining 4 1/2 cups chicken broth; bring to a boil.
                            </Typography>
                            <Typography paragraph>
                                Add rice and stir very gently to distribute. Top with artichokes and peppers, and cook
                                without stirring, until most of the liquid is absorbed, 15 to 18 minutes. Reduce heat to
                                medium-low, add reserved shrimp and mussels, tucking them down into the rice, and cook
                                again without stirring, until mussels have opened and rice is just tender, 5 to 7
                                minutes more. (Discard any mussels that don???t open.)
                            </Typography>
                            <Typography>
                                Set aside off of the heat to let rest for 10 minutes, and then serve.
                            </Typography>
                        </CardContent>
                    </Collapse>
                </Card>
            </div>

        );

    }
}

export default withStyles(myStyles)(QuizStartPage);