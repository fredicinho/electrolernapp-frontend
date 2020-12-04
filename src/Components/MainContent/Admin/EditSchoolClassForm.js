import React from "react";
import ApiRequests, {urlTypes} from "../../../Services/AuthService/ApiRequests";
import CssBaseline from "@material-ui/core/CssBaseline";
import {Alert} from "react-bootstrap";
import Typography from "@material-ui/core/Typography";
import Form from "react-bootstrap/Form";
import Select from "react-select";
import makeAnimated from 'react-select/animated';
import Button from "@material-ui/core/Button";
import Box from "@material-ui/core/Box";
import Container from "@material-ui/core/Container";
import {Copyright} from "./QuestionForm";
import withStyles from "@material-ui/core/styles/withStyles";

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
    },
});

const initialState = {
    allSchoolClasses: [],
    allInstitutions: [],
    name: "",
    description: "",
    examSetsForSchoolClass: [],
    usersInClass: [],
    institution: "",
    schoolClassCreated: false,
    schoolClassCreatedMessage: "",
}


class SchoolClassForm extends React.Component {

    constructor(props) {
        super(props);
        this.state= {
            ...initialState,
        }

        this.handleSchoolClassName = this.handleSchoolClassName.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleInstitution = this.handleInstitution.bind(this);
        this.handleSchoolClassDescription = this.handleSchoolClassDescription.bind(this);
        this.handleUsers = this.handleUsers.bind(this);
        this.handleSelectInstitution = this.handleSelectInstitution.bind(this);

    }

    componentDidMount() {
        ApiRequests.apiGetRequest(urlTypes.USERS)
            .then(response => {
                if (response.data !== undefined && response.data != 0) {
                    let allUsers = [];
                    response.data.map((user) => {
                        allUsers.push({
                            value: user.id,
                            label: user.email,
                        })
                    });
                    this.setState({
                        allUsers: allUsers,
                    })
                } else {
                    console.log("No Users found...")
                    this.setState({
                        error: "No Users found..."
                    })
                }
            })
            .catch(error => {
                console.log(error.data)
            })

        ApiRequests.apiGetRequest(urlTypes.INSTITUTION).then(
            response => {
                if (response.data !== undefined && response.data != 0) {
                    let allInstitutions = [];
                    response.data.map((institution) => {
                        console.log(institution)
                        allInstitutions.push({
                            // TODO: Check if link is correct
                            value: institution.link[0].href,
                            label: institution.name,
                        })
                    })

                    this.setState({
                        allInstitutions: allInstitutions,
                    })
                } else {
                    console.log("No Institutions found...")
                    this.setState({
                        error: "No Institutions found..."
                    })
                }
            }
        ).catch( error => {
            // TODO: Handle error...
            console.log(error);
        });
    }

    handleSubmit(e) {
        e.preventDefault();
        const {name, description, examSetsForSchoolClass, usersInClass, institution} = this.state;

        let usersInNewClass = [];
        usersInClass.map(user => {
            usersInNewClass.push(user.value);
        });

        let newSchoolClass = {
            name: name,
            description: description,
            examSetsForSchoolClass: examSetsForSchoolClass,
            usersInClass: usersInNewClass,
            institutionId: parseInt(institution),
        }

        console.log("New Class :: ")
        console.log(JSON.stringify(newSchoolClass));

        ApiRequests.apiPutRequest(urlTypes.SCHOOLCLASS, newSchoolClass)
            .then(result => {
                console.log(result)
                if (result.status === 201) {
                    this.setState({
                        ...initialState,
                        schooClassCreated: true,
                        schooClassCreatedMessage: "Die Klasse :: " + result.data.name + " :: wurde erfolgreich bearbeitet!",
                    });
                } else {
                    this.setState({
                        //error: "No data found for this CategorySet..."
                    })
                }
            })
            .catch( error => {
                    this.setState({
                        schooClassCreated: true,
                        schooClassCreatedMessage: "Es gab ein Problem beim Bearbeiten der Klasse!"
                    });
            })
            .finally(function () {
            });

    }

    handleSchoolClassName(e) {
        e.preventDefault();
        this.setState({
            name: e.target.value,
        })
    }

    handleInstitution(e) {
        this.setState({
            institution: e.value,
        })
    }

