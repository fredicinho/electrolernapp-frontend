import React from "react";
import Typography from "@material-ui/core/Typography";
import Form from "react-bootstrap/Form";
import Select from "react-select";
import Col from "react-bootstrap/Col";
import Button from "@material-ui/core/Button";
import {Alert} from "react-bootstrap";
import CssBaseline from "@material-ui/core/CssBaseline";
import Box from "@material-ui/core/Box";
import Container from "@material-ui/core/Container";
import {Copyright} from "@material-ui/icons";
import withStyles from "@material-ui/core/styles/withStyles";
import ApiRequests, {urlTypes} from "../../../Services/AuthService/ApiRequests";
import QuestionCard from "../Utils/QuestionCard";


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


class ExamForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            categories: [],
            categorySets: [],
            questionsInExamSet: [],
            schoolClassesInExamSet: [],
            categoriesInExamSet: [],
            startDate: "",
            endDate: "",
            title: "",
            questionsOfSelectedCategorySet: [],
        }
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleCategory = this.handleCategory.bind(this);
        this.handleCategorySet = this.handleCategorySet.bind(this);
        this.handleExamTitle = this.handleExamTitle.bind(this);

    }

    componentDidMount() {
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
                    console.log(allCategories)
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

    handleSubmit() {

    }

    handleCategory(e) {
        ApiRequests.apiGetRequest(e.value).then(
            response => {
                if (response.data !== undefined && response.data != 0) {
                    let allCategorySets = [];
                    console.log("Fetched CategoySets")
                    console.log(response.data)
                    response.data.map((categorySet) => {
                        allCategorySets.push({
                            value: categorySet.links[1].href,
                            label: categorySet.title
                        })
                    })
                    this.setState({
                        categorySets: allCategorySets
                    })
                    console.log(allCategorySets)
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
        console.log(e.value)
        ApiRequests.apiGetRequest(e.value)
            .then(result => {
                console.log("Fetched Questions")
                console.log(result.data)
                if (result.data !== undefined && result.data != 0) {
                    console.log(result.data)
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

    render() {
        const {classes} = this.props;
        let fetchedExersices = [];
        this.state.questionsOfSelectedCategorySet.map(question => {
            fetchedExersices.push(<QuestionCard question={question}/>)
        });

        return(
            <Container component="main" maxWidth="xl">
                <CssBaseline/>
                <div className={classes.paper}>
                    <Typography component="h1" variant="h5">
                        Erstelle hier eine neue Prüfung
                    </Typography>
                    <Form onSubmit={this.handleSubmit}>
                        <Form.Group controlId="examTitle">
                            <Form.Label>Prüfungsname</Form.Label>
                            <Form.Control as="input" placeholder="Gib hier einen Prüfungsnamen ein"
                                          onChange={this.handleExamTitle}/>
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
                        {fetchedExersices}
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

export default withStyles(styles)(ExamForm);