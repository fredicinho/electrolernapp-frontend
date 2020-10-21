
export function changeNavigationPage(payload) {
    return { type: NavigationActions.CHANGE_NAVIGATIONPAGE, payload }
};

export const NavigationActions = {
    CHANGE_NAVIGATIONPAGE: "CHANGE_NAVIGATIONPAGE",
}

export const NavigationStates = {
    HOME: "HOME",
    EXERCISES: "EXERCISES",
    EXAMS: "EXAMS",
    STATISTICS: "STATISTICS",
    DEMO: "DEMO"
}