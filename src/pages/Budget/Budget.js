import React, { useEffect, useMemo } from 'react'
import { fetchBudget, fetchBudgetedCategories, addTransaction } from 'data/actions/budget.actions'
import { fetchAllCategories } from 'data/actions/common.actions'

import { connect } from 'react-redux'
import AddTransactionForm from 'pages/Budget/components/AddTransactionForm'

import { Grid } from './Budget.css'
import { LoadingIndicator, Modal, Button } from 'components'


import BudgetCategoryList from 'pages/Budget/components/BudgetCategoryList'
import BudgetTransactionList from './components/BudgetTransactionList'
import { Fragment } from 'react'
import { Switch, Route, useHistory } from 'react-router-dom'

function Budget({
    commonState, budgetState, allCategories, budget,
    fetchBudget, fetchBudgetedCategories, fetchAllCategories, addTransaction
}) {


    const history = useHistory();


    useEffect(() => {
        fetchBudget(1);
        fetchBudgetedCategories(1);
        fetchAllCategories()


        /* kiedy unmount
        return() => {
          console.log(yoo);
        } */

    }, [fetchBudget, fetchBudgetedCategories, fetchAllCategories])

    const isLoaded = useMemo(
        () => (!!commonState && Object.keys(commonState).length === 0) && (!!budgetState && Object.keys(budgetState).length === 0),
        [commonState, budgetState]
    );


    const handleSubmitAddTransaction = (values) => {
        addTransaction({
            budgetId: budget.id,
            data: values
        }).then(() => {
            history.goBack();
        })
    }


    // grid sie zawsze renderuje natomiast switch sie wyrenderuje tylko jak wejdziemy na routa url 
    return (

        <Fragment>
            <Grid>

                <section>
                    {isLoaded ? <BudgetCategoryList /> : <LoadingIndicator />}
                </section>
                <section>
                    {isLoaded ?
                        <Fragment>
                            <Button to="/budget/transactions/new">Add new transaction</Button>
                            <BudgetTransactionList />
                        </Fragment>
                        : <LoadingIndicator />}
                </section>

            </Grid>



            <Switch>
                <Route path="/budget/transactions/new">
                    <Modal>
                        <AddTransactionForm
                            categories={allCategories}
                            groupCategoriesBy={'parentCategory.name'}
                            onSubmit={handleSubmitAddTransaction} />
                    </Modal>
                </Route>
            </Switch>
        </Fragment>

    )
}


export default connect(state => {
    return {
        budget: state.budget.budget,
        commonState: state.common.loadingState,
        budgetState: state.budget.loadingState,
        allCategories: state.common.allCategories
    }
}, {
    fetchBudget,
    fetchBudgetedCategories,
    fetchAllCategories,
    addTransaction,
})(Budget)
