import React, { Fragment } from 'react';
import { ThemeProvider } from 'styled-components';
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from 'react-router-dom'




import { useTranslation } from 'react-i18next'

import GlobalStyles from './index.css';


import theme from 'utils/theme';

//dzieki jsconfig.json
import { Navigation, Wrapper, LoadingIndicator, Button } from 'components'



import Budget from 'pages/Budget'



//odbieramy w propsach budget ze store'a oraz fetchbudget tzn akcje 
function App() {


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
            <Route path="/budget">
              <Budget />
            </Route>
          </Switch>
        </Wrapper>

      </Router>
    </Fragment>

  );
}

//pierwszy mowi, ze przekazujemy do naszego komponentu dane z reduxowego statu w tym przypadku budget drugi argument to obiekt z naszymi akcjami (funkcjami)



function RootApp() {
  return (
    <ThemeProvider theme={theme}>
      <React.Suspense fallback={<LoadingIndicator />}>
        <App />
      </React.Suspense>
    </ThemeProvider>
  )
}

export default RootApp;

