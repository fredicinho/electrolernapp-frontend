import React from "react";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardMedia from "@material-ui/core/CardMedia";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";
import CardActions from "@material-ui/core/CardActions";
import Button from "@material-ui/core/Button";
import Card from "@material-ui/core/Card";
import withStyles from "@material-ui/core/styles/withStyles";
import {connect} from "react-redux";
import {selectQuiz} from "../../../Redux/Actions/quizActions";
import {Redirect} from "react-router";

const myStyles = theme => ({
    root: {
        maxWidth: 500,
        padding: theme.spacing(2),
    },
    media: {
        height: 140,
    },
});

function mapDispatchToProps(dispatch) {
    return {
        selectClassOfExam: students => dispatch(selectClassOfExam(students))
    };
}

class SchoolClassCard extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            redirect: false
        }
        this.handleSelectedSchoolClass = this.handleSelectedSchoolClass.bind(this);
    }

    handleSelectedSchoolClass(event) {
        const selectedClass = {
            selectedSchooClass: this.props.schoolClass.title,
            urlOfSchoolClass: this.props.schoolClass.links[0].href,
            urlOfStudentsOfClass: this.props.schoolClass.links[1].href,
        }
        this.props.selectClassOfExam(selectedClass)
        this.setState({redirect: true});
        event.preventDefault();
    }

    render() {
        const { classes } = this.props;

        if (this.state.redirect) {
            return <Redirect push to="/exercises" />;
        } else {
            return (
                <Card className={classes.root}>
                    <CardActionArea>
                        <CardMedia
                            className={classes.media}
                            //image="/static/images/cards/contemplative-reptile.jpg"
                            title="Contemplative Reptile"
                        />
                        <CardContent>
                            <Typography gutterBottom variant="h5" component="h2">
                                {this.props.schoolClass.title}
                            </Typography>
                            <Typography variant="body2" color="textSecondary" component="p">
                                Lizards are a widespread group of squamate reptiles, with over 6,000 species, ranging
                                across all continents except Antarctica
                            </Typography>
                        </CardContent>
                    </CardActionArea>
                    <CardActions>
                        <Button size="small" color="primary" onClick={this.handleCategorySetStart}>
                            ??bungsset starten
                        </Button>
                        <Button size="small" color="primary">
                            Learn More
                        </Button>
                    </CardActions>
                </Card>
            );
        }
    }
}

const SchoolClassCardDefault = connect(null, mapDispatchToProps)(SchoolClassCard)

export default withStyles(myStyles)(SchoolClassCardDefault);