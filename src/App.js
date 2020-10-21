import React, {Fragment} from 'react';
import ContentWrapper from "./Components/Content";
import store from "./Redux/Store/index"
import { Provider } from 'react-redux'


class App extends React.Component {
    render() {
        return(
            <Provider store={store}>
                <ContentWrapper/>
            </Provider>
        );
    }
}

export default App;
