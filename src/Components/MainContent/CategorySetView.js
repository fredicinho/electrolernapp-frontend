import React from "react";
import Grid from "@material-ui/core/Grid";
import CategoryCard from "./CategoryCard";
import ApiRequests from "../../Services/AuthService/ApiRequests";
import { urlTypes } from "../../Services/AuthService/ApiRequests";
import Loader from "./Loader";
import {connect} from "react-redux";
import CategorySetCard from "./CategorySetCard";
import withStyles from "@material-ui/core/styles/withStyles";

const mapStateToProps = state => {
    return {
        selectedCategorySetUrl: state.categorySet.selectedCategorySetUrl,
        selectedCategory: state.categorySet.selectedCategory,
    };
};

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


class CategorySetView extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            categorieSets: [],
            isLoaded: false,
        }
    }

    componentDidMount() {
        ApiRequests.apiGetRequest(this.props.selectedCategorySetUrl)
            .then(result => {
                this.setState({
                    isLoaded: true,
                    categorySets: result.data,
                });
            })
            .catch(function (error) {
                console.log(error);
                // TODO: Make "Show Error" Component
            })
            .finally(function () {
            });
    }

    render() {
        const {error, isLoaded, categorySets} = this.state;
        const { classes } = this.props
        if (error) {
            return <div>Error: {error.message}</div>;
        } else if (!isLoaded) {
            return <Loader/>
        } else {
            let categoryItems = [];
            categorySets.map((categorySet) => {
                categoryItems.push(
                    <Grid item xs={12} sm={6} md={4} lg={3} justify="space-around">
                        <CategorySetCard categorySet={categorySet}/>
                    </Grid>)
            });
            return (
                <div className={classes.root} justify="center">
                    <Grid container spacing={3}>
                        {categoryItems}
                    </Grid>
                </div>
            );
        }
    }
}
const CategorySets = connect(mapStateToProps, null)(CategorySetView)

export default withStyles(myStyles)(CategorySets);