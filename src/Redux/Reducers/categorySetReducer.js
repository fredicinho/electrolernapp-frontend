import {CategorySet, CategorySetActions} from "../Actions/categorySetActions";
import {urlTypes} from "../../Services/AuthService/ApiRequests";

const initialCategorySet = {
    selectedCategorySet: CategorySet.ALL,
    selectedCategorySetUrl: urlTypes.CATEGORYSET,
}


function categorySetReducer(state = initialCategorySet, action) {
    switch (action.type) {
        case CategorySetActions.SELECT_CATEGORYSET:
            console.log(action)
            return {
                ...state,
                selectedCategorySetUrl: action.payload.selectedCategorySetUrl,
                selectedCategory: action.payload.selectedCategory,
            }
        default:
            return state
    }
}

export default categorySetReducer;