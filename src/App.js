import React, {Fragment} from 'react';
import ContentWrapper from "./Components/ContentWrapper";
import {createStore} from 'redux'
import rootReducer from './Redux/Reducers'
import { Provider } from 'react-redux'

const store = createStore(rootReducer)

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
