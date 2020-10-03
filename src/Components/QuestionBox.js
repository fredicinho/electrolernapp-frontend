import React, {Fragment} from 'react';
import Answers from "./Answers";

class QuestionBox extends React.Component {
    state={
        error: null,
        isLoaded: false,
        dataQuestion:[
            {
                id: 1,
                quiz: "Beantworte diese scheiss Frage!!!",
                rightAnswer: "bla",
                answers: [
                    "hallo",
                    "bla",
                    "blaa",
                    "blaaa"
                ],

            },
        ],
    }

    componentDidMount() {
        fetch("http://wiproh20-owerlen.enterpriselab.ch:8080/api/v1/questions")
            .then(res => res.json())
            .then(
                (result) => {
                    this.setState({
                        isLoaded: true,
                        dataQuestion: result.items
                    });
                },
                // Note: it's important to handle errors here
                // instead of a catch() block so that we don't swallow
                // exceptions from actual bugs in components.
                (error) => {
                    this.setState({
                        isLoaded: true,
                        error
                    });
                }
            )
    }

    render() {
        return(
            <Fragment>
                {
                    this.state.dataQuestion.map( data => {
                        return <div key={ data.id} className="answer">
                            <h2> { data.quiz}</h2>
                            <Answers key={ data.id} rightAnswer={ data.rightAnswer} answers={ data.answers} />
                        </div>
                    })
                }
            </Fragment>
        );
    }
}

export default QuestionBox;