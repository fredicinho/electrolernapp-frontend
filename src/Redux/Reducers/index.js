import { combineReducers } from 'redux'
import navigationReducer from './navigationReducers'
import categorySetReducer from "./categorySetReducer";
import quizReducer from "./quizReducer";

// TODO: If more Reducers are used, we can combine them here

export default combineReducers({
    navigation: navigationReducer,
    categorySet: categorySetReducer,
    quiz: quizReducer,
})