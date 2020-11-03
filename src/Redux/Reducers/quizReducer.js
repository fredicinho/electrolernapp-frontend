import {QuizActions} from "../Actions/quizActions";

const initialCategorySet = {
    selectedCategorySet: "",
    urlOfQuestions: "",
}


function quizReducer(state = initialCategorySet, action) {
    switch (action.type) {
        case QuizActions.SELECT_QUIZ:
            console.log(action)
            return {
                ...state,
                urlOfQuestions: action.payload.urlOfQuestions,
                selectedCategorySet: action.payload.selectedCategorySet,
            }
        default:
            return state
    }
}

export default quizReducer;