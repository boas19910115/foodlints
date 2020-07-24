import { useSelector, useDispatch } from 'react-redux'
import { RootState } from 'store/reducers'
import { useCallback, useMemo } from 'react'
import backendFunctions from 'services/firebase/functions'
import {
  setAllRestaurantNames,
  setRestaurantQueried,
} from 'store/actions/restaurantActions'
import useRestaurantPagination from './useRestaurantPagination'
import * as lux from 'luxon'
import { WEEK_DAY_MAP } from 'consts'

function useRestaurant() {
  const { pgnCurrentPageNumber } = useRestaurantPagination()
  const dp = useDispatch()
  const {
    allRestaurantNames,
    restaurantsQueriedByDateTime,
    restaurantsQueriedByDateTimeDevied,
  } = useSelector((state: RootState) => {
    return state.restaurant
  })
  const setRestaurantNameList = useCallback(async () => {
    try {
      const res = await backendFunctions.getAllRestaurantNames()
      const names = res.data.names.sort()
      dp(setAllRestaurantNames(names))
    } catch (error) {
      console.log(error)
    }
  }, [dp])
  const getRestaurantByName = useCallback(async (name) => {
    const res = await backendFunctions.getRestaurant('name', name)
    const restaurant = res.data
    console.log(restaurant)

    return restaurant
  }, [])

  const getRestaurantByDateTime = useCallback(
    ({ millis }: { millis: number }) => {
      const baseDateTime = lux.DateTime.fromMillis(millis).startOf('day')
      const targetLuxDateTime = lux.DateTime.fromMillis(millis)
      const weekdayTxt = WEEK_DAY_MAP[targetLuxDateTime.get('weekday')]
      const absoluteMinutes = targetLuxDateTime.diff(baseDateTime, 'minutes')
        .minutes
      return backendFunctions
        .getRestaurantWeekdayTime({
          millis,
          weekdayTxt,
          absoluteMinutes,
        })
        .then((res) => {
          const sorted = res.data.sort((a: any, b: any) => {
            const nameA = a.name.toUpperCase() // ignore upper and lowercase
            const nameB = b.name.toUpperCase() // ignore upper and lowercase
            if (nameA < nameB) {
              return -1
            }
            if (nameA > nameB) {
              return 1
            }

            // names must be equal
            return 0
          })
          dp(setRestaurantQueried(sorted))
          return sorted
        })
    },
    [dp]
  )

  const currentPageRestaurants = useMemo(
    () => restaurantsQueriedByDateTimeDevied[pgnCurrentPageNumber - 1],
    [pgnCurrentPageNumber, restaurantsQueriedByDateTimeDevied]
  )

  return {
    allRestaurantNames,
    restaurantsQueriedByDateTime,
    setRestaurantNameList,
    getRestaurantByName,
    getRestaurantByDateTime,
    currentPageRestaurants,
  }
}

export { useRestaurant }
