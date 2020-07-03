
import React, { useState } from 'react'





import { Grid } from './Budget.css'
import { Modal, SuspenseErrorBoundary, Button } from 'components'

//CONTEXT
import BudgetContext from 'data/context/budget.context.js'

import { Switch, Route } from 'react-router-dom'

// import lazy w sources static js sa pobierane nasze pliki js bez react lazy jest jeden wielki ktory sie laduje na samym poczatku strony dzieki takiemu podejsciu mozemy podzielic (code-splitting) nasz kod js by sie pobieral tylko wtedy gdy jest to potrzebna myk jest taki, ze nasze komponenty musze byc owrapowane w react suspense
const BudgetCategoryList = React.lazy(() => import('./components/BudgetCategoryList'))
const AddTransactionView = React.lazy(() => import('pages/Budget/components/AddTransactionForm'))
const BudgetTransactionList = React.lazy(() => import('./components/BudgetTransactionList'))


function Budget() {




    const [showTransactions, setShowTransactions] = useState();











    // grid sie zawsze renderuje natomiast switch sie wyrenderuje tylko jak wejdziemy na routa url 


    //react suspense idzie od gornego komponentu w dol wiec jak w kilku miejscach tego uzyjemy to te wyzsze komponenty sie wyrenderuja przed nizszymi

    //CONTEXT
    return (

        <BudgetContext.BudgetProvider>
            <Grid>

                <section>

                    <SuspenseErrorBoundary  >
                        <BudgetCategoryList />
                    </SuspenseErrorBoundary>
                </section>
                <section>

                    <SuspenseErrorBoundary >
                        <Button to="/budget/transactions/new">Add new transaction</Button>
                        <Button onClick={() => setShowTransactions(!showTransactions)}>
                            {showTransactions ? 'Hide Transactions' : 'Show Transactions'}
                        </Button>

                        {showTransactions && (

                            <BudgetTransactionList />
                        )}

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
        </BudgetContext.BudgetProvider>

    )
}


export default Budget;
