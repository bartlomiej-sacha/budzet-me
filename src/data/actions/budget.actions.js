import API from 'data/fetch'

import {

    BUDGET_GET,


    BUDGETED_CATEGORIES_GET,

    SET_SELECTED_PARENT_CATEGORY_ID,


    BUDGET_TRANSACTION_ADD,


} from 'data/constants'


//sam promise to skrot od promise: promise
export const fetchBudget = (id) => {

    const promise = API.budget.fetchBudget(id);

    return ({
        type: BUDGET_GET,
        promise
    })



}


//dispatch akcje BUDGET_GET_REQUEST

// wykonac request do api
// dispatch akcje get success + przekazac dane z requestu  






export const fetchBudgetedCategories = (id) => {
    const promise = API.budget.fetchBudgetedCategories(id);

    return ({

        type: BUDGETED_CATEGORIES_GET,
        promise,
    })



}



export const addTransaction = ({ budgetId, data }) => {
    const promise = API.budget.addTransaction({
        budgetId,
        data,

    });



    return {
        type: BUDGET_TRANSACTION_ADD,
        promise,
        successMessage: 'Transaction has been added!',
    }
}


export const selectParentCategory = (id) => {
    return {
        type: SET_SELECTED_PARENT_CATEGORY_ID,
        payload: id,
    }
}