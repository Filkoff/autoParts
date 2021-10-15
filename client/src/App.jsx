import React, { useEffect } from 'react';
import { BrowserRouter, Route, Switch, Redirect } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import Header from './components/header/Header/Header';
import styles from './App.module.scss';
import { auth } from './actions/user';
import { ThemeProvider } from '@material-ui/core';
import { getAllDealerParts } from './actions/dealer';
import { theme } from './styles/theme';
import { privateRoutes, publicRoutes } from './router/routes';
import { searchParts } from './actions/search';

function App() {
  const isAuth = useSelector((state) => state.user.isAuth);
  const dispatch = useDispatch();
  const reloadingData = () => {
    dispatch(auth());
    dispatch(getAllDealerParts());
    dispatch(searchParts());
  };

  useEffect(() => {
    reloadingData();
  }, []);

  return (
    <>
      <ThemeProvider theme={theme}>
        <BrowserRouter>
          <div className={styles.app}>
            <Header />
            <div className={styles.mainContent}>
              {isAuth ? (
                <Switch>
                  {privateRoutes.map((route) => (
                    <Route
                      key={route.path}
                      component={route.component}
                      path={route.path}
                      exact={route.exact}
                    />
                  ))}
                  <Redirect to="/main" />
                </Switch>
              ) : (
                <Redirect to="/login" />
              )}

              {
                <Switch>
                  {publicRoutes.map((route) => (
                    <Route
                      key={route.path}
                      component={route.component}
                      path={route.path}
                      exact={route.exact}
                    />
                  ))}
                </Switch>
              }
            </div>
          </div>
        </BrowserRouter>
      </ThemeProvider>
    </>
  );
}

export default App;
