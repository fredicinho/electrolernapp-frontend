import React from "react";
import Typography from "@material-ui/core/Typography";
import Form from "react-bootstrap/Form";
import Select from "react-select";
import Button from "@material-ui/core/Button";
import {ListGroup, Alert} from "react-bootstrap";
import CssBaseline from "@material-ui/core/CssBaseline";
import Container from "@material-ui/core/Container";
import withStyles from "@material-ui/core/styles/withStyles";
import ApiRequests, {urlTypes} from "../../../Services/AuthService/ApiRequests";
import Datetime from "react-datetime";
import "react-datetime/css/react-datetime.css";
// import moment from 'moment';
import moment from 'moment-timezone';
import "moment/locale/de";
import AuthenticationService from "../../../Services/AuthService/AuthenticationRequests";
import makeAnimated from "react-select/animated/dist/react-select.esm";

const animatedComponents = makeAnimated();

const styles = theme => ({
    paper: {
        marginTop: theme.spacing(8),
        display: 'flex',
        flexDirection: 'column',
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
    }

});

const initialState = {
    categories: [],
    categorySets: [],
    questionsInExamSet: [],
    schoolClassesInExamSet: [],
    categoriesInExamSet: [],
    startDate: "",
    endDate: "",
    title: "",
    questionsOfSelectedCategorySet: [],
    userId: "",
    examCreatedPopup: false,
    examCreatedMessage: "",
    allSchoolClasses: null,
}


class ExamForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            ...initialState
        }
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleCategory = this.handleCategory.bind(this);
        this.handleCategorySet = this.handleCategorySet.bind(this);
        this.handleExamTitle = this.handleExamTitle.bind(this);
        this.handleAddQuestion = this.handleAddQuestion.bind(this);
        this.handleValidFrom = this.handleValidFrom.bind(this);
        this.handleValidUntil = this.handleValidUntil.bind(this);
        this.getCategories = this.getCategories.bind(this);
        this.getSchoolClasses = this.getSchoolClasses.bind(this);
        this.handleSchoolClass = this.handleSchoolClass.bind(this);
        this.clearExam = this.clearExam.bind(this);
    }

    componentDidMount() {
        this.getCategories();
        this.getSchoolClasses();
    }

    getSchoolClasses() {
        ApiRequests.apiGetRequest(urlTypes.SCHOOLCLASS)
            .then(response => {
                if (response.data !== undefined && response.data != 0) {
                    let allSchoolClasses = [];
                    response.data.map((user) => {
                        allSchoolClasses.push({
                            value: user.id,
                            label: user.name,
                        })
                    });
                    this.setState({
                        allSchoolClasses: allSchoolClasses,
                    })
                } else {
                    this.setState({
                        error: "No Schoolclasses found..."
                    })
                }
            })
            .catch(error => {
                console.log(error.data)
            })
    }

    getCategories() {
        ApiRequests.apiGetRequest(urlTypes.CATEGORIES).then(
            response => {
                if (response.data !== undefined && response.data != 0) {
                    let allCategories = [];
                    response.data.map((category) => {
                        allCategories.push({
                            value: category.links[0].href,
                            label: category.name
                        })
                    })
                    this.setState({
                        categories: allCategories
                    })
                } else {
                    this.setState({
                        error: "No Categories found..."
                    })
                }
            }
        ).catch(function (error) {
            console.log(error);
        })
    }

    handleSchoolClass(e) {
        if (e != null) {
            this.setState({
                schoolClassesInExamSet: e
            })
        }
    }

    handleValidFrom(e) {
        this.setState({
            startDate: e._d
        })
    }

    handleValidUntil(e) {
        this.setState({
            endDate: e._d
        })
    }

    handleAddQuestion(question) {
        let actualState = Object.assign({}, this.state);
        let actualQuestionsInExamSet = actualState.questionsInExamSet;
        actualQuestionsInExamSet.push(question);
        this.setState({
            questionsInExamSet: actualQuestionsInExamSet
        })
    }

    handleDeleteQuestion(e) {
        let actualState = Object.assign({}, this.state);
        let actualQuestionsInExamSet = actualState.questionsInExamSet;
        actualQuestionsInExamSet.splice(actualQuestionsInExamSet.indexOf(e), 1);
        this.setState({
            questionsInExamSet: actualQuestionsInExamSet
        })
    }

    handleSubmit() {
        let idsOfChosenQuestions = [];
        let {questionsInExamSet, schoolClassesInExamSet, startDate, endDate, title} = this.state;
        questionsInExamSet.map(question => {
            idsOfChosenQuestions.push(question.id);
        })
        let schoolClassesInNewExamSet = [];
        schoolClassesInExamSet.map(schoolClass => {
            schoolClassesInNewExamSet.push(schoolClass.value);
        });

        let newExam = {
            title: title,
            startDate: moment(startDate).format(),
            endDate: moment(endDate).format(),
            questionsInExamSet: idsOfChosenQuestions,
            schoolClassesInExamSet: schoolClassesInNewExamSet,
            userId: AuthenticationService.getCurrentUser().id,
        }

        ApiRequests.apiPostRequest(urlTypes.EXAMSET, newExam)
            .then(result => {
                if (result.status === 201) {
                    this.setState({
                        ...initialState,
                        examCreatedPopup: true,
                        examCreatedMessage: "Die Prüfung :: " + result.data.title + " :: wurde erfolgreich erstellt!",
                    });
                    this.getCategories();
                } else {
                    this.setState({
                        ...initialState,
                        examCreatedPopup: true,
                        examCreatedMessage: "Es gab ein Problem beim erstellen der Prüfung..."
                    })
                }
            })
            .catch( error => {
                this.setState({
                    examCreatedPopup: true,
                    questionCreatedMessage: "Es gab ein Problem beim erstellen der Prüfung..."
                })
                console.log(error)
            })
            .finally(function () {
            });

    }

    handleCategory(e) {
        ApiRequests.apiGetRequest(e.value).then(
            response => {
                if (response.data !== undefined && response.data != 0) {
                    let allCategorySets = [];
                    response.data.map((categorySet) => {
                        allCategorySets.push({
                            value: categorySet.links[1].href,
                            label: categorySet.title
                        })
                    })
                    this.setState({
                        categorySets: allCategorySets
                    })
                } else {
                    this.setState({
                        error: "No Categories found..."
                    })
                }
            }
        ).catch(function (error) {
            console.log(error);
        })
    }

    handleCategorySet(e) {
        ApiRequests.apiGetRequest(e.value)
            .then(result => {
                if (result.data !== undefined) {
                    this.setState({
                        questionsOfSelectedCategorySet: result.data,
                    });
                }
            })
            .catch(function (error) {
                console.log(error);
            })
            .finally(function () {
            });
    }

    handleExamTitle(e) {
        e.preventDefault();
        this.setState({
            title: e.target.value,
        })
    }

    clearExam() {
        this.setState({
            questionsInExamSet: [],
        })
    }

    render() {
        const {classes} = this.props;
        const { questionsInExamSet, questionsOfSelectedCategorySet, examCreatedPopup, examCreatedMessage } = this.state;
        const chosenExercises = questionsInExamSet.map(question => {
            return (
                <ListGroup.Item>
                    {question.questionPhrase}
                    <Button className="pull-right" onClick={() => this.handleDeleteQuestion(question.id)}>Entfernen</Button>
                </ListGroup.Item>
            )
        })

        let fetchedExersices = [];
        questionsOfSelectedCategorySet.map(question => {
            if (!questionsInExamSet.includes(question)) {
                fetchedExersices.push(
                    <ListGroup.Item>
                        {question.questionPhrase}
                        <Button className="pull-right" onClick={() => this.handleAddQuestion(question)}>Hinzufügen</Button>
                    </ListGroup.Item>
                )
            }
        });

        return(
            <Container component="main" maxWidth="xl">
                <CssBaseline/>
                <div className={classes.paper}>
                    {examCreatedPopup &&
                    <Alert variant="info">
                        {examCreatedMessage}
                    </Alert>
                    }
                    <Typography component="h1" variant="h5">
                        Erstelle hier eine neue Prüfung
                    </Typography>
                    <Form>
                        <Form.Group controlId="examTitle">
                            <Form.Label>Prüfungsname</Form.Label>
                            <Form.Control as="input" placeholder="Gib hier einen Prüfungsnamen ein" value={this.state.title}
                                          onChange={this.handleExamTitle}/>
                        </Form.Group>
                        <Form.Group controlId="validFrom">
                            <Form.Label>Prüfungsstart</Form.Label>
                            <Datetime value={this.state.startDate} onChange={this.handleValidFrom}/>
                        </Form.Group>
                        <Form.Group controlId="valitUntil">
                            <Form.Label>Prüfungsende</Form.Label>
                            <Datetime value={this.state.endDate} onChange={this.handleValidUntil}/>
                        </Form.Group>
                        <Form.Group controlId="schooclasses">
                            <Form.Label>Schulklassen für die Prüfung</Form.Label>
                            <Select
                                defaultValue={"Auswählen..."}
                                closeMenuOnSelect={false}
                                components={animatedComponents}
                                onChange={this.handleSchoolClass}
                                options={this.state.allSchoolClasses}
                                isMulti
                            />
                        </Form.Group>
                        <Form.Group controlId="category">
                            <Form.Label>Kategorie</Form.Label>
                            <Select
                                defaultValue={"Auswählen..."}
                                value={this.state.categories.label}
                                onChange={this.handleCategory}
                                options={this.state.categories}
                            />
                        </Form.Group>
                        <Form.Group controlId="categorySet">
                            <Form.Label>Übungssets</Form.Label>
                            <Select
                                defaultValue={"Auswählen..."}
                                value={this.state.categorySets.label}
                                onChange={this.handleCategorySet}
                                options={this.state.categorySets}
                            />
                        </Form.Group>
                    </Form>
                </div>
                <Typography component="h1" variant="h5">
                    Vorhandene Fragen im ausgewählten Übungsset:
                </Typography>
                <ListGroup defaultActiveKey="#link1">
                    {fetchedExersices}
                </ListGroup>
                <Typography component="h1" variant="h5">
                    Deine ausgewählten Fragen für die Prüfung:
                </Typography>
                <ListGroup defaultActiveKey="#link1">
                    {chosenExercises}
                </ListGroup>
                <Button onClick={() => this.handleSubmit()}>
                    Prüfung erstellen!
                </Button>
                <Button onClick={() => this.clearExam()}>
                    Prüfungsfragen entfernen!
                </Button>
            </Container>
        );
    }
}



export default withStyles(styles)(ExamForm);