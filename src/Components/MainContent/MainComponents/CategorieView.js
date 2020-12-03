import React from "react";
import withStyles from "@material-ui/core/styles/withStyles";
import Grid from "@material-ui/core/Grid";
import CategoryCard from "../Utils/CategoryCard";
import ApiRequests, {urlTypes} from "../../../Services/AuthService/ApiRequests";
import Loader from "../Utils/Loader";
import {changeNavigationPage} from "../../../Redux/Actions/navigationActions";
import {connect} from "react-redux";
import Zoom from 'react-reveal/Zoom';
import TransitionGroup from 'react-transition-group/TransitionGroup';

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

function mapDispatchToProps(dispatch) {
    return {
        changeNavigationPage: actualPage => dispatch(changeNavigationPage(actualPage))
    };
}

class CategorieView extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            categories: [],
            isLoaded: false,
        }
    }

    componentDidMount() {
        ApiRequests.apiGetRequest(urlTypes.CATEGORIES)
            .then(result => {
                console.log(result.data)
                this.setState({
                    isLoaded: true,
                    categories: result.data,
                });
            })
            .catch(function (error) {
                console.log(error);
                // TODO: Make an Error Screen Component!!!
            })
            .finally(function () {
                console.log("Made Category Request")
            });
    }

    render() {
        const {error, isLoaded, categories} = this.state;
        const { classes } = this.props
        if (error) {
            return <div>Error: {error.message}</div>;
        } else if (!isLoaded) {
            return <Loader/>
        } else {
            let categoryItems = [];
            categories.map((category) => {
                categoryItems.push(

                        <Grid item xs={12} sm={6} md={4} lg={3} justify="space-around">
                            <Zoom key={category.id}>
                                <CategoryCard category={category}/>
                            </Zoom>
                        </Grid>
                )
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
const CategoryViewDefault = connect(null, mapDispatchToProps)(CategorieView)

export default withStyles(myStyles)(CategoryViewDefault);