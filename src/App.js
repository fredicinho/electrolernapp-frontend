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
            ApiRequests.apiGetRequest(urlTypes.CATEGORIES)
                .then(response => {
                    if (response.status === 200) {
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
                    console.log(error.message)
                    this.setState({
                        isAuthenticated: false,
                        redirectToLogin: true,
                    })
                })
            ApiRequests.apiGetRequest(urlTypes.CHECKAUTH)
                .then((response) => {
                    this.setState({
                        isAdminOrTeacher: response.status === 200,
                    })
                })
                .catch((error) => {
                    console.log(error);
                    this.setState({
                        isAdminOrTeacher: false,
                    })
                });
        }
    }

    render() {
        return(
            <div>
         {
                this.state.isAuthenticated ? (
                    <MainContent isAdminOrTeacher={this.state.isAdminOrTeacher}/>
                ) : (
                    <StartPage redirect={this.state.redirectToLogin} isAdminOrTeacher={this.state.isAdminOrTeacher}/>
                )
            }

            </div>
        );
    }
}

export default App;
