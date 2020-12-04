import React from "react";
import withStyles from "@material-ui/core/styles/withStyles";
import ApiRequests, {urlTypes} from "../../../Services/AuthService/ApiRequests";
import AuthenticationRequests from "../../../Services/AuthService/AuthenticationRequests";


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

// TODO: Create Statistics view
class Statistics extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            allInvolvedCategories: [],
            allInvolvedCategorySets: [],
            allInvolvedQuestions: [],
        }
        this.getUserStatistics = this.getUserStatistics.bind(this);
        this.getCategories = this.getCategories.bind(this);
        this.getCategorySets = this.getCategorySets.bind(this);
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
                    categories: result.data,
                });
                this.getCategorySets();
            })
            .catch(function (error) {
                console.log(error);
                // TODO: Make an Error Screen Component!!!
            })
            .finally(function () {
            });
    }

    getCategorySets() {
        ApiRequests.apiGetRequest(urlTypes.CATEGORYSET)
            .then(result => {
                console.log("Fetched categorySets")
                console.log(result.data)
                this.setState({
                    categorySetsLoaded: true,
                    categorySets: result.data,
                });
                this.getUserStatistics();
            })
            .catch(function (error) {
                console.log(error);
                // TODO: Make "Show Error" Component
            })
            .finally(function () {
            });
    }

    getUserStatistics() {
        ApiRequests.apiGetRequest(urlTypes.USERSTATISTIC + AuthenticationRequests.getCurrentUser().id)
            .then(result => {
                if (result.data !== undefined && result.data != 0) {
                    console.log(result.data);
                } else {
                    console.log("No Statisticobjects found...");
                }
            })
            .catch(function (error) {
                console.log(error);
            })
            .finally(function () {
            });
    }


    render() {
        const { classes } = this.props;

        return(
            <div>
                Hello World!
            </div>

        );
    }
}

export default withStyles(myStyles)(Statistics);