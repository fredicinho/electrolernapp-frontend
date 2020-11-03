
export function selectCategorySet(payload) {
    return { type: CategorySetActions.SELECT_CATEGORYSET, payload }
};

export const CategorySetActions = {
    SELECT_CATEGORYSET: "SELECT_CATEGORYSET",
}

export const CategorySet = {
    ALL: "ALL_CATEGORYSETS",
}