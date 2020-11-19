import {Exam, ExamActions} from "../Actions/examActions";
import {urlTypes} from "../../Services/AuthService/ApiRequests";

const initialExam = {
    selectedExam: Exam.ALL,
    selectedExamUrl: urlTypes.EXAMSET,
}


function examReducer(state = initialExam, action) {
    switch (action.type) {
        case ExamActions.SELECT_EXAM:
            console.log(action)
            return {
                ...state,
                selectedCategorySetUrl: action.payload.selectedCategorySetUrl,
                selectedCategory: action.payload.selectedCategory,
            }
        default:
            return state
    }
}

export default examReducer;