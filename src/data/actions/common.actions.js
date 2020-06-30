import API from 'data/fetch'

import {

    ALL_CATEGORIES_GET

} from 'data/constants'


//sam promise to skrot od promise: promise
export const fetchAllCategories = (id) => {

    const promise = API.common.fetchAllCategories();

    return ({
        type: ALL_CATEGORIES_GET,
        promise
    })



}
