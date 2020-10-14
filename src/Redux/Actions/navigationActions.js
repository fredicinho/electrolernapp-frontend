let navigationStart = "HOME"

export const changeNavigationState = navigationState => ({
   type: 'CHANGE_NAVIGATIONSTATE',
   navigationState
});

export const NavigationStates = {
    HOME: "HOME",
    EXERCISES: "EXERCISES",
    EXAMS: "EXAMS",
    STATISTICS: "STATISTICS",
    DEMO: "DEMO"
}