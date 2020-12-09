import React, {PureComponent} from "react";
import withStyles from "@material-ui/core/styles/withStyles";
import ApiRequests, {urlTypes} from "../../../Services/AuthService/ApiRequests";
import AuthenticationRequests from "../../../Services/AuthService/AuthenticationRequests";
import Loader from "../Utils/Loader";
import {
    Radar,
    RadarChart,
    PolarGrid,
    PolarAngleAxis,
    PolarRadiusAxis,
    ComposedChart,
    BarChart
} from 'recharts';
import {XAxis} from "recharts";
import {YAxis} from "recharts";
import Tooltip from "@material-ui/core/Tooltip";
import {Legend} from "recharts";
import {CartesianGrid} from "recharts";
import {Bar} from "recharts";
import Typography from "@material-ui/core/Typography";
import CategorySetStatistic from "../Utils/CategorySetStatistic";
import Select from "react-select";
import Form from "react-bootstrap/Form";
import makeAnimated from "react-select/animated/dist/react-select.esm";

const animatedComponents = makeAnimated();


const myStyles = theme => ({
    root: {
        display: 'flex',
        flexDirection: 'column',
        flexWrap: 'wrap',
        alignItems: 'center',
    },
    title: {
        textAlign: 'center',
    },
    child: {
        minWidth: '100%',
        justifyContent: 'center',
        boxSizing: 'border-box',
    },
    categoryBar: {
        display: 'flex',
        justifyContent: 'center',
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
    },


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
            statistics: null,
            statisticsCalculated: false,
            allCategoriesForSelect: [],
            selectedCategory: "",
        }

        this.getUserStatistics = this.getUserStatistics.bind(this);
        this.getCategories = this.getCategories.bind(this);
        this.getCategorySets = this.getCategorySets.bind(this);
        this.sortQuestions = this.sortQuestions.bind(this);
        this.handleSelectedCategory = this.handleSelectedCategory.bind(this);
    }

    componentDidMount() {
        this.getCategories();
    }

    handleSelectedCategory(e) {
        this.setState({
            selectedCategory: e.value,
        })
    }

    getCategories() {
        ApiRequests.apiGetRequest(urlTypes.CATEGORIES)
            .then(result => {
                let allCategoriesForSelect = [];
                console.log(result.data)
                result.data.map((category) => {
                    allCategoriesForSelect.push({
                        value: category.categoryId,
                        label: category.name,
                    })
                });
                this.setState({
                    categoriesLoaded: true,
                    allCategories: result.data,
                    allCategoriesForSelect: allCategoriesForSelect,
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
        ApiRequests.apiGetRequest(urlTypes.CATEGORYSET + "categorySetOverview/")
            .then(result => {
                console.log("Fetched categorySetOverviews")
                console.log(result.data)
                this.setState({
                    categorySetsLoaded: true,
                    allCategorySets: result.data,
                });
                this.getUserStatistics(categories, result.data);
            })
            .catch(function (error) {
                console.log(error);
                // TODO: Make "Show Error" Component
            })
            .finally(function () {
            });
    }

    getUserStatistics(categories, categorySets) {
        ApiRequests.apiGetRequest(urlTypes.USERSTATISTIC + AuthenticationRequests.getCurrentUser().id)
            .then(result => {
                if (result.data !== undefined && result.data != 0) {
                    this.setState({
                        allUserStatistics: result.data,
                        allDataIsLoaded: true,
                    })
                    this.sortQuestions(categories, categorySets, result.data);
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

    sortQuestions(categories, categorySets, userStatistics) {
        let statistics = {
            pointsPossible: 0,
            numberOfQuestions: 0,
            numberOfQuestionsSolved: 0,
            pointsAchieved: 0,
            numberOfQuestionsMarked: 0,
            categoryStatistics: {},
            categorySetStatistics: {},
        }

        categories.map((category) => {
            statistics.categoryStatistics[category.categoryId] = category;
            statistics.categoryStatistics[category.categoryId].pointsAchieved = 0;
            statistics.categoryStatistics[category.categoryId].pointsPossible = 0;
            statistics.categoryStatistics[category.categoryId].numberOfQuestions = 0;
            statistics.categoryStatistics[category.categoryId].numberOfQuestionsSolved = 0;
            statistics.categoryStatistics[category.categoryId].numberOfQuestionsMarked = 0;
        })

        categorySets.map((categorySet) => {
            statistics.categorySetStatistics[categorySet.categorySetId] = categorySet;
            statistics.categorySetStatistics[categorySet.categorySetId].pointsAchieved = 0;
            statistics.categorySetStatistics[categorySet.categorySetId].numberOfQuestionsMarked = 0;
            statistics.categorySetStatistics[categorySet.categorySetId].numberOfQuestionsSolved = 0;
            statistics.pointsPossible += parseFloat(categorySet.maximalNumberOfPoints);
            statistics.numberOfQuestions += categorySet.numberOfQuestions;
            statistics.categoryStatistics[categorySet.categoryId].pointsPossible += categorySet.maximalNumberOfPoints;
            statistics.categoryStatistics[categorySet.categoryId].numberOfQuestions += categorySet.numberOfQuestions;
            statistics.categoryStatistics[categorySet.categoryId].numberOfQuestions += 1;

        })

        userStatistics.map((userStatistic) => {
            statistics.categorySetStatistics[userStatistic.categorySetId].pointsAchieved += userStatistic.pointsAchieved;
            if ( statistics.categorySetStatistics[userStatistic.categorySetId].numberOfQuestions > statistics.categorySetStatistics[userStatistic.categorySetId].numberOfQuestionsSolved ) {
                statistics.categorySetStatistics[userStatistic.categorySetId].numberOfQuestionsSolved += 1;
            }
            statistics.categoryStatistics[userStatistic.categoryId].pointsAchieved += userStatistic.pointsAchieved;
            statistics.categoryStatistics[userStatistic.categoryId].numberOfQuestionsSolved += 1;
            statistics.pointsAchieved += userStatistic.pointsAchieved;
            statistics.numberOfQuestionsSolved += 1;
            if (userStatistic.marked) {
                statistics.numberOfQuestionsMarked += 1;
                statistics.categoryStatistics[userStatistic.categoryId].numberOfQuestionsMarked += 1;
                statistics.categorySetStatistics[userStatistic.categorySetId].numberOfQuestionsMarked += 1;
            }
        })

        console.log("New Statistics")
        console.log(statistics)

        this.setState({
            statistics: statistics,
            statisticsCalculated: true,
        })
    }


    render() {
        const {classes} = this.props;
        const {allDataIsLoaded, statisticsCalculated, statistics, allCategoriesForSelect, selectedCategory} = this.state;

        if (!statisticsCalculated && !allDataIsLoaded) {
            return (
                <div className={classes.loader}>
                    <Loader/>
                </div>
            );
        } else {

            if (statistics === null) {
                return (
                    <div className={classes.loader}>
                        <Loader/>
                    </div>
                );
            } else {

                const categoryStatistics = Object.values(statistics.categoryStatistics).map((categoryStatistic) => {
                    return ({
                        name: categoryStatistic.name,
                        'Übungen absolviert (in %)': (categoryStatistic.numberOfQuestionsSolved / categoryStatistic.numberOfQuestions) * 100,
                        'Punkte erreicht (in %)': (categoryStatistic.pointsAchieved / categoryStatistic.pointsPossible) * 100,
                        fullMark: 100,
                    });
                });

                let selectedCategorySetStatistics = Object.values(statistics.categorySetStatistics).filter((categorySetStatistic) => {
                    return categorySetStatistic.categoryId === selectedCategory
                });

                console.log("Actual Statistics")
                console.log(this.state.statistics)
                return (
                    <div>
                        <div className={classes.root}>
                            <div className={classes.child}>
                                <Typography className={classes.title} variant="h3" gutterBottom>
                                    Kategorien
                                </Typography>
                            </div>

                            <div className={classes.child}>

                                <BarChart className={classes.categoryBar}
                                          width={1500}
                                          height={500}
                                          data={categoryStatistics}
                                          margin={{
                                              top: 5, right: 30, left: 20, bottom: 5,
                                          }}
                                >
                                    <CartesianGrid strokeDasharray="3 3"/>
                                    <XAxis dataKey="name"/>
                                    <YAxis/>
                                    <Tooltip/>
                                    <Legend/>
                                    <Bar dataKey="Übungen absolviert (in %)"
                                         fill="#03a9f4"
                                         isAnimationActive={true}
                                         animationBegin={0}
                                         animationDuration={3000}
                                    />
                                    <Bar dataKey="Punkte erreicht (in %)"
                                         fill="#08135f"
                                         isAnimationActive={true}
                                         animationBegin={0}
                                         animationDuration={3000}
                                    />
                                </BarChart>
                            </div>
                            <br/>
                            <br/>
                            <br/>
                            <br/>
                            <div className={classes.child}>
                                <Typography className={classes.title} variant="h3" gutterBottom>
                                    Übungssets
                                </Typography>
                            </div>
                            <div className={classes.child}>
                                <Select
                                    defaultValue={"Auswählen..."}
                                    components={animatedComponents}
                                    onChange={this.handleSelectedCategory}
                                    options={allCategoriesForSelect}
                                />
                            </div>
                            <div className={classes.child}>
                                <CategorySetStatistic categorySets={selectedCategorySetStatistics}
                                                      categories={statistics.categoryStatistics}/>
                            </div>
                        </div>
                    </div>

                );
            }
        }
    }
}

export default withStyles(myStyles)(Statistics);