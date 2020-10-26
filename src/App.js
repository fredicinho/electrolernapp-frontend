import React, {Fragment} from 'react';
import Content from "./Components/MainContent/MainContent";
import AuthenticationRequests from "./Services/AuthService/AuthenticationRequests";
import MainContent from "./Components/MainContent/MainContent";
import StartPage from "./Components/FrontPage/StartPage";



class App extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            currentUser: undefined
        };
    }


    componentDidMount() {
        const user = AuthenticationRequests.getCurrentUser();
        if (user) {
            this.setState({
                currentUser: user
            })
        }
    }

    render() {
        return(
            <div>
         {
                this.state.currentUser ? (
                    <MainContent/>
                ) : (
                    <StartPage/>
                )
            }

            </div>
        );
    }
}

export default App;
