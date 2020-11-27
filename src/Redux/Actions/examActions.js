
export function selectExam(payload) {
    return { type: ExamActions.SELECT_EXAM, payload }
};

export function selectExamReview(payload) {
    return { type: ExamActions.SELECT_EXAMREVIEW, payload}
}

export const ExamActions = {
    SELECT_EXAM: "SELECT_EXAM",
    SELECT_EXAMREVIEW: "SELECT_EXAMREVIEW",
}

export const Exam = {
    ALL: "ALL_EXAMS",
}