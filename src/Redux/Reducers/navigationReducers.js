import { NavigationActions, NavigationStates } from "../Actions/navigationActions";

const initialNavigationState = {
    navigationItems: [],
    actualPage: NavigationStates.HOME,
}


function navigationReducer(state = initialNavigationState, action) {
    switch (action.type) {
        case NavigationActions.CHANGE_NAVIGATIONPAGE:
            return Object.assign({}, state, {
                ...state,
                actualPage: action.payload.actualPage
            })
        default:
            return state
    }
}

export default navigationReducer;