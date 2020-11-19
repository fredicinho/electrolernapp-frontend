
export function selectExam(payload) {
    return { type: ExamActions.SELECT_EXAM, payload }
};

export const ExamActions = {
    SELECT_EXAM: "SELECT_EXAM",
}

export const Exam = {
    ALL: "ALL_EXAMS",
}