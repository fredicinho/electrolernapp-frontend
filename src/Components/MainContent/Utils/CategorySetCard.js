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
import mathImage from "../../../images/mathematics.png";

const myStyles = theme => ({
    root: {
        maxWidth: 500,
        padding: theme.spacing(2),
        minHeight: 200,
    },
    media: {
        height: 100,
    },
    title : {

    }
});

function mapDispatchToProps(dispatch) {
    return {
        selectQuiz: questions => dispatch(selectQuiz(questions))
    };
}

class CategorySetCard extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            redirect: false,
            image: null,
        }
        this.handleCategorySetStart = this.handleCategorySetStart.bind(this);
    }

    handleCategorySetStart(event) {
        const selectedQuiz = {
            selectedCategorySet: this.props.categorySet.title,
            urlOfQuestions: this.props.categorySet.links[1].href,
        }
        this.props.selectQuiz(selectedQuiz)
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
                    <CardActionArea onClick={this.handleCategorySetStart}>
                        <CardContent>
                            <Typography variant="h5" className={classes.title}>
                                {this.props.categorySet.title}
                            </Typography>
                            <Typography variant="body2" color="textSecondary" component="p">
                            </Typography>
                        </CardContent>
                    </CardActionArea>
                    <CardActions>
                        <Button size="small" color="primary" onClick={this.handleCategorySetStart}>
                            Übungsset starten
                        </Button>
                    </CardActions>
                </Card>
            );
        }
    }
}

const CategorySetCardDefault = connect(null, mapDispatchToProps)(CategorySetCard)

export default withStyles(myStyles)(CategorySetCardDefault);