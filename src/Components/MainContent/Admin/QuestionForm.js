import React from 'react';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import Link from '@material-ui/core/Link';
import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';
import withStyles from "@material-ui/core/styles/withStyles";
import AuthenticationService from "../../../Services/AuthService/AuthenticationRequests";
import Form from 'react-bootstrap/Form'
import Col from "react-bootstrap/Col";
import {Alert} from "react-bootstrap";
import ApiRequests, {urlTypes} from "../../../Services/AuthService/ApiRequests";
import Select from 'react-select';


export function Copyright() {
    return (
        <Typography variant="body2" color="textSecondary" align="center">
            {'Copyright © '}
            <Link color="inherit" href="https://material-ui.com/">
                Your Website
            </Link>{' '}
            {new Date().getFullYear()}
            {'.'}
        </Typography>
    );
}

const styles = theme => ({
    paper: {
        marginTop: theme.spacing(8),
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
    },
    avatar: {
        margin: theme.spacing(1),
        backgroundColor: "#2979ff",
    },
    form: {
        width: '100%', // Fix IE 11 issue.
        marginTop: theme.spacing(1),
    },
    submit: {
        margin: theme.spacing(3, 0, 2),
        backgroundColor: "#2979ff",
    },
});

export const questionType = [
    {
        key: 'mc',
        text: 'Multiple Choice',
        value: 'MC',
        // image: {avatar: true, src: '/images/avatar/small/jenny.jpg'},
    },
    {
        key: 'fb',
        text: 'Fachbegriff',
        value: 'FB',
        // image: {avatar: true, src: '/images/avatar/small/jenny.jpg'},
    },
];

const initialState = {
    questionPhrase: "",
    possibleAnswers: [],
    correctAnswers: [],
    loading: false,
    categorySetId: "",
    questionType: "MC",
    userId: "",
    questionImageId: "",
    answerImageId: "",
    pointsToAchieve: "",
    availableAnswerTextFields: 3,
    possiblePoints: 1,
    allCategorySets: null,
    error: null,
    answerError: false,
    answerErrorMessage: "",
    questionCreated: false,
    questionCreatedMessage: "",
}

class QuestionForm extends React.Component {
    constructor(props) {
        super(props);
        this.onAddAnswer = this.onAddAnswer.bind(this);
        this.onDeleteAnswer = this.onDeleteAnswer.bind(this);
        this.handleCategorySet = this.handleCategorySet.bind(this);
        this.handleQuestionPhrase = this.handleQuestionPhrase.bind(this);
        this.handleQuestionType = this.handleQuestionType.bind(this);
        this.handleAnswerPhrase = this.handleAnswerPhrase.bind(this);
        this.handlePoints = this.handlePoints.bind(this);
        this.handleCorrectAnswer = this.handleCorrectAnswer.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);

