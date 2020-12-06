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
import electricity from "../../../images/electricity.webp";
import physic from "../../../images/physics.webp";
import logo from "../../../images/hsluLogo.png";
import math from "../../../images/mathematics.png";
import chemistry from "../../../images/chemistry.png";
import telephone from "../../../images/telephone.webp";
import metal from "../../../images/metal.jpg";
import conduct from "../../../images/conduct.jpg";
import fachzeichnen from "../../../images/fachzeichen.jpg";
import security from "../../../images/security.jpg";
import preperation from "../../../images/preperation.jpg";




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
        let image;
        switch (this.props.category.name) {
            case "Elektrotechnik":
                image = electricity
                break;
            case "Physik":
                image = physic;
                break;
            case "Mathematik":
                image = math;
                break;
            case "Chemie":
                image = chemistry;
                break;
            case "Telekommunikation":
                image = telephone;
                break;
            case "Werkstoffkunde":
                image = metal;
                break;
            case "NIN 2015":
                image = conduct;
                break;
            case "Fachzeichnen":
                image = fachzeichnen;
                break;
            case "Arbeitssicherheit":
                image = security;
                break;
            case "Vorbereitung QV":
                image = preperation;
                break;
            default:
                image = logo;
        }

        if (this.state.redirect) {
            return <Redirect push to="/categorySets" />;
        } else {
            return (
                <Card className={classes.root}>
                    <CardActionArea onClick={this.handleToggleForSets}>
                        <CardMedia
                            className={classes.media}
                            image={image}
                            title={title}
                        />
                        <CardContent>
                            <Typography gutterBottom variant="h5" component="h2">
                                {this.props.category.name}
                            </Typography>
                            <Typography variant="body2" color="textSecondary" component="p">

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