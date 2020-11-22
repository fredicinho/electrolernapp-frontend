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
    name: "",
    description: "",
    plz: "",
    city: "",
    institutionCreated: false,
    institutionCreatedMessage: "",
    error: "",
}


class SchoolClassForm extends React.Component {

    constructor(props) {
        super(props);
        this.state= {
            ...initialState,
        }

        this.handleInstitutionName = this.handleInstitutionName.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleSchoolClassDescription = this.handleSchoolClassDescription.bind(this);
        this.handleInstitution = this.handleInstitution.bind(this);
        this.handleCity = this.handleCity.bind(this);
        this.handlePlz = this.handlePlz.bind(this);

    }

    handleCity(e) {
        e.preventDefault();
        this.setState({
            city: e.target.value,
        })
    }

    handlePlz(e) {
        e.preventDefault();
        this.setState({
            plz: e.target.value,
        })
    }

    handleInstitutionName(e) {
        e.preventDefault();
        this.setState({
            name: e.target.value,
        })
    }

    handleSubmit(e) {
        e.preventDefault();
        const { name, description, city, plz } = this.state;

        let newInstituiton = {
            name: name,
            description: description,
            city: city,
            plz: plz
        }

        ApiRequests.apiPostRequest(urlTypes.INSTITUTION, newInstituiton)
            .then(result => {
                if (result.status === 201) {
                    this.setState({
                        ...initialState,
                        institutionCreated: true,
                        institutionCreatedMessage: "Die Bildungsinstitution :: " + result.data.name + " :: wurde erfolgreich erstellt!",
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
                        schooClassCreated: true,
                        schooClassCreatedMessage: "Die Bildungsinstitution :: " + error.response.data.name + " :: existiert bereits!"
                    });
                }

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
        const {name, institutionCreated, institutionCreatedMessage, description, city, plz} = this.state;

        return(
            <Container component="main" maxWidth="xl">
                <CssBaseline/>
                <div className={classes.paper}>
                    {institutionCreated &&
                    <Alert variant="info">
                        {institutionCreatedMessage}
                    </Alert>
                    }
                    <Typography component="h1" variant="h5">
                        Erstelle hier eine neue Bildungsinstitution
                    </Typography>
                    <Form onSubmit={this.handleSubmit}>
                        <Form.Group controlId="institutionName">
                            <Form.Label>Bildungsinstitution</Form.Label>
                            <Form.Control as="input" placeholder="Gib hier den Namen der Bildungsinstitution ein" value={name}
                                          onChange={this.handleInstitution}/>
                        </Form.Group>
                        <Form.Group controlId="institutionDescription">
                            <Form.Label>Beschreibung</Form.Label>
                            <Form.Control as="input" placeholder="Gib hier eine Beschreibung der Bildungsinstitution ein" value={description}
                                          onChange={this.handleSchoolClassDescription}/>
                        </Form.Group>
                        <Form.Group controlId="city">
                            <Form.Label>Ort</Form.Label>
                            <Form.Control as="input" placeholder="Gib hier den Ort der Bildungsinstitution ein" value={city}
                                          onChange={this.handleCity}/>
                        </Form.Group>
                        <Form.Group controlId="plz">
                            <Form.Label>PLZ</Form.Label>
                            <Form.Control as="input" placeholder="Gib hier die Postleitzahl der Bildungsinstitution ein" value={plz}
                                          onChange={this.handlePlz}/>
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