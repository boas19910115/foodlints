import { useSelector, useDispatch } from 'react-redux'
import { RootState } from 'store/reducers'
import { useCallback, useMemo } from 'react'
import backendFunctions from 'services/firebase/functions'
import {
  setAllRestaurantNames,
  setRestaurantQueried,
} from 'store/actions/restaurantActions'
import useRestaurantPagination from './useRestaurantPagination'

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
      return backendFunctions
        .getRestaurantWeekdayTime({
          millis,
        })
        .then((res) => {
          dp(setRestaurantQueried(res.data))
          return res.data
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
