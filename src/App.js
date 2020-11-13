import React, {Fragment} from 'react';
import AuthenticationRequests from "./Services/AuthService/AuthenticationRequests";
import MainContent from "./Components/MainContent/MainContent";
import StartPage from "./Components/FrontPage/StartPage";
import ApiRequests, {urlTypes} from "./Services/AuthService/ApiRequests";



class App extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            isAuthenticated: false,
            currentUser: undefined,
            redirectToLogin: false,
        };

    }


    componentDidMount() {
        const user = AuthenticationRequests.getCurrentUser();
        if (user) {
            ApiRequests.apiGetRequest(urlTypes.QUESTIONS + "user")
                .then(response => {
                    if (response.status === 200) {
                        console.log(response)
                        this.setState({
                            isAuthenticated: true,
                            currentUser: user,
                        })
                    } else {
                        window.history.push("/signin");
                        window.location.reload();
                    }
                })
                .catch(error => {
                    console.log(error)
                    this.setState({
                        isAuthenticated: false,
                        redirectToLogin: true,
                    })
                })
        }
    }

    render() {
        return(
            <div>
         {
                this.state.isAuthenticated ? (
                    <MainContent/>
                ) : (
                    <StartPage redirect={this.state.redirectToLogin}/>
                )
            }

            </div>
        );
    }
}

export default App;
