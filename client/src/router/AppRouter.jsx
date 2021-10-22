import React from 'react';
import { useSelector } from 'react-redux';
import { privateRoutes, publicRoutes } from './routes';
import { Switch, Route, Redirect } from 'react-router-dom';
function AppRouter() {
  const isAuth = useSelector((state) => state.user.isAuth);
  console.log('isAuth:', isAuth);
  return isAuth ? (
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
    <Switch>
      {publicRoutes.map((route) => (
        <Route
          key={route.path}
          component={route.component}
          path={route.path}
          exact={route.exact}
        />
      ))}
      <Redirect to="/login" />
    </Switch>
  );
}

export default AppRouter;
