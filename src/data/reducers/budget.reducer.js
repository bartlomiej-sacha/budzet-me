
import {


    SET_SELECTED_PARENT_CATEGORY_ID


} from 'data/constants'

//tylko akcje odpowiadajace za stan
const initialState = {

    selectedParentCategoryId: undefined,
}

//zawsze nowy obiekt state
function budget(state = initialState, action) {



    // loading ustawia sie po kluczu akcji [action.type] dlatego pozniej usuwamy delete newLoadingState.BUDGET_GET_REQUEST czyli usuwamy ten klucz
    switch (action.type) {


        case SET_SELECTED_PARENT_CATEGORY_ID:

            return {
                ...state,
                selectedParentCategoryId: action.payload
            }



        default:
            return state;

    }

}



export default budget;