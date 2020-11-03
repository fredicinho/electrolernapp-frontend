import React from "react";
import Button from "@material-ui/core/Button";
import Container from "@material-ui/core/Container";

class StartPageContent extends React.Component {
    render() {
        return(
            <Container maxWidth="sm">
                <Button variant="contained" color="primary"> Getting Started </Button>
                <Button variant="contained" color="primary" href="/demo"> Demo </Button>
            </Container>
        );
    }
}

export default StartPageContent;