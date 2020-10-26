import React from "react";
import Button from "@material-ui/core/Button";

class StartPageContent extends React.Component {
    render() {
        return(
            <div className="container">
                <body className="jumbotron">
                <p className="mainTitle">Super awesome Title</p>
                <p className="mainText">Super awesome main description</p>

                <Button variant="contained" color="primary"> Getting Started </Button>
                <Button variant="contained" color="primary" href="/demo"> Demo </Button>
                </body>
            </div>
        );
    }
}

export default StartPageContent;