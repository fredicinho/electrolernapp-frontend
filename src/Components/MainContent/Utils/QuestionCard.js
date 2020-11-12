import React from "react";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardMedia from "@material-ui/core/CardMedia";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";
import CardActions from "@material-ui/core/CardActions";
import Button from "@material-ui/core/Button";
import Card from "@material-ui/core/Card";
import withStyles from "@material-ui/core/styles/withStyles";
import {selectCategorySet} from "../../../Redux/Actions/categorySetActions";
import {connect} from "react-redux";
import {Redirect} from 'react-router';


const myStyles = theme => ({
    root: {
        maxWidth: 500,
        padding: theme.spacing(2),
    },
    media: {
        height: 140,
    },
});

class QuestionCard extends React.Component {

    constructor(props) {
        super(props);
        this.state = {}
    }


    render() {
        const {classes, question, addQuestion} = this.props;
        console.log("QuestionCard:: ")
        console.log(question)
        let possibleAnswers = [];
        question.possibleAnswers.map(possibleAnswer => {
            possibleAnswers.push(possibleAnswer.answerPhrase)
        });
        return (
            <Card className={classes.root}>
                <CardActionArea>
                    <CardMedia
                        className={classes.media}
                        // image={} TODO: With HATEOAS get imageLink
                    />
                    <CardContent>
                        <Typography gutterBottom variant="h5" component="h2">
                            {question.questionphrase}
                        </Typography>
                        <Typography variant="body2" color="textSecondary" component="p">
                        </Typography>
                    </CardContent>
                </CardActionArea>
                <CardActions>
                    <Button size="small" color="primary" onClick={addQuestion}>
                        Hinzufügen
                    </Button>
                </CardActions>
            </Card>
        );
    }
}


export default withStyles(myStyles)(QuestionCard);