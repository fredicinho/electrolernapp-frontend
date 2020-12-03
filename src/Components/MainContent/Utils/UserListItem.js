import React from 'react';
import {makeStyles} from '@material-ui/core/styles';
import ListSubheader from '@material-ui/core/ListSubheader';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import Collapse from '@material-ui/core/Collapse';
import InboxIcon from '@material-ui/icons/MoveToInbox';
import HelpOutlineIcon from '@material-ui/icons/HelpOutline';
import ExpandLess from '@material-ui/icons/ExpandLess';
import ExpandMore from '@material-ui/icons/ExpandMore';
import TextField from "@material-ui/core/TextField";
import ApiRequests, {urlTypes} from "../../../Services/AuthService/ApiRequests";
import {Alert} from "react-bootstrap";

const useStyles = makeStyles((theme) => ({
    root: {
        width: '100%',
        backgroundColor: theme.palette.background.paper,
    },
    nested: {
        paddingLeft: theme.spacing(4),
    },
    textField: {
        minWidth: '100px',
    },
}));


export default function UserItemList(props) {
    const classes = useStyles();
    const [errorAvailable, setErrorAvailable] = React.useState(false);
    const [errorMessage, setErrorMessage] = React.useState("");
    const [open, setOpen] = React.useState(false);

    const handleClick = () => {
        setOpen(!open);
    };

    const onChangePoints = (questionPhrase, examResult, e) => {
        e.preventDefault()
        console.log(examResult)
        let newExamResult = {
            questionId: examResult[0].questionId,
            pointsAchieved: parseInt(e.target.value),
            userId: examResult[0].studentId,
            examSetId: props.examSetId,

        }
        console.log("Sending following new ExamResult to ::" + urlTypes.EXAMRESULT);
        console.log(newExamResult);
        console.log(JSON.stringify(newExamResult))
        ApiRequests.apiPutRequest(urlTypes.EXAMRESULT, newExamResult)
            .then(result => {
                console.log("Response of Put of new ExamResult")
                console.log(result)
                if (result.status !== 200) {
                    setErrorAvailable(true);
                    setErrorMessage("There was a problem while changing the Points of the user " + examResult.username + " on the question " + questionPhrase);
                } else {
                    setErrorAvailable(false)
                }
            })
            .catch( error => {
                console.log(error)
                console.log(error.message)
                console.log(error.status)
                    setErrorAvailable(true);
                    setErrorMessage("There was a problem while changing the Points on the question " + questionPhrase);
            })
            .finally(function () {
            });
    }

    return (
        <List
            component="nav"
            aria-labelledby="nested-list-subheader"
            className={classes.root}
        >
            <ListItem button onClick={handleClick}>
                <ListItemIcon>
                    <InboxIcon/>
                </ListItemIcon>
                <ListItemText primary={props.user.username}/>
                {open ? <ExpandLess/> : <ExpandMore/>}
            </ListItem>
            {errorAvailable &&
            <Alert variant="danger">
                {errorMessage}
            </Alert>
            }
            <Collapse in={open} timeout="auto" unmountOnExit>
                <List component="div" disablePadding>
                    {props.questions.map((question) => {
                        let examResultOfQuestion = props.examResults.filter(examResult => examResult.questionId === question.id);
                        return (
                            <ListItem className={classes.nested}>
                                <ListItemIcon>
                                    <HelpOutlineIcon/>
                                </ListItemIcon>
                                <ListItemText primary={question.questionPhrase}/>
                                <TextField
                                    className={classes.textField}
                                    id={question.id}
                                    label="Punkte"
                                    type="number"
                                    defaultValue={examResultOfQuestion[0].pointsAchieved}
                                    InputLabelProps={{
                                        shrink: true,
                                    }}
                                    InputProps={{
                                        inputProps: {
                                            max: question.pointsToAchieve, min: 0
                                        }
                                    }}
                                    onChange={(e) => onChangePoints(question.questionPhrase, examResultOfQuestion, e)}
                                    variant="filled"
                                />
                            </ListItem>
                        );
                    })}
                </List>
            </Collapse>
        </List>
    );
}