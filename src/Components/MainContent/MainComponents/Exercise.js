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
            "quizTitle": this.props.selectedCategorySet,
            "quizSynopsis": "Bei diesem Quiz kannst du dein Wissen durch Multiple-Choice Fragen erweitern. Unterhalb der jeweiligen Fragen ist jeweils gelb markiert ob es sich um eine oder mehrere mögliche Antworten handelt, und violet markiert die Anzahl korrekter Antworten. Du erhälst immer sofort eine Rückmeldung und kannst in der Checkbox, welche sich danach jeweils unter den Antwortmöglichkeiten befindet, markieren damit du diese ein anderes Mal wiederholen kannst. Viel Spass!",
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
            console.log(data.id)
            quizData.questions.push(
                {
                    "question": data.questionPhrase,
                    "questionId": data.id,
                    "questionType": "text",
                    "questionPic": questionImageUrl, // checkquestion Objekt
                    "answerSelectionType": type,
                    "answers": answers,
                    "correctAnswer": (this.checkTypeOfAnswers(correctAnswers, type)),
                    "messageForCorrectAnswer": "Richtige Antwort! Gut gemacht!",
                    "messageForIncorrectAnswer": "Falsche Antwort... Versuche es nochmal!",
                    "explanation": "",
                    "point": data.pointsToAchieve.toString(),
                },
            );
        });
        return quizData;
    }

    onCompleteAction(result) {
        let markedQuestions = result.markedQuestions.filter((markedQuestion) => { return markedQuestion.value});
        let statistics = [];
        result.userInput.map((userinput, index) => {
            const involvedQuestion = this.state.fetchedQuestions[index];
            const correctAnswers = this.giveIndexesOfCorrectAnswers(involvedQuestion.possibleAnswers, involvedQuestion.correctAnswers);
            let isMarked = false;
            markedQuestions.map((markedQuestion) => {
                if (markedQuestion.questionId === involvedQuestion.id) {
                    isMarked = true;
                }
            });
            let statistic = {
                pointsAchieved: null,
                isMarked: isMarked,
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

        ApiRequests.apiPostRequest(urlTypes.POSTARRAYSTATISTIC, statistics)
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
            return (
                <React.Fragment>
                    <Quiz quiz={quizData} continueTillCorrect={false} onComplete={this.onCompleteAction} />
                </React.Fragment>
            );
        }
    }
}

const Exercises = connect(mapStateToProps, null)(Exercise)

export default Exercises;