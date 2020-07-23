import React, { useEffect, useState } from 'react'
import { useRouteMatch } from 'react-router-dom'
import classes from './RestaurantInformation.module.scss'
import { useRestaurant } from 'hooks/useRestaurant'
import backendFunctions from 'services/firebase/functions'
import { Restaurant, OpenTime } from 'types/restaurant.type'
import { Table, Card } from 'react-bootstrap'
import GeneralButton from 'components/GeneralButton'
import { WEEK_DAY_MAP } from 'consts'

export default function RestaurantInformation() {
  const [restaurantData, setRestaurantData] = useState<Restaurant | null>(null)
  //   const [openTimeCalendarTable, setOpenTimeCalendarTable] = useState<
  //     Record<number, { startTime: string; endTime: string }[]>
  //   >()
  const match = useRouteMatch()
  const { name }: Record<string, string> = match.params

  const { getRestaurantByName } = useRestaurant()
  useEffect(() => {
    getRestaurantByName(name).then(async (data: Restaurant) => {
      const {
        data: openTimeList,
      }: {
        data: OpenTime[]
      } = await backendFunctions.getOpenTimeListByRestaurantId(data.id)
      setRestaurantData({
        ...data,
        openTimeList,
      })
      openTimeList.reduce((pre, cur) => {
        return {
          ...pre,
        }
      }, {})
    })
  }, [getRestaurantByName, name])

  return (
    <div className={classes.root}>
      <Card>
        <Card.Header>{restaurantData?.name}</Card.Header>
        <Card.Body>
          <Card.Title>Open date time</Card.Title>
          <Card.Text>
            <Table striped bordered hover>
              <thead>
                <tr>
                  {Object.values(WEEK_DAY_MAP)
                    .slice(0, 7)
                    .map((txt) => (
                      <th key={txt}>{txt}</th>
                    ))}
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>1</td>
                  <td>Mark</td>
                  <td>Otto</td>
                  <td>@mdo</td>
                </tr>
                <tr>
                  <td>2</td>
                  <td>Jacob</td>
                  <td>Thornton</td>
                  <td>@fat</td>
                </tr>
                <tr>
                  <td>3</td>
                  <td colSpan={2}>Larry the Bird</td>
                  <td>@twitter</td>
                </tr>
              </tbody>
            </Table>
          </Card.Text>
          <GeneralButton>Go somewhere</GeneralButton>
        </Card.Body>
      </Card>
    </div>
  )
}
