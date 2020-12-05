import React from "react";
import withStyles from "@material-ui/core/styles/withStyles";
import ApiRequests, {urlTypes} from "../../../Services/AuthService/ApiRequests";
import AuthenticationRequests from "../../../Services/AuthService/AuthenticationRequests";
import Loader from "../Utils/Loader";


const myStyles = theme => ({
    root: {
        flexGrow: 1,
    },
    paper: {
        padding: theme.spacing(2),
        textAlign: 'center',
        color: theme.palette.text.secondary,
    },
    loader: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
    }

});

// TODO: Create Statistics view
class Statistics extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            allCategories: [],
            allCategorySets: [],
            allQuestions: [],
            allUserStatistics: [],
            allDataLoaded: false,
        }

        this.getUserStatistics = this.getUserStatistics.bind(this);
        this.getCategories = this.getCategories.bind(this);
        this.getCategorySets = this.getCategorySets.bind(this);
        this.getQuestions = this.getQuestions.bind(this);
        this.sortQuestions = this.sortQuestions.bind(this);
    }

    componentDidMount() {
        this.getCategories();
    }

    getCategories() {
        ApiRequests.apiGetRequest(urlTypes.CATEGORIES)
            .then(result => {
                console.log(result.data)
                this.setState({
                    categoriesLoaded: true,
                    allCategories: result.data,
                });
                this.getCategorySets(result.data);
            })
            .catch(function (error) {
                console.log(error);
                // TODO: Make an Error Screen Component!!!
            })
            .finally(function () {
            });
    }

    getCategorySets(categories) {
        ApiRequests.apiGetRequest(urlTypes.CATEGORYSET)
            .then(result => {
                console.log("Fetched categorySets")
                console.log(result.data)
                this.setState({
                    categorySetsLoaded: true,
                    allCategorySets: result.data,
                });
                this.getQuestions(categories, result.data);
            })
            .catch(function (error) {
                console.log(error);
                // TODO: Make "Show Error" Component
            })
            .finally(function () {
            });
    }

    getQuestions(categories, categorySets) {
        ApiRequests.apiGetRequest(urlTypes.QUESTIONS)
            .then(result => {
                if (result.data !== undefined && result.data != 0) {
                    console.log("All Questions")
                    console.log(result.data);
                    this.setState({
                        allQuestions: result.data,
                    })
                    this.getUserStatistics(categories, categorySets, result.data);
                } else {
                    console.log("No Questions found...");
                    this.setState({
                        infoMessasge: "No Questions found...",
                    })
                }
            })
            .catch(function (error) {
                console.log(error);
            })
            .finally(function () {
            });
    }

    getUserStatistics(categories, categorySets, questions) {
        ApiRequests.apiGetRequest(urlTypes.USERSTATISTIC + AuthenticationRequests.getCurrentUser().id)
            .then(result => {
                if (result.data !== undefined && result.data != 0) {
                    console.log(result.data);
                    this.setState({
                        allUserStatistics: result.data,
                        allDataIsLoaded: true,
                    })
                    this.sortQuestions(categories, categorySets, questions);
                } else {
                    console.log("No Statisticobjects found...");
                    this.setState({
                        allDataIsLoaded: true,
                        infoMessasge: "No Statisticobjects found...",
                    })
                }
            })
            .catch(function (error) {
                console.log(error);
            })
            .finally(function () {
            });
    }

    sortQuestions(categories, categorySets, questions, userStatistics) {
        let statistics = {
            pointsPossible: 0,
            numberOfQuestions: 0,
            numberOfQuestionsSolved: 0,
            pointsAchieved: 0,
            numberOfQuestionsMarked: 0,
            categorySetStatistics: {},
        }
        // TODO: What does a categorySet contains exactly?
        categorySets.map((categorySet) => {
            statistics.categorySetStatistics[categorySet.categorySetId] = {
                title: categorySet.title,
                //possiblePoints: categorySet.possiblePoints,
                //numberOfQuestions: categorySet.numberOfQuestions,
            }
        })
        console.log("New Statistics")
        console.log(statistics)

    }


    render() {
        const {classes} = this.props;
        const {allDataIsLoaded} = this.state;

        if (!allDataIsLoaded) {
            return (
                <div className={classes.loader}>
                    <Loader/>
                </div>
            );
        } else {
            return (
                <div>
                    Hello World!
                </div>

            );
        }
    }
}

export default withStyles(myStyles)(Statistics);