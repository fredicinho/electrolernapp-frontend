import React from 'react';
import ApiRequests, {urlTypes} from "../../../Services/AuthService/ApiRequests";
import Loader from "../Utils/Loader";
import {connect} from "react-redux";
import withStyles from "@material-ui/core/styles/withStyles";
import Select from "react-select";
import makeAnimated from "react-select/animated/dist/react-select.esm";
import CssBaseline from "@material-ui/core/CssBaseline";
import Container from "@material-ui/core/Container";
import UserItemList from "../Utils/UserListItem";


const animatedComponents = makeAnimated();

const myStyles = theme => ({
    root: {
        flexGrow: 1,
    },
    paper: {
        padding: theme.spacing(2),
        textAlign: 'center',
        color: theme.palette.text.secondary,
    },

});

const mapStateToProps = state => {
    return {
        urlOfClassesInExam: state.exam.urlOfClassesInExam,
        urlOfQuestionsInExam: state.exam.urlOfQuestionsInExam,
        selectedExamId: state.exam.selectedExamId,
    };
};

class ReviseExam extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            isLoaded: false,
            schoolClasses: null,
            students: [],
            questionsLoaded: false,
            questions: [],
            examResults: [],
            examResultsFetched: false,
            studentsFetched: false,
        }

        this.handleSchoolClass = this.handleSchoolClass.bind(this);
        this.getClassesOfExam = this.getClassesOfExam.bind(this);
        this.getQuestionsOfExam = this.getQuestionsOfExam.bind(this);
        this.getAllExamResults = this.getAllExamResults.bind(this);
        this.getStudentsOfClass = this.getStudentsOfClass.bind(this);
        this.createExamResultObjects = this.createExamResultObjects.bind(this);

    }

    componentDidMount() {
        this.getClassesOfExam();
        this.getQuestionsOfExam();
    }

    getQuestionsOfExam() {
        ApiRequests.apiGetRequest(this.props.urlOfQuestionsInExam)
            .then(result => {
                this.setState({
                    questionsLoaded: true,
                    questions: result.data,
                });
            })
            .catch(function (error) {
                console.log(error);
                // TODO: Make an Error Screen Component!!!
            })
            .finally(function () {
            });
    }

    getClassesOfExam() {
      ApiRequests.apiGetRequest(this.props.urlOfClassesInExam)
            .then(result => {
                let allSchoolClasses = [];
                result.data.map((schoolClass) => {
                    allSchoolClasses.push({
                        value: schoolClass.id,
                        label: schoolClass.name,
                    })
                });
                this.setState({
                    isLoaded: true,
                    schoolClasses: allSchoolClasses,
                });
            })
            .catch(function (error) {
                console.log(error);
                // TODO: Make an Error Screen Component!!!
            })
            .finally(function () {
            });
    }

    getStudentsOfClass(schoolClassId) {
        ApiRequests.apiGetRequest(urlTypes.USERS + "schoolClasses?schoolClassId=" + schoolClassId).then(
            response => {
                if (response.data !== undefined && response.data != 0) {
                    this.setState({
                        students: response.data,
                        studentsFetched: true,
                    })
                } else {
                    this.setState({
                        error: "No Students found..."
                    })
                }
            }
        ).catch(function (error) {
            console.log(error);
        })
    }

    getAllExamResults(schoolClassId, examSetId) {
        console.log(urlTypes.EXAMRESULT + "examSetsAndSchoolClass?examSetId=" + examSetId + "&schoolClassId=" + schoolClassId)
        ApiRequests.apiGetRequest(urlTypes.EXAMRESULT + "examSetsAndSchoolClass?examSetId=" + examSetId + "&schoolClassId=" + schoolClassId).then(
            response => {
                if (response.data !== undefined && response.data != 0) {
                    console.log("Received ExamResults")
                    console.log(response.data)

                    this.setState({
                        examResults: response.data,
                        examResultsFetched: true,
                    })
                } else {
                    this.setState({
                        error: "No ExamResultsFound found..."
                    })
                }
            }
        ).catch(function (error) {
            console.log(error);
        })
    }

    handleSchoolClass(e) {
        this.getStudentsOfClass(e.value);
        this.getAllExamResults(e.value, this.props.selectedExamId);
    }

    createExamResultObjects() {
        const { examResults, questions, students } = this.state;
        let newExamResults = [];
        students.map((student) => {
            let filteredExamResults = examResults.filter((examResult) => examResult.username === student.username)
            questions.map((question) => {
                let newExamResult = {
                    studentId: student.id,
                    questionId: question.id,
                    pointsAchieved: null,
                }
                filteredExamResults.map((examResult) => {
                    if (examResult.questionId === question.id) {
                        newExamResult.pointsAchieved = examResult.pointsAchieved
                    }
                })
                if (newExamResult.pointsAchieved === null) {
                    newExamResult.pointsAchieved = 0;
                }
                newExamResults.push(newExamResult);
            })
        });
        return newExamResults;
    }

    render() {
        const {error, isLoaded, schoolClasses, students, questions, examResultsFetched, studentsFetched} = this.state;
        const {classes} = this.props
        if (error) {
            return <div>Error: {error.message}</div>;
        } else if (!isLoaded) {
            return <Loader/>
        } else {
            let studentList = [];
            if (examResultsFetched && studentsFetched) {
                let newExamResults = this.createExamResultObjects();
                students.map((student) => {
                    let filteredExamResults = newExamResults.filter((examResult) => student.id === examResult.studentId)
                    studentList.push(
                        <UserItemList key={student.id} user={student} questions={questions} examResults={filteredExamResults} examSetId={this.props.selectedExamId}/>
                    );
                })
            }
            return (
                <Container component="main" maxWidth="xl">
                    <CssBaseline/>
                    <div className={classes.paper}>
                        <Select
                            animated={animatedComponents}
                            defaultValue={"Auswählen..."}
                            value={schoolClasses.label}
                            onChange={this.handleSchoolClass}
                            options={schoolClasses}
                        />
                    </div>
                        {studentList}
                </Container>
            );
        }
    }
}

const ReviseExamDefault = connect(mapStateToProps, null)(ReviseExam)

export default withStyles(myStyles)(ReviseExamDefault);