import React from 'react'
import { Table } from 'react-bootstrap'
import { RestaurantWeekday } from 'types/restaurant.type'
import { useRestaurant } from 'hooks/useRestaurant'
import classes from './RestaurantListTable.module.scss'
import { useHistory } from 'react-router-dom'
import RestaurantListTablePagination from './RestaurantListTablePagination'

interface RestaurantListTableProps extends React.Props<any> {
  restaurantData?: RestaurantWeekday[]
}

export default function RestaurantListTable(props: RestaurantListTableProps) {
  const hs = useHistory()
  const {
    currentPageRestaurants: restaurantsQueriedByDateTime,
  } = useRestaurant()
  return (
    <React.Fragment>
      <Table>
        <thead>
          <tr className={classes.headRow}>
            <th>Name</th>
            <th>Like</th>
          </tr>
        </thead>
        <tbody>
          {restaurantsQueriedByDateTime.map((data) => {
            return (
              <tr
                className={classes.bodyRow}
                onClick={() => {
                  hs.push(`/restaurant/${data.name}`)
                }}
                key={data.id}
              >
                <td>{data.name}</td>
                <td>none</td>
              </tr>
            )
          })}
        </tbody>
      </Table>
      <RestaurantListTablePagination></RestaurantListTablePagination>
    </React.Fragment>
  )
}