        this.state = {
            ...initialState
        };
    }

    componentDidMount() {
        ApiRequests.apiGetRequest(urlTypes.CATEGORYSET).then(
            response => {
                if (response.data !== undefined && response.data != 0) {
                    let allCategorySets = [];
                    response.data.map((categorySet) => {
                        allCategorySets.push({
                            value: categorySet.categorySetId,
                            label: categorySet.title
                        })
                    })

                    this.setState({
                        allCategorySets: allCategorySets
                    })
                    console.log(response.data)
                } else {
                    this.setState({
                        error: "No CategorySets found..."
                    })
                }
            }
        ).catch(function (error) {
            console.log(error);
        })
    }

    handleSubmit(e) {
        e.preventDefault();
        console.log(this.state)
        let possibleAnswers = [];
        let correctAnswers = [];
        for (let i = 1; i <= this.state.availableAnswerTextFields; i++) {
            possibleAnswers.push({
                answerPhrase: this.state.possibleAnswers["answer" + i]
            })
            if (this.state.correctAnswers["answer" + i]) {
                correctAnswers.push({
                    answerPhrase: this.state.possibleAnswers["answer" + i]
                });
            }
        }

        let newQuestion = {
            questionPhrase: this.state.questionPhrase,
            possibleAnswers: possibleAnswers,
            correctAnswers: correctAnswers,
            questionType: this.state.questionType,
            userId: AuthenticationService.getCurrentUser().id,
            statisticIds: [],
            categorySetIds: [this.state.categorySetId],
            questionImageId: null,
            answerImageId: null,
            pointsToAchieve: this.state.possiblePoints
        }
        console.log(newQuestion)
        ApiRequests.apiPostRequest(urlTypes.QUESTIONS, newQuestion)
            .then(result => {
                console.log(result)
                if (result.status === 200) {
                    this.setState({
                        ...initialState,
                        questionCreated: true,
                        questionCreatedMessage: "Die Frage :: " + result.data.questionPhrase + " :: wurde erfolgreich erstellt!",
                    });
                } else {
                    this.setState({
                        //error: "No data found for this CategorySet..."
                    })
                }
            })
            .catch( error => {
                if (error.response.status === 409) {
                    this.setState({
                        questionCreated: true,
                        questionCreatedMessage: "Die Frage :: " + error.response.data.questionPhrase + " :: existiert bereits!"
                    });
                }
                console.log(error.response)

            })
            .finally(function () {
            });
    }


    handleCorrectAnswer(e) {
        let new_state = Object.assign({}, this.state);
        let actualCorrectAnswers = new_state.correctAnswers;
        actualCorrectAnswers[e.target.id] = e.target.checked;
        this.setState({correctAnswers: actualCorrectAnswers});
    }

    handlePoints(e) {
        e.preventDefault()
        this.setState({
            possiblePoints: e.target.value,
        })
    }

    handleAnswerPhrase(e) {
        e.preventDefault();
        let new_state = Object.assign({}, this.state);
        let actualPossibleAnswers = new_state.possibleAnswers;
        actualPossibleAnswers[e.target.id] = e.target.value;
        this.setState({possibleAnswers: actualPossibleAnswers});
    }

    handleQuestionType(e) {
        e.preventDefault();
        let newQuestionType = null;
        switch (e.target.value) {
            case "Multiple Choice":
                newQuestionType = "MC";
                break;
            case "Fachbegriff":
                newQuestionType = "FB";
        }
        this.setState({
            questionType: newQuestionType,
        })
    }

    handleQuestionPhrase(e) {
        e.preventDefault();
        this.setState({
            questionPhrase: e.target.value,
        })
        console.log(this.state.questionPhrase)
    }

    handleCategorySet(e) {
        console.log(e)
        this.setState({
            categorySetId: e.value,
        })
    }

    onAddAnswer() {
        if (this.state.availableAnswerTextFields < 5) {
            this.setState(prevState => ({
                answerError: false,
                availableAnswerTextFields: prevState.availableAnswerTextFields + 1,
            }));
        } else {
            this.setState({
                answerError: true,
                answerErrorMessage: "Du kannst nicht mehr als 5 mögliche Antworten eingeben!"
            })
        }

    }

    onDeleteAnswer() {
        if (this.state.availableAnswerTextFields > 2) {
            this.setState(prevState => ({
                answerError: false,
                availableAnswerTextFields: prevState.availableAnswerTextFields - 1,
            }));
        } else {
            this.setState({
                answerError: true,
                answerErrorMessage: "Du musst mindestens 2 mögliche Antworten eingeben!"
            })
        }
    }

    render() {
        const {classes} = this.props;
        const {answerError, answerErrorMessage, questionCreated, questionCreatedMessage} = this.state;
        let correctAnswerCheckbox = [];
        for (let i = 1; i <= this.state.availableAnswerTextFields; i++) {
            let answerLabel = "Antwort Nr. " + i;
            correctAnswerCheckbox.push(<Form.Check type="checkbox" label={answerLabel} id={"correctAnswer" + i}/>);
        }

        return (
            <Container component="main" maxWidth="xl">
                <CssBaseline/>
                <div className={classes.paper}>
                    {questionCreated &&
                        <Alert variant="info">
                            {questionCreatedMessage}
                        </Alert>
                    }
                    <Typography component="h1" variant="h5">
                        Erstelle hier eine neue Frage
                    </Typography>
                    <Form onSubmit={this.handleSubmit}>
                        <Form.Group controlId="categorySet">
                            <Form.Label>Übungsset</Form.Label>
                            <Select
                                defaultValue={"Auswählen..."}
                                value={this.state.categorySetId.label}
                                onChange={this.handleCategorySet}
                                options={this.state.allCategorySets}
                            />
                        </Form.Group>
                        <Form.Group controlId="questionPhrase">
                            <Form.Label>Frage</Form.Label>
                            <Form.Control as="input" placeholder="Gib hier deine Frage ein"
                                          onChange={this.handleQuestionPhrase}/>
                        </Form.Group>
                        <Form.Group controlId="questionType">
                            <Form.Label>Fragetyp</Form.Label>
                            <Form.Control as="select" defaultValue="Multiple Choice" onChange={this.handleQuestionType}>
                                <option>Multiple Choice</option>
                                <option>Fachbegriff</option>
                            </Form.Control>
                        </Form.Group>
                        <Form.Group controlId={'answer1'}>
                            <Form.Label>Antwort Nr. 1</Form.Label>
                            <Form.Control as="input" placeholder={"Antwort Nr. 1"} onChange={this.handleAnswerPhrase}/>
                        </Form.Group>
                        <Form.Group controlId={'answer2'}>
                            <Form.Label>Antwort Nr. 2</Form.Label>
                            <Form.Control as="input" placeholder={"Antwort Nr. 2"} onChange={this.handleAnswerPhrase}/>
                        </Form.Group>
                        {this.state.availableAnswerTextFields >= 3 &&
                        <Form.Group controlId={'answer3'}>
                            <Form.Label>Antwort Nr. 3</Form.Label>
                            <Form.Control as="input" placeholder={"Antwort Nr. 3"} onChange={this.handleAnswerPhrase}/>
                        </Form.Group>
                        }
                        {this.state.availableAnswerTextFields >= 4 &&
                        <Form.Group controlId={'answer4'}>
                            <Form.Label>Antwort Nr. 4</Form.Label>
                            <Form.Control as="input" placeholder={"Antwort Nr. 4"} onChange={this.handleAnswerPhrase}/>
                        </Form.Group>
                        }
                        {this.state.availableAnswerTextFields >= 5 &&
                        <Form.Group controlId={'answer5'}>
                            <Form.Label>Antwort Nr. 5</Form.Label>
                            <Form.Control as="input" placeholder={"Antwort Nr. 5"} onChange={this.handleAnswerPhrase}/>
                        </Form.Group>
                        }
                        <Form.Row>
                            <Form.Group as={Col} controlId="formGridCity">
                                <Button variant="primary" type="button" onClick={this.onAddAnswer}>
                                    Weitere Antwortmöglichkeit hinzufügen
                                </Button>
                            </Form.Group>
                            <Form.Group as={Col} controlId="formGridCity">
                                <Button variant="primary" type="button" onClick={this.onDeleteAnswer}>
                                    Antwortmöglichkeit entfernen
                                </Button>
                            </Form.Group>
                        </Form.Row>
                        {answerError &&
                        <Alert variant="info">
                            {answerErrorMessage}
                        </Alert>
                        }
                        <Form.Group controlId="formBasicCheckbox">
                            <Form.Label>Korrekte Antwort(en)</Form.Label>
                            <Form.Check type="checkbox" label={"Antwort Nr. 1"} id={"answer1"}
                                        onChange={this.handleCorrectAnswer}/>
                            <Form.Check type="checkbox" label={"Antwort Nr. 2"} id={"answer2"}
                                        onChange={this.handleCorrectAnswer}/>
                            {this.state.availableAnswerTextFields >= 3 &&
                            <Form.Check type="checkbox" label={"Antwort Nr. 3"} id={"answer3"}
                                        onChange={this.handleCorrectAnswer}/>
                            }
                            {this.state.availableAnswerTextFields >= 4 &&
                            <Form.Check type="checkbox" label={"Antwort Nr. 4"} id={"answer4"}
                                        onChange={this.handleCorrectAnswer}/>
                            }
                            {this.state.availableAnswerTextFields >= 5 &&
                            <Form.Check type="checkbox" label={"Antwort Nr. 5"} id={"answer5"}
                                        onChange={this.handleCorrectAnswer}/>
                            }
                        </Form.Group>
                        <Form.Group controlId="possiblePoints">
                            <Form.Label>Mögliche erreichbare Punkteanzahl</Form.Label>
                            <Form.Control as="select" defaultValue="1" onChange={this.handlePoints}>
                                <option>1</option>
                                <option>2</option>
                                <option>3</option>
                                <option>4</option>
                            </Form.Control>
                        </Form.Group>
                        <Button variant="primary" type="submit">
                            Submit
                        </Button>
                    </Form>
                </div>
                <Box mt={8}>
                    <Copyright/>
                </Box>
            </Container>
        );
    }


}

export default withStyles(styles)(QuestionForm);