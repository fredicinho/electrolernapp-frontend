
export function selectQuiz(payload) {
    return { type: QuizActions.SELECT_QUIZ, payload }
};

export const QuizActions = {
    SELECT_QUIZ: "SELECT_QUIZ",
}