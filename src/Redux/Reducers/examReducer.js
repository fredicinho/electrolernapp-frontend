import {Exam, ExamActions} from "../Actions/examActions";
import {urlTypes} from "../../Services/AuthService/ApiRequests";

const initialExam = {
    selectedExamTitle: Exam.ALL,
    selectedExamUrl: urlTypes.EXAMSET,
    urlOfClassesInExam: "",
    urlOfQuestionsInExam: "",
}


function examReducer(state = initialExam, action) {
    switch (action.type) {
        case ExamActions.SELECT_EXAM:
            return {
                ...state,
                selectedExamTitle: action.payload.selectedExamTitle,
                selectedExamId: action.payload.selectedExamId,
                selectedExamUrl: action.payload.selectedExamUrl,
            }
        case ExamActions.SELECT_EXAMREVIEW:
            return {
                ...state,
                selectedExamTitle: action.payload.selectedExamTitle,
                selectedExamId: action.payload.selectedExamId,
                urlOfClassesInExam: action.payload.urlOfClassesInExam,
                urlOfQuestionsInExam: action.payload.urlOfQuestionsInExam,
            }
        default:
            return state
    }
}

export default examReducer;