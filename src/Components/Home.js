import React from 'react';
import "../CSS/Home.css"
import QuestionBox from "./QuestionBox";

class Home extends React.Component {
    render() {
        return (
            <main>
                <section className="home">
                    <p>This is a paragraph and I am writing on the home page</p>
                    <p>This is another paragraph, hi hey hello whatsup yo</p>
                </section>
                <QuestionBox/>
            </main>
        );
    }
}

export default Home;