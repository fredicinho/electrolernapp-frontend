import React from 'react';
import {changeNavigationPage} from "../../../Redux/Actions/navigationActions";
import ApiRequests, {urlTypes} from "../../../Services/AuthService/ApiRequests";
import Loader from "../Utils/Loader";
import Grid from "@material-ui/core/Grid";
import {connect} from "react-redux";
import withStyles from "@material-ui/core/styles/withStyles";
import ExamCard from "../Utils/ExamCard";
import Select from "react-select";
import Form from "react-bootstrap/Form";
import makeAnimated from "react-select/animated/dist/react-select.esm";
import CssBaseline from "@material-ui/core/CssBaseline";
import {Alert, ListGroup} from "react-bootstrap";
import Typography from "@material-ui/core/Typography";
import Datetime from "react-datetime";
import Button from "@material-ui/core/Button";
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
    };
};

class ReviseExam extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            isLoaded: false,
            schoolClasses: null,
            students: null,
        }

        this.handleSchoolClass = this.handleSchoolClass.bind(this);
    }

    componentDidMount() {
        ApiRequests.apiGetRequest(this.props.urlOfClassesInExam)
            .then(result => {
                let allSchoolClasses = [];
                result.data.map((schoolClass) => {
                    allSchoolClasses.push({
                        value: schoolClass.links[0].href,
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

    handleSchoolClass(e) {
        ApiRequests.apiGetRequest(e.value).then(
            response => {
                if (response.data !== undefined && response.data != 0) {
                    console.log("Fetched Students");
                    console.log(response.data);
                    this.setState({
                        students: response.data,
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

    render() {
        const {error, isLoaded, schoolClasses, students} = this.state;
        const {classes} = this.props
        if (error) {
            return <div>Error: {error.message}</div>;
        } else if (!isLoaded) {
            return <Loader/>
        } else {
            let studentList = [];
            if (students != null) {
                students.map((student) => {
                    studentList.push(<UserItemList user={student}/>);
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