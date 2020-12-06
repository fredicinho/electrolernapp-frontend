
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
    EXAM: "EXAM",
    STATISTICS: "STATISTICS",
    DEMO: "DEMO",
    CATEGORIES: "KATEGORIES",
    EXERSICESETS: "EXERSICESETS",
    CATEGORYSETS: "CATEGORYSETS",
    CREATE_EXAM: "CREATE_EXAM",
    CREATE_SCHOOLCLASS: "CREATE_SCHOOLCLASS",
    CREATE_INSTITUTION: "CREATE_INSTITUTION",
    CREATE_QUESTION: "CREATE_QUESTION",
    REVISE_EXAM: "REVISE_EXAM",
    IMPORT_USERS: "IMPORT_USERS",
    CREATE_USER: "CREATE_USERS",
    EDIT_SCHOOLCLASS: "EDIT_SCHOOLCLASS",
    EXPORT: "EXPORT",
    MY_PROFILE: "MY_PROFILE",
}