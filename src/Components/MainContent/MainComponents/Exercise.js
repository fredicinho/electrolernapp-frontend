import React from "react";
import Loader from "../Utils/Loader";
import Quiz from "../../Quiz/Quiz"
import ApiRequests, {urlTypes} from "../../../Services/AuthService/ApiRequests";
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
            fetchedQuestions: null,
        }

        this.onCompleteAction = this.onCompleteAction.bind(this);
        this.checkIfArrayContainsAllValues = this.checkIfArrayContainsAllValues.bind(this);
        this.createQuizData = this.createQuizData.bind(this);
        this.getTypeOfQuestion = this.getTypeOfQuestion.bind(this);
        this.giveIndexesOfCorrectAnswers = this.giveIndexesOfCorrectAnswers.bind(this);

    }

    createQuizData(exerciseData) {
        let quizData = {
            "quizTitle": "React Quiz Component Demo",
            "quizSynopsis": "Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Donec quam felis, ultricies nec, pellentesque eu, pretium quis, sem. Nulla consequat massa quis enim",
            "questions": [],
        }
        exerciseData.forEach(data => {
            console.log("Question")
            console.log(data)
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
            const type = this.getTypeOfQuestion(data.correctAnswers)
            let correctAnswers = this.giveIndexesOfCorrectAnswers(data.possibleAnswers, data.correctAnswers)
            quizData.questions.push(
                {
                    "question": data.questionPhrase,
                    "questionType": "text",
                    "questionPic": questionImageUrl, // checkquestion Objekt
                    "answerSelectionType": type,
                    "answers": answers,
                    "correctAnswer": (this.checkTypeOfAnswers(correctAnswers, type)),
                    "messageForCorrectAnswer": "Correct answer. Good job.",
                    "messageForIncorrectAnswer": "Incorrect answer. Please try again.",
                    "explanation": "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
                    "point": "20"
                },
            );
        });
        return quizData;
    }

    onCompleteAction(result) {
        let statistics = [];
        result.userInput.map((userinput, index) => {
            const involvedQuestion = this.state.fetchedQuestions[index];
            const correctAnswers = this.giveIndexesOfCorrectAnswers(involvedQuestion.possibleAnswers, involvedQuestion.correctAnswers)
            let statistic = {
                pointsAchieved: null,
                isMarked: false,
                questionId: involvedQuestion.id,
            }
            if (Array.isArray(userinput)) {
                if (this.checkIfArrayContainsAllValues(correctAnswers, userinput)) {
                    statistic.pointsAchieved = involvedQuestion.pointsToAchieve;
                    statistics.push(statistic);
                } else {
                    statistic.pointsAchieved = 0;
                    statistics.push(statistic);
                }
            } else {
                if (correctAnswers.includes(userinput)) {
                    statistic.pointsAchieved = involvedQuestion.pointsToAchieve;
                    statistics.push(statistic);
                } else {
                    statistic.pointsAchieved = 0;
                    statistics.push(statistic);
                }
            }
        });

        console.log("Sending new Statistics")
        console.log(statistics)
        console.log(JSON.stringify(statistics))

        ApiRequests.apiPostRequest(urlTypes.STATISTICS, statistics)
            .then(result => {
                console.log(result)
                if (result.status === 200) {

                }
            })
            .catch( error => {
                console.log(error.response)
            })
            .finally(function () {
            });
    }

    checkIfArrayContainsAllValues(correctArray, target) {
        return target.every(v => correctArray.includes(v));
    }

    checkTypeOfAnswers(correctAnswers, type) {
        if (type === "single") {
            return correctAnswers[0].toString();
        } else {
            return correctAnswers;
        }
    }

    getIndexOfArray(arraytosearch, key, valuetosearch) {
        for (var i = 0; i < arraytosearch.length; i++) {
            if (arraytosearch[i][key] == valuetosearch) {
                return i;
            }
        }
        return null;
    }

    getTypeOfQuestion(correctAnswers) {
        if (correctAnswers.length <= 1) {
            return "single"
        } else {
            return "multiple"
        }
    }

    giveIndexesOfCorrectAnswers(possibleAnswers, correctAnswers) {
        let indexes = []
        correctAnswers.map((correctAnswer) => {
            if (possibleAnswers.some(answer => answer.id === correctAnswer.id)) {
                indexes.push(this.getIndexOfArray(possibleAnswers, 'id', correctAnswer.id) + 1)
            }
        });
        return indexes
    }

    componentDidMount() {
        ApiRequests.apiGetRequest(this.props.urlOfQuestions)
            .then(result => {
                if (result.data !== undefined && result.data != 0) {
                    let quiz = this.createQuizData(result.data);
                    this.setState({
                        isLoaded: true,
                        quizData: quiz,
                        fetchedQuestions: result.data,
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
            console.log("Loading quiz now")
            console.log(this.state.quizData)
            return (
                <React.Fragment>
                    <Quiz quiz={quizData} continueTillCorrect={false} onComplete={this.onCompleteAction}/>
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