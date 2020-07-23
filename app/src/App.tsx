import React from 'react'
import classes from './App.module.scss'
import DefaultLayout from 'layouts/DefaultLayout'
import { Switch, Route } from 'react-router-dom'
import routeMap from 'routes/routeMap'
import PrivateRoute from 'components/PrivateRoute'

function App() {
  return (
    <div className={classes.App}>
      <Switch>
        {Object.values(routeMap).map((r) => (
          <Route exact={r.isExact} key={r.name} path={r.path}>
            <DefaultLayout isFlexLayoutContent={r.isFlexLayout}>
              {r.isPrivate ? (
                <PrivateRoute>
                  <r.PageComponent></r.PageComponent>
                </PrivateRoute>
              ) : (
                <r.PageComponent></r.PageComponent>
              )}
            </DefaultLayout>
          </Route>
        ))}
      </Switch>
    </div>
  )
}

export default App
