import React from "react";
import withStyles from "@material-ui/core/styles/withStyles";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import Checkbox from "@material-ui/core/Checkbox";
import ListItemText from "@material-ui/core/ListItemText";


const myStyles = theme => ({
    rootContainer: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
    },

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
        console.log("New Value of question")
        console.log(value)
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
        return(
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
        );
    }
}

export default withStyles(myStyles)(QuizCore);