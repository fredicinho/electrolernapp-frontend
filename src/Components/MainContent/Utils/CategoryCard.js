import React from "react";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardMedia from "@material-ui/core/CardMedia";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";
import CardActions from "@material-ui/core/CardActions";
import Button from "@material-ui/core/Button";
import Card from "@material-ui/core/Card";
import withStyles from "@material-ui/core/styles/withStyles";
import {selectCategorySet} from "../../../Redux/Actions/categorySetActions";
import {connect} from "react-redux";
import { Redirect } from 'react-router';


const myStyles = theme => ({
    root: {
        maxWidth: 500,
        padding: theme.spacing(2),
    },
    media: {
        height: 140,
    },
});

function mapDispatchToProps(dispatch) {
    return {
        selectCategorySet: categorySet => dispatch(selectCategorySet(categorySet))
    };
}

class CategoryCard extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            redirect: false,
        }
        this.handleToggleForSets = this.handleToggleForSets.bind(this);
    }

    handleToggleForSets(event) {
        event.preventDefault();
        const selectedCategory = {
            selectedCategory: this.props.category.name,
            selectedCategorySetUrl: this.props.category.links[0].href,
        }
        this.props.selectCategorySet(selectedCategory)
        this.setState({redirect: true});
    }


    render() {
        const { classes, title } = this.props;
        if (this.state.redirect) {
            return <Redirect push to="/categorySets" />;
        } else {
            return (
                <Card className={classes.root}>
                    <CardActionArea>
                        <CardMedia
                            className={classes.media}
                            //image="/static/images/cards/contemplative-reptile.jpg"
                            title={title}
                        />
                        <CardContent>
                            <Typography gutterBottom variant="h5" component="h2">
                                {this.props.category.name}
                            </Typography>
                            <Typography variant="body2" color="textSecondary" component="p">
                                TODO: this.props.description showing here
                                Lizards are a widespread group of squamate reptiles, with over 6,000 species, ranging
                                across all continents except Antarctica
                            </Typography>
                        </CardContent>
                    </CardActionArea>
                    <CardActions>
                        <Button size="small" color="primary" onClick={this.handleToggleForSets}>
                            Übungssets
                        </Button>
                    </CardActions>
                </Card>
            );
        }
    }


}

const CategoryCardView = connect(null, mapDispatchToProps)(CategoryCard)

export default withStyles(myStyles)(CategoryCardView);