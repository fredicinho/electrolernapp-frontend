import React, {Fragment} from "react";
import QuestionBox from "./QuestionBox";

class Demo extends React.Component {

    constructor(props) {
        super(props);
    }

    render() {
        return(
            <Fragment>
                <QuestionBox/>
            </Fragment>
        );
    }
}

export default Demo;