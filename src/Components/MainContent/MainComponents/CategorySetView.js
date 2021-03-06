import React from "react";
import Grid from "@material-ui/core/Grid";
import ApiRequests from "../../../Services/AuthService/ApiRequests";
import Loader from "../Utils/Loader";
import {connect} from "react-redux";
import CategorySetCard from "../Utils/CategorySetCard";
import withStyles from "@material-ui/core/styles/withStyles";
import Zoom from 'react-reveal/Zoom';


const mapStateToProps = state => {
    return {
        selectedCategorySetUrl: state.categorySet.selectedCategorySetUrl,
        selectedCategory: state.categorySet.selectedCategory,
    };
};

const myStyles = theme => ({
    root: {
        flexGrow: 1,
        marginLeft: theme.spacing(3),
        marginRight: theme.spacing(3),
        marginTop: theme.spacing(3),
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
                console.log("Fetched categorySets")
                console.log(result.data)
                this.setState({
                    isLoaded: true,
                    categorySets: result.data,
                });
            })
            .catch(function (error) {
                console.log(error);
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
                        <Zoom>
                            <CategorySetCard categorySet={categorySet}/>
                        </Zoom>
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