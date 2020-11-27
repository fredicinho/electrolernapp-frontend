import {Exam, ExamActions} from "../Actions/examActions";
import {urlTypes} from "../../Services/AuthService/ApiRequests";

const initialExam = {
    selectedExamTitle: Exam.ALL,
    selectedExamUrl: urlTypes.EXAMSET,
    urlOfClassesInExam: "",
}


function examReducer(state = initialExam, action) {
    switch (action.type) {
        case ExamActions.SELECT_EXAM:
            console.log(action)
            return {
                ...state,
                selectedExamTitle: action.payload.selectedExamTitle,
                selectedExamId: action.payload.selectedExamId,
                selectedExamUrl: action.payload.selectedExamUrl,
            }
        case ExamActions.SELECT_EXAMREVIEW:
            console.log(action)
            return {
                ...state,
                selectedExamTitle: action.payload.selectedExamTitle,
                selectedExamId: action.payload.selectedExamId,
                urlOfClassesInExam: action.payload.urlOfClassesInExam,
            }
        default:
            return state
    }
}

export default examReducer;