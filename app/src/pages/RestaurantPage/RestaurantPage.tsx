import React from 'react'
import { useRouteMatch, Route } from 'react-router-dom'
import classes from './RestaurantPage.module.scss'
import RestaurantInformation from 'components/Restaurant/RestaurantInformation'

export default function RestaurantPage() {
  const match = useRouteMatch()
  console.log(match)

  return (
    <div className={classes.root}>
      <Route path={`${match.path}/:name`}>
        <RestaurantInformation></RestaurantInformation>
      </Route>
    </div>
  )
}
