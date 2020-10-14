import { NavigationStates } from "../Actions/navigationActions";

const navigationState = (state = NavigationStates.HOME, action) => {
    switch (action.type) {
        case 'CHANGE_NAVIGATIONSTATE':
            return action.navigationState
        default:
            return state
    }
}

export default navigationState