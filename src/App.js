import React, { Fragment, useEffect } from 'react';
import { ThemeProvider } from 'styled-components';
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from 'react-router-dom'


import { connect } from 'react-redux'
import { fetchBudget, fetchBudgetedCategories } from 'data/actions/budget.actions'

import { useTranslation } from 'react-i18next'

import GlobalStyles from './index.css';


import theme from 'utils/theme';

//dzieki jsconfig.json
import { Navigation, Wrapper, LoadingIndicator, Button } from 'components'



//odbieramy w propsach budget ze store'a oraz fetchbudget tzn akcje 
function App({ budget, fetchBudget, fetchBudgetedCategories }) {
  useEffect(() => {
    fetchBudget(1)
    fetchBudgetedCategories(1)


    /* kiedy unmount
    return() => {
      console.log(yoo);
    } */

  }, [fetchBudget, fetchBudgetedCategories])
  console.log(budget);
  const { t, i18n } = useTranslation();
  return (
    //cos jak div ktory wszystko wrappuje ale nie renderujemy dodatkowego diva
    <Fragment>


      <GlobalStyles />


      <Router>
        <Navigation items={[
          { content: 'Homepage', to: '/' },
          { content: 'Budget', to: '/budget' }
        ]}
          RightElement={(
            <div>
              <Button variant="regular" onClick={() => i18n.changeLanguage('pl')}>pl</Button>
              <Button variant="regular" onClick={() => i18n.changeLanguage('en')}>en</Button>


            </div>
          )}
        ></Navigation>

        <Wrapper>
          <Switch>
            <Route exact path="/">HomePage</Route>
            <Route path="/budget">Budget page</Route>
          </Switch>
        </Wrapper>

      </Router>
    </Fragment>

  );
}

//pierwszy mowi, ze przekazujemy do naszego komponentu dane z reduxowego statu w tym przypadku budget drugi argument to obiekt z naszymi akcjami (funkcjami)
const ConnectedApp = connect(state => {
  return {
    budget: state.budget.budget
  }
}, {
  fetchBudget,
  fetchBudgetedCategories
})(App)


function RootApp() {
  return (
    <ThemeProvider theme={theme}>
      <React.Suspense fallback={<LoadingIndicator />}>
        <ConnectedApp />
      </React.Suspense>
    </ThemeProvider>
  )
}

export default RootApp;

