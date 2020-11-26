import React from "react";
import ApiRequests, {urlTypes} from "../../../Services/AuthService/ApiRequests";
import Loader from "../Utils/Loader";
import Container from "@material-ui/core/Container";
import withStyles from "@material-ui/core/styles/withStyles";
import QuizStartPage from "./QuizStartPage";
import AuthenticationRequests from "../../../Services/AuthService/AuthenticationRequests";
import VerticalTab from "./VerticalTab";
import {connect} from "react-redux";

const initialState = {
    exam: null,
    questions: [],
    isLoaded: false,
    actualQuestionId: null,
    questionsAnswered: [],
    quizStarted: false,
    quizUrl: "",
    quizDataLoaded: false,
    examFinished: false,
}

const myStyles = theme => ({
    rootContainer: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
    },

});

const mapStateToProps = state => {
    return {
        urlOfExam: state.exam.selectedExamUrl,
        examSetId: state.exam.selectedExamId,
    };
};

class Quiz extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            ...initialState,
        }
        this.handleQuizStart = this.handleQuizStart.bind(this);
        this.prepareQuestions = this.prepareQuestions.bind(this);
        this.changeQuestion = this.changeQuestion.bind(this);
        this.loadQuizData = this.loadQuizData.bind(this);
        this.getActualQuestion = this.getActualQuestion.bind(this);
        this.changeSelectedAnswers = this.changeSelectedAnswers.bind(this);
        this.signOutOfExam = this.signOutOfExam.bind(this);
    }

    componentDidMount() {
        ApiRequests.apiGetRequest(this.props.urlOfExam)
            .then(result => {
                if (result.data !== undefined && result.data != 0) {
                    console.log("Exam received of Reducer url :: ")
                    console.log(result.data)
                    this.setState({
                        isLoaded: true,
                        examData: result.data,
                        quizUrl: result.data._links.questionsInExamSet.href,
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

    signOutOfExam() {
        AuthenticationRequests.endExam(this.props.examSetId).then((response) => {
            if (response.status === 200) {
                this.setState({
                    examFinished: true,
                })
            }
        });
        // TODO: Make Exam Finished Page Component
    }

    changeSelectedAnswers(selectedAnswers) {
        console.log(selectedAnswers)
        const { questions } = this.state;
        const actualQuestion = this.getActualQuestion();
        for (let question of questions) {
            if (question.id === actualQuestion.id) {
                question.result.sendedAnswers = selectedAnswers;
                break;
            }
        }
        this.setState({
            questions: questions,
        })
        console.log("Answers are set::")
        console.log(this.getActualQuestion())
    }

    loadQuizData() {
        ApiRequests.apiGetRequest(this.state.quizUrl)
            .then(result => {
                if (result.data !== undefined && result.data != 0) {
                    const examQuestions  = this.prepareQuestions(result.data);
                    this.setState({
                        quizDataLoaded: true,
                        questions: examQuestions,
                        actualQuestionId: examQuestions[0].id,
                    });
                } else {
                    console.log("No Questions found for this Exam!!!");
                }
            })
            .catch(function (error) {
                console.log(error);
            })
            .finally(function () {
            });
    }

    prepareQuestions(questions) {
        const examQuestions = [];
        questions.map((question) => {
            examQuestions.push({
                id: question.id,
                alreadyUploaded: false,
                questionPhrase: question.questionPhrase,
                possibleAnswers: question.possibleAnswers, // contains "answerPhrase", "id", and "links" which are empty
                questionType: question.questionType,
                pointsToAchieve: question.pointsToAchieve,
                links: question.links,
                result: {
                    userId: AuthenticationRequests.getCurrentUser().id,
                    questionId: question.id,
                    examSetId: this.state.examData.examSetId,
                    sendedAnswers: [],
                }
            });
        });
        return examQuestions;
    }

    handleQuizStart() {
        this.loadQuizData();
        this.setState({
            quizStarted: !this.state.quizStarted,
        })
    }

    getActualQuestion() {
        let actualQuestion;
        this.state.questions.map((question) => {
            if (question.id === this.state.actualQuestionId) {
                actualQuestion = question;
            }
        })
        return actualQuestion;
    }

    changeQuestion(questionId) {
        this.setState({
            actualQuestionId: questionId,
        })
    }

    render() {
        const { quizStarted, isLoaded, quizDataLoaded, questions } = this.state;
        const { classes } = this.props;

        if (isLoaded) {
            return (
                <Container maxWidth={"lg"} className={classes.rootContainer}>
                    {quizStarted && quizDataLoaded &&
                    <VerticalTab
                        questions={questions}
                        onChangeAnswer={this.changeSelectedAnswers}
                        sendActualAnswers={this.sendActualAnswers}
                        examData={this.state.examData}
                        signOutOfExam={this.signOutOfExam}/>
                    }
                    {quizStarted && !quizDataLoaded &&
                        <Container className={classes.rootContainer}>
                            <Loader/>
                        </Container>
                    }
                    {!quizStarted &&
                        <QuizStartPage examData={this.state.examData} startQuiz={this.handleQuizStart}/>
                    }
                </Container>
            );
        } else {
            return(
                <Container className={classes.rootContainer}>
                    <Loader/>
                </Container>
            );
        }


    }
}

const Exam = connect(mapStateToProps, null)(Quiz)


export default withStyles(myStyles)(Exam);
