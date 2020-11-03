import React, {Fragment} from "react";
import Exercise from "./Exercise";
import Quiz from "../Quiz/Quiz";
import { quiz1 } from "../MainContent/Exercise";
import Container from "@material-ui/core/Container";

class Demo extends React.Component {

    render() {
        return(
            <Fragment>
                <Container>
                    <Quiz quiz={quiz1}/>
                </Container>

            </Fragment>
        );
    }
}

export default Demo;