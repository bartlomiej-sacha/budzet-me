import React, { Fragment } from 'react'




import AddTransactionView from 'pages/Budget/components/AddTransactionForm'

import { Grid } from './Budget.css'
import { Modal, SuspenseErrorBoundary, Button } from 'components'


import BudgetCategoryList from 'pages/Budget/components/BudgetCategoryList'
import BudgetTransactionList from './components/BudgetTransactionList'

import { Switch, Route } from 'react-router-dom'




function Budget({

    fetchBudget, fetchBudgetedCategories, fetchAllCategories, addTransaction
}) {
















    // grid sie zawsze renderuje natomiast switch sie wyrenderuje tylko jak wejdziemy na routa url 


    //react suspense idzie od gornego komponentu w dol wiec jak w kilku miejscach tego uzyjemy to te wyzsze komponenty sie wyrenderuja przed nizszymi
    return (

        <Fragment>
            <Grid>

                <section>

                    <SuspenseErrorBoundary  >
                        <BudgetCategoryList />
                    </SuspenseErrorBoundary>
                </section>
                <section>

                    <SuspenseErrorBoundary >
                        <Button to="/budget/transactions/new">Add new transaction</Button>
                        <BudgetTransactionList />
                    </SuspenseErrorBoundary>

                </section>

            </Grid>



            <Switch>
                <Route exact path="/budget/transactions/new">
                    <Modal>
                        <AddTransactionView />


                    </Modal>
                </Route>
            </Switch>
        </Fragment>

    )
}


export default Budget;
