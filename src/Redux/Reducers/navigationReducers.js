import { NavigationActions, NavigationStates } from "../Actions/navigationActions";

const initialNavigationState = {
    actualPage: NavigationStates.HOME,
}


function navigationReducer(state = initialNavigationState, action) {
    switch (action.type) {
        case NavigationActions.CHANGE_NAVIGATIONPAGE:
            console.log("New State in Reducer: ", action.payload)
            return {
                ...state,
                actualPage: action.payload
            }
        default:
            return state
    }
}

export default navigationReducer;