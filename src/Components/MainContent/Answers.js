import React, {Fragment} from "react";

class Answers extends React.Component {

    state = {
        isClicked:false,
    };

    onAnswer = () => {
        this.setState({
            isClicked:true
        });
    };

    render() {
        return (
            <Fragment>
                { !this.state.isClicked ? this.props.answers.map(ans => {
                    return <button onClick={this.onAnswer}> {ans.answerPhrase} </button>;
                }) : <button > {this.props.rightAnswer.answerPhrase}</button>  }
            </Fragment>

        );
    }
}
export default Answers;