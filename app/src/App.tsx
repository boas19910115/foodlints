import React from 'react';
import classes from './App.module.scss';
import DefaultLayout from 'layouts/DefaultLayout';
import { Switch, Route } from 'react-router-dom';
import routeMap from 'routes/routeMap';

function App() {
  return (
    <div className={classes.App}>
      <Switch>
        {Object.values(routeMap).map((r) => (
          <Route exact key={r.name} path={r.path}>
            <DefaultLayout>
              <r.PageComponent></r.PageComponent>
            </DefaultLayout>
          </Route>
        ))}
      </Switch>
    </div>
  );
}

export default App;
