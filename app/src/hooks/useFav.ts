import { useSelector, useDispatch } from 'react-redux'
import { RootState } from 'store/reducers'
import { FavState } from 'store/reducers/stateTypes'
import backendFunctions from 'services/firebase/functions'
import useAuthManager from './useAuthManager'
import { useCallback } from 'react'
import { setCurrentFavCollections } from 'store/actions/favoriteActions'

export default function useFav() {
  const dp = useDispatch()
  const { currentUser } = useAuthManager()
  const { currentFavCollections } = useSelector<RootState, FavState>(
    (st) => st.fav
  )

  const getFav = useCallback(async () => {
    if (currentUser && currentUser.email) {
      const res = await backendFunctions.getFav({
        userEmail: currentUser?.email,
      })
      const { data } = res
      if (data) {
        dp(setCurrentFavCollections(data))
      } else {
        dp(setCurrentFavCollections([]))
      }
      console.log(res)
    }
  }, [currentUser, dp])

  const addFavCollection = useCallback(
    async (favCollectionName: string) => {
      if (
        currentUser &&
        currentUser.email &&
        favCollectionName.trim().length > 0
      ) {
        const res = await backendFunctions.addFavCollection({
          userEmail: currentUser.email,
          favCollectionName,
        })
        getFav()
        return res
      }
    },
    [currentUser, getFav]
  )

  const addFav = useCallback(
    async (
      favCollectionId: string,
      restaurantId: string,
      restaurantName: string
    ) => {
      const res = await backendFunctions.addFav({
        favCollectionId,
        restaurantId,
        restaurantName,
      })
      getFav()
      return res
    },
    [getFav]
  )

  const delFavCollection = useCallback(
    async (favCollectionId: string) => {
      const res = await backendFunctions.delFavCollection({
        favCollectionId,
      })
      getFav()
      return res
    },
    [getFav]
  )

  return {
    currentFavCollections,
    addFavCollection,
    addFav,
    getFav,
    delFavCollection,
  }
}
