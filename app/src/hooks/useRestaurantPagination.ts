import { useSelector, useDispatch } from 'react-redux'
import { RootState } from 'store/reducers'
import { RestaurantState } from 'store/reducers/stateTypes'
import { useCallback } from 'react'
import { setCurrentPageNumber } from 'store/actions/restaurantActions'

export default function useRestaurantPagination() {
  const {
    pgnCurrentPageNumber,
    pgnRowCountPerPage,
    pgnTotalPageCount,
  } = useSelector<RootState, RestaurantState>((st) => st.restaurant)
  const dp = useDispatch()

  const nextPage = useCallback(() => {
    if (pgnCurrentPageNumber < pgnTotalPageCount) {
      dp(setCurrentPageNumber(pgnCurrentPageNumber + 1))
    }
  }, [dp, pgnCurrentPageNumber, pgnTotalPageCount])

  const prevPage = useCallback(() => {
    if (pgnCurrentPageNumber > 1) {
      dp(setCurrentPageNumber(pgnCurrentPageNumber - 1))
    }
  }, [dp, pgnCurrentPageNumber])

  const gotoPage = useCallback(
    (pageNumber) => {
      if (pageNumber >= 1 && pageNumber <= pgnTotalPageCount) {
        dp(setCurrentPageNumber(pageNumber))
      }
    },
    [dp, pgnTotalPageCount]
  )

  return {
    pgnCurrentPageNumber,
    pgnRowCountPerPage,
    pgnTotalPageCount,
    nextPage,
    prevPage,
    gotoPage,
  }
}
