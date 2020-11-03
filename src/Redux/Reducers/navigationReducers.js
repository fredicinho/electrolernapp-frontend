import { NavigationActions, NavigationStates } from "../Actions/navigationActions";

const initialNavigationState = {
    actualPage: NavigationStates.HOME,
}


function navigationReducer(state = initialNavigationState, action) {
    console.log("New State: " + state.actualPage)
    switch (action.type) {
        case NavigationActions.CHANGE_NAVIGATIONPAGE:
            return {
                ...state,
                actualPage: action.payload
            }
        default:
            return state
    }
}

export default navigationReducer;