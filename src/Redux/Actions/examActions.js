
export function selectExam(payload) {
    return { type: ExamActions.SELECT_EXAM, payload }
};

export function selectExamReview(payload) {
    return { type: ExamActions.SELECT_EXAMREVIEW, payload}
}

export function selectExamView(payload) {
    return { type: ExamActions.SELECT_EXAMVIEW, payload}
}

export const ExamActions = {
    SELECT_EXAM: "SELECT_EXAM",
    SELECT_EXAMREVIEW: "SELECT_EXAMREVIEW",
    SELECT_EXAMVIEW: "SELECT_EXAMVIEW",
}

export const Exam = {
    ALL: "ALL_EXAMS",
}