import React, {Fragment} from 'react';
import Answers from "./Answers";

class QuestionBox extends React.Component {
    state={
        error: null,
        isLoaded: false,
        questionData:[],
    }

    componentDidMount() {
        fetch("http://wiproh20-owerlen.enterpriselab.ch:8080/api/v1/questions", {
            method: "GET", // *Type of request GET, POST, PUT, DELETE
            mode: "no-cors", // Type of mode of the request
            cache: "no-cache", // options like default, no-cache, reload, force-cache
            credentials: "same-origin", // options like include, *same-origin, omit
            headers: {
                "Content-Type": "application/json" // request content type
            },
            redirect: "follow", // manual, *follow, error
            referrerPolicy: "no-referrer", // no-referrer, *client
            // body: JSON.stringify(data) // Attach body with the request
        })
            .then(res => res.json())
            .then(
                (result) => {
                    this.setState({
                        isLoaded: true,
                        questionData: result.items
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
                <section className="questionBox">
                {
                    this.state.questionData.map( data => {
                        return <div key={ data.id} className="answer">
                            <h2> { data.quiz}</h2>
                            <Answers key={ data.id} rightAnswer={ data.rightAnswer} answers={ data.answers} />
                        </div>
                    })
                }
                </section>
            </Fragment>
        );
    }
}

export default QuestionBox;