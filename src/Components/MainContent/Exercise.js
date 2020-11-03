import React from "react";
import axios from 'axios';
import Loader from "./Loader";
import Quiz from "../Quiz/Quiz"
import ApiRequests, {urlTypes} from "../../Services/AuthService/ApiRequests";
import {connect} from "react-redux";


const mapStateToProps = state => {
    return {
        urlOfQuestions: state.quiz.urlOfQuestions,
        selectedCategorySet: state.quiz.selectedCategorySet,
    };
};

class Exercise extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            quizData: {},
            error: null,
            isLoaded: false,
        }
    }

    createQuizData(exerciseData) {
        console.log(exerciseData)
        let quizData = {
            "quizTitle": "React Quiz Component Demo",
            "quizSynopsis": "Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Donec quam felis, ultricies nec, pellentesque eu, pretium quis, sem. Nulla consequat massa quis enim",
            "questions": [],
        }
        exerciseData.forEach(data => {
            let answers = []
            if (data.possibleAnswers) {
                data.possibleAnswers.forEach(answer => {
                    answers.push(answer.answerPhrase)
                });
            }
            let questionImageUrl = "";
            data.links.forEach((link) => {
                if (link.rel === "questionImage") {
                    questionImageUrl = link.href;
                }
            })
            quizData.questions.push(
                {
                    "question": data.questionphrase,
                    "questionType": "text",
                    "questionPic": questionImageUrl, // checkquestion Objekt
                    "answerSelectionType": "single",
                    "answers": answers,
                    "correctAnswer": (this.giveIndexOfCorrectAnswer(data.possibleAnswers, data.correctAnswers) + 1),
                    "messageForCorrectAnswer": "Correct answer. Good job.",
                    "messageForIncorrectAnswer": "Incorrect answer. Please try again.",
                    "explanation": "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
                    "point": "20"
                },
            );
        });
        return quizData;
    }

    giveIndexOfCorrectAnswer(possibleAnswers, correctAnswers) {
        let indexes = []
        correctAnswers.map((answer) => {
            if (possibleAnswers.indexOf(answer)) {
                indexes.push(possibleAnswers.indexOf(answer))
            }
        });
        return indexes
    }

    componentDidMount() {
        console.log(this.props.urlOfQuestions)
        ApiRequests.apiGetRequest(this.props.urlOfQuestions)
            .then(result => {
                if (result.data !== undefined && result.data != 0) {
                    let quiz = this.createQuizData(result.data);
                    this.setState({
                        isLoaded: true,
                        quizData: quiz,
                    });
                } else {
                    this.setState({
                        error: "No data found for this CategorySet..."
                    })
                }

            })
            .catch(function (error) {
                console.log(error);
            })
            .finally(function () {
            });
    }


    render() {
        const {error, isLoaded, quizData} = this.state;
        if (error) {
            return <div>Error: {error}</div>;
        } else if (!isLoaded) {
            return <Loader/>
        } else {
            return (
                <React.Fragment>
                    <Quiz quiz={quizData}/>
                </React.Fragment>
            );
        }
    }
}

export const quiz1 = {
    "quizTitle": "React Quiz Component Demo",
    "quizSynopsis": "Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Donec quam felis, ultricies nec, pellentesque eu, pretium quis, sem. Nulla consequat massa quis enim",
    "questions": [
        {
            "question": "How can you access the state of a component from inside of a member function?",
            "questionType": "text",
            "questionPic": "https://dummyimage.com/600x400/000/fff&text=X", // if you need to display Picture in Question
            "answerSelectionType": "single",
            "answers": [
                "this.getState()",
                "this.prototype.stateValue",
                "this.state",
                "this.values"
            ],
            "correctAnswer": "3",
            "messageForCorrectAnswer": "Correct answer. Good job.",
            "messageForIncorrectAnswer": "Incorrect answer. Please try again.",
            "explanation": "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
            "point": "20"
        },
        {
            "question": "ReactJS is developed by _____?",
            "questionType": "text",
            "answerSelectionType": "single",
            "answers": [
                "Google Engineers",
                "Facebook Engineers"
            ],
            "correctAnswer": "2",
            "messageForCorrectAnswer": "Correct answer. Good job.",
            "messageForIncorrectAnswer": "Incorrect answer. Please try again.",
            "explanation": "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
            "point": "20"
        },
        {
            "question": "ReactJS is an MVC based framework?",
            "questionType": "text",
            "answerSelectionType": "single",
            "answers": [
                "True",
                "False"
            ],
            "correctAnswer": "2",
            "messageForCorrectAnswer": "Correct answer. Good job.",
            "messageForIncorrectAnswer": "Incorrect answer. Please try again.",
            "explanation": "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
            "point": "10"
        },
        {
            "question": "Which of the following concepts is/are key to ReactJS?",
            "questionType": "text",
            "answerSelectionType": "single",
            "answers": [
                "Component-oriented design",
                "Event delegation model",
                "Both of the above",
            ],
            "correctAnswer": "3",
            "messageForCorrectAnswer": "Correct answer. Good job.",
            "messageForIncorrectAnswer": "Incorrect answer. Please try again.",
            "explanation": "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
            "point": "30"
        },
        {
            "question": "Lorem ipsum dolor sit amet, consectetur adipiscing elit,",
            "questionType": "photo",
            "answerSelectionType": "single",
            "answers": [
                "https://dummyimage.com/600x400/000/fff&text=A",
                "https://dummyimage.com/600x400/000/fff&text=B",
                "https://dummyimage.com/600x400/000/fff&text=C",
                "https://dummyimage.com/600x400/000/fff&text=D"
            ],
            "correctAnswer": "1",
            "messageForCorrectAnswer": "Correct answer. Good job.",
            "messageForIncorrectAnswer": "Incorrect answer. Please try again.",
            "explanation": "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
            "point": "20"
        },
        {
            "question": "What are the advantages of React JS?",
            "questionType": "text",
            "answerSelectionType": "multiple",
            "answers": [
                "React can be used on client and as well as server side too",
                "Using React increases readability and makes maintainability easier. Component, Data patterns improves readability and thus makes it easier for manitaining larger apps",
                "React components have lifecycle events that fall into State/Property Updates",
                "React can be used with any other framework (Backbone.js, Angular.js) as it is only a view layer"
            ],
            "correctAnswer": [1, 2, 4],
            "messageForCorrectAnswer": "Correct answer. Good job.",
            "messageForIncorrectAnswer": "Incorrect answer. Please try again.",
            "explanation": "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
            "point": "20"
        },
    ]
}

const Exercises = connect(mapStateToProps, null)(Exercise)

export default Exercises;