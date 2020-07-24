import React, { useEffect } from 'react'
import SearchInputField from 'components/SearchInputField'
import classes from './HomePage.module.scss'
import DateTimePicker from 'components/DateTimePicker'
import { useLocation } from 'react-router-dom'
import RestaurantListTable from 'components/Restaurant/RestaurantListTable'
import { useRestaurant } from 'hooks/useRestaurant'

export default function HomePage() {
  const { getRestaurantByDateTime } = useRestaurant()
  const location = useLocation<{
    millis: string
  }>()
  useEffect(() => {
    if (location.state) {
      const { millis } = location.state
      const millisParsed = +millis
      console.log(millisParsed)
      getRestaurantByDateTime({ millis: millisParsed })
    }
  }, [getRestaurantByDateTime, location])

  return (
    <div className={classes.root}>
      <SearchInputField></SearchInputField>
      <DateTimePicker></DateTimePicker>
      <RestaurantListTable></RestaurantListTable>
    </div>
  )
}
