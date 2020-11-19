import React from 'react';
import PropTypes from 'prop-types';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import withStyles from "@material-ui/core/styles/withStyles";
import QuizCore from "./QuizCore";
import ApiRequests, {urlTypes} from "../../../Services/AuthService/ApiRequests";

function TabPanel(props) {
    const { children, value, index, ...other } = props;

    return (
        <div
            role="tabpanel"
            hidden={value !== index}
            id={`vertical-tabpanel-${index}`}
            aria-labelledby={`vertical-tab-${index}`}
            {...other}
        >
            {value === index && (
                <Box p={3}>
                    <Typography>{children}</Typography>
                </Box>
            )}
        </div>
    );
}

TabPanel.propTypes = {
    children: PropTypes.node,
    index: PropTypes.any.isRequired,
    value: PropTypes.any.isRequired,
};

function a11yProps(index) {
    return {
        id: `vertical-tab-${index}`,
        'aria-controls': `vertical-tabpanel-${index}`,
    };
}

const myStyles = theme => ({
    root: {
        flexGrow: 1,
        backgroundColor: theme.palette.background.paper,
        display: 'flex',
        maxHeight: '80%'
    },
    tabs: {
        borderRight: `1px solid ${theme.palette.divider}`,
    },
});

class VerticalTabs extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            value: this.props.questions[0].id,
            questions: this.props.questions,
        }
        this.handleChange = this.handleChange.bind(this);
        this.changeSelectedAnswers = this.changeSelectedAnswers.bind(this);
        this.sendActualAnswers = this.sendActualAnswers.bind(this);
    }

    handleChange(event, newValue){
        this.sendActualAnswers()
        this.setState({
            value: newValue,
        })
    };

    sendActualAnswers() {
        let affectedResultObject = {};
        const {value, questions} = this.state;
        for (let question of questions) {
            if (question.id === value)
                affectedResultObject = Object.assign(affectedResultObject, question.result);
        }
        if (affectedResultObject.sendedAnswers.length === 0) {
            return;
        } else {
            affectedResultObject.sendedAnswers = affectedResultObject.sendedAnswers.map(answer => {
                return answer.answerPhrase
            })
        }
        ApiRequests.apiPostRequest(urlTypes.EXAMCHECK, affectedResultObject)
            .then(result => {
                if (result.status === 201) {
                    console.log("Sending result was successful")
                } else {
                    console.log("Sending result was not sucesfull")
                }
            })
            .catch( error => {
                console.log(error)
            })
            .finally(function () {
            });
    }

    changeSelectedAnswers(selectedAnswers, questionId) {
        const { questions } = this.state;
        for (let question of questions) {
            if (question.id === questionId) {
                question.result.sendedAnswers = selectedAnswers;
                break;
            }
        }
        this.setState({
            questions: questions,
        })
    }

    render() {
        const { questions } = this.state;
        let tabLabels = [];
        let tabPanels = [];
        questions.map((question) => {
            tabLabels.push(
                <Tab value={question.id} label={question.questionPhrase} {...a11yProps(question.id)} />
            );
            tabPanels.push(
                <TabPanel value={this.state.value} index={question.id}>
                    <QuizCore question={question} onChangeAnswer={this.changeSelectedAnswers}/>
                </TabPanel>
            );
        });
        const { classes } = this.props;
        return (
            <div className={classes.root}>
                <Tabs
                    orientation="vertical"
                    variant="scrollable"
                    value={this.state.value}
                    onChange={this.handleChange}
                    aria-label="Vertical tabs example"
                    className={classes.tabs}
                >
                    {tabLabels}
                </Tabs>
                {tabPanels}
            </div>
        );
    }
}

export default withStyles(myStyles)(VerticalTabs);