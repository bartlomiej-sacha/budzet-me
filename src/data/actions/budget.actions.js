import API from 'data/fetch'

import {

    BUDGET_GET,


    BUDGETED_CATEGORIES_GET


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