    handleSelectInstitution(e) {
        ApiRequests.apiGetRequest(e.value).then(
            response => {
                if (response.data !== undefined && response.data != 0) {
                    let allSchoolClasses = [];
                    console.log("Fetched Schoolclasses")
                    console.log(response.data)
                    response.data.map((schoolClass) => {
                        allSchoolClasses.push({
                            value: schoolClass.id,
                            label: schoolClass.name,
                        })
                    })
                    this.setState({
                        allSchoolClasses: allSchoolClasses
                    })
                    console.log(allSchoolClasses)
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

    handleSelectClass(e) {
        ApiRequests.apiGetRequest(urlTypes.SCHOOLCLASS + e.value).then(
            response => {
                if (response.data !== undefined && response.data != 0) {
                    console.log("Fetched Schoolclasses")
                    console.log(response.data)
                    let schoolClass = response.data;
                    let usersInClass = [];
                    schoolClass.usersInClass.map((userId) => {
                        let users = this.state.allUsers.filter((user) => {return user.value === userId});
                        usersInClass.push(users[0]);
                    })
                    this.setState({
                        name: schoolClass.name,
                        description: schoolClass.description,
                        // TODO: Need to get Exams of SchoolClasses for Select-Component of Exams
                        examSetsForSchoolClass: [...schoolClass.examSetsForSchoolClass],
                        // TODO: Need to get Users Of SchoolClasses for Select-Component of Exams
                        usersInClass: [...usersInClass],
                        institution: schoolClass.institution,

                    })
                    console.log(allSchoolClasses)
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

    handleUsers(e) {
        if (e != null) {
            this.setState({
                usersInClass: e
            })
        }
    }

    handleSchoolClassDescription(e) {
        e.preventDefault();
        this.setState({
            description: e.target.value,
        })
    }


    render() {
        const {classes} = this.props;
        const {name, schoolClassCreated, schoolClassCreatedMessage, institution, allInstitutions, description, allUsers, allSchoolClasses, usersInClass} = this.state;

        return(
            <Container component="main" maxWidth="xl">
                <CssBaseline/>
                <div className={classes.paper}>

                    {schoolClassCreated &&
                    <Alert variant="info">
                        {schoolClassCreatedMessage}
                    </Alert>
                    }
                    <Typography component="h1" variant="h5">
                        Erstelle hier eine neue Klasse
                    </Typography>
                    <Form onSubmit={this.handleSubmit}>
                        <Form.Group controlId="institutionSelect">
                            <Form.Label>Institution auswählen:</Form.Label>
                            <Select
                                defaultValue={"Auswählen..."}
                                value={institution.label}
                                components={animatedComponents}
                                onChange={this.handleSelectInstitution}
                                options={allInstitutions}
                            />
                        </Form.Group>
                        <Form.Group controlId="schooclasses">
                            <Form.Label>Schulklassen auswählen:</Form.Label>
                            <Select
                                defaultValue={"Auswählen..."}
                                closeMenuOnSelect={false}
                                components={animatedComponents}
                                onChange={this.handleSelectClass}
                                options={allSchoolClasses}
                                isMulti
                            />
                        </Form.Group>
                        <Form.Group controlId="institution">
                            <Form.Label>Institution</Form.Label>
                            <Select
                                defaultValue={"Auswählen..."}
                                value={all}
                                components={animatedComponents}
                                onChange={this.handleInstitution}
                                options={allInstitutions}
                            />
                        </Form.Group>
                        <Form.Group controlId="schoolClassName">
                            <Form.Label>Schulklasse</Form.Label>
                            <Form.Control as="input" placeholder="Gib hier den Namen der Schulklasse ein" value={name}
                                          onChange={this.handleSchoolClassName}/>
                        </Form.Group>
                        <Form.Group controlId="schoolClassDescription">
                            <Form.Label>Beschreibung</Form.Label>
                            <Form.Control as="input" placeholder="Gib hier eine Beschreibung der Schulklasse ein" value={description}
                                          onChange={this.handleSchoolClassDescription}/>
                        </Form.Group>
                        <Form.Group controlId="users">
                            <Form.Label>Schüler der Klasse</Form.Label>
                            <Select
                                defaultValue={"Auswählen..."}
                                value={usersInClass}
                                closeMenuOnSelect={false}
                                components={animatedComponents}
                                onChange={this.handleUsers}
                                options={allUsers}
                                isMulti
                            />
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

export default withStyles(styles)(SchoolClassForm);