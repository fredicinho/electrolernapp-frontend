import React, {Fragment} from 'react';
import Answers from "./Answers";
import axios from "axios";


class QuestionBox extends React.Component {

    state={
        error: null,
        isLoaded: false,
        questionData:[],
    }

    componentDidMount() {
        axios.get('http://http://wiproh20-owerlen.enterpriselab.ch:8080/api/v1/questions')
            .then(res => {
                this.setState({
                    isLoaded: true,
                    questionData: res.data
                });
            })
            .catch(function (error) {
                // handle error
                console.log(error);
            })
            .finally(function () {
                // always executed
            });
        // http://wiproh20-owerlen.enterpriselab.ch:8080/api/v1/questions
    }

    render() {
        return(
            <Fragment>
                <section className="questionBox">
                {
                    this.state.questionData.map( data => {
                        return <div className="answer">
                            <h2> { data.questionphrase}</h2>
                            <Answers rightAnswer={ data.correctAnswer} answers={ data.possibleAnswers} />
                        </div>
                    })
                }
                </section>
            </Fragment>
        );
    }
}

export default QuestionBox;