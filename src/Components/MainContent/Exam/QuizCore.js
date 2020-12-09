import React from "react";
import withStyles from "@material-ui/core/styles/withStyles";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import Checkbox from "@material-ui/core/Checkbox";
import ListItemText from "@material-ui/core/ListItemText";
import Container from "@material-ui/core/Container";
import Image from 'material-ui-image'



const myStyles = theme => ({
    rootContainer: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
    },
    image: {
        width: '50%'
    }

});

class QuizCore extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            checked: [...this.props.question.result.sendedAnswers],
        }
        this.handleToggle = this.handleToggle.bind(this);
    }

    handleToggle(value) {
        const { checked } = this.state;
        const currentIndex = checked.indexOf(value);
        const newChecked = [...checked];
        if (currentIndex === -1) {
            newChecked.push(value);
        } else {
            newChecked.splice(currentIndex, 1);
        }
        this.setState({
            checked: newChecked,
        })
        this.props.onChangeAnswer(newChecked, this.props.question.id);
    }

    render() {
        const {classes, question} = this.props;
        let imageAvailable = false;
        console.log("Question is ::")
        console.log(question)
        let questionAvailable = false;
        let questionImageUrl = "";
        question.links.forEach((link) => {
            if (link.rel === "questionImage") {
                questionImageUrl = link.href;
                questionAvailable = true;
            }
        });
        return(
            <Container maxWidth={"lg"}>
                { questionAvailable &&
                    <Image className={classes.image} src={questionImageUrl}/>
                }
                <List className={classes.root}>
                    {question.possibleAnswers.map((answer) => {
                        return (
                            <ListItem key={answer} role={undefined} dense button onClick={() => this.handleToggle(answer)}>
                                <ListItemIcon>
                                    <Checkbox
                                        edge="start"
                                        checked={this.state.checked.indexOf(answer) !== -1}
                                        tabIndex={-1}
                                        disableRipple
                                        inputProps={{ 'aria-labelledby': answer.id }}
                                    />
                                </ListItemIcon>
                                <ListItemText id={answer.id} primary={answer.answerPhrase} />
                            </ListItem>
                        );
                    })}
                </List>
            </Container>
        );
    }
}

export default withStyles(myStyles)(QuizCore);