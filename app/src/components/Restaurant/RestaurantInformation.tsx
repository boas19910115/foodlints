import React, { useEffect, useState } from 'react'
import { useRouteMatch } from 'react-router-dom'
import classes from './RestaurantInformation.module.scss'
import { useRestaurant } from 'hooks/useRestaurant'
import backendFunctions from 'services/firebase/functions'
import { Restaurant, OpenTimeWeekCalendar } from 'types/restaurant.type'
import { Table, Card } from 'react-bootstrap'
import { WEEK_DAY_MAP } from 'consts'
import { convertDateTimeToTimeTxt } from './helper'
import InputToAddFav from 'components/Fav/InputToAddFav'

export default function RestaurantInformation() {
  const [restaurantData, setRestaurantData] = useState<Restaurant | null>(null)
  const match = useRouteMatch()
  const { name }: Record<string, string> = match.params

  const { getRestaurantByName } = useRestaurant()
  useEffect(() => {
    getRestaurantByName(name).then(async (data: Restaurant) => {
      if (data) {
        const {
          data: [openTimeWeekCalendar],
        }: {
          data: OpenTimeWeekCalendar[]
        } = await backendFunctions.getOpenTimeListByRestaurantId(data.id)
        setRestaurantData({
          ...data,
          openTimeWeekCalendar,
        })
      } else {
        setRestaurantData({
          name: '',
          id: '',
          openTimeWeekCalendar: {} as OpenTimeWeekCalendar,
        })
      }
    })
  }, [getRestaurantByName, name])

  return (
    <div className={classes.root}>
      <Card>
        <Card.Header>{name || restaurantData?.name}</Card.Header>
        <Card.Body>
          <Card.Title>Open date time</Card.Title>
          <Table striped bordered hover>
            <thead>
              <tr>
                {Object.values(WEEK_DAY_MAP)
                  .slice(0, 7)
                  .map((txt) => (
                    <td key={txt}>{txt}</td>
                  ))}
              </tr>
            </thead>
            <tbody>
              <tr>
                {Object.values(WEEK_DAY_MAP)
                  .slice(0, 7)
                  .map((txt) => {
                    if (restaurantData?.openTimeWeekCalendar[txt]) {
                      return (
                        <th key={txt}>
                          {`${convertDateTimeToTimeTxt(
                            restaurantData?.openTimeWeekCalendar[txt].startTime
                          )} - ${convertDateTimeToTimeTxt(
                            restaurantData?.openTimeWeekCalendar[txt].endTime
                          )}`}
                        </th>
                      )
                    } else {
                      return <th key={txt}>{'Close'}</th>
                    }
                  })}
              </tr>
            </tbody>
          </Table>
          {}
          <InputToAddFav
            restaurantData={restaurantData || null}
          ></InputToAddFav>
        </Card.Body>
      </Card>
    </div>
  )
}
