import React from 'react'



import { useQuery, useMutation, queryCache } from 'react-query';
import { useHistory } from 'react-router-dom'
import API from 'data/fetch'

import { toast } from 'react-toastify';

//sciezka relatywna bo sa ze soba scisle zwiazane
import AddTransactionForm from './AddTransactionFrom'

function AddTransactionView() {
    //kluczem danych jest budget ktory my ustalamy
    const { data: budget } = useQuery(['budget', { id: 1 }], API.budget.fetchBudget)
    const { data: allCategories } = useQuery('allCategories', API.common.fetchAllCategories)

    const [mutate] = useMutation(API.budget.addTransaction, {
        onSuccess: () => {
            queryCache.invalidateQueries('budget')


            toast.success("Transaction has been added!");
        },
    })



    const history = useHistory();

    const handleSubmitAddTransaction = async (values) => {

        try {
            await mutate({ budgetId: budget.id, data: values })
            history.goBack();
        } catch (error) {
            console.log('ojjojojo')
        }



    }



    return (
        <AddTransactionForm
            categories={allCategories}
            groupCategoriesBy={'parentCategory.name'}
            onSubmit={handleSubmitAddTransaction} />
    )
}

export default AddTransactionView;