import { fireFunctions } from './init'
import { User } from 'types/user.type'
import { WeekDayString } from 'types/restaurant.type'

async function errorHandler(func: Function, ...args: any[]) {
  try {
    const res = await func(...args)
    return res
  } catch (error) {
    return { data: null }
  }
}

interface FireFunctions<T = Promise<firebase.functions.HttpsCallableResult>>
  extends Record<string, (...props: any[]) => T> {
  getAllRestaurantNames: () => T
  getRestaurant: (where: string, is: string) => T
  addMember: (user: User) => T
  getOpenTimeListByRestaurantId: (restaurantId: string) => T
  getRestaurantWeekdayTime: (props: {
    millis?: number
    weekdayTxt: WeekDayString
    absoluteMinutes: number
  }) => T
  addFavCollection: (props: {
    userEmail: string
    favCollectionName: string
  }) => T
  addFav: (props: {
    favCollectionId: string
    restaurantId: string
    restaurantName: string
  }) => T
  getFav: (props: { userEmail: string }) => T
  delFavCollection: (props: { favCollectionId: string }) => T
  delFav: (props: { favCollectionId: string; restaurantId: string }) => T
}

const backendFunctionsTemp: FireFunctions = {
  getAllRestaurantNames: fireFunctions.httpsCallable('allRestaurantNames'),
  getRestaurant: (where, is) => {
    const getRestaurant = fireFunctions.httpsCallable(`restaurant`)
    return getRestaurant({ where, is })
  },
  getOpenTimeListByRestaurantId: (restaurantId: string) => {
    const get = fireFunctions.httpsCallable('openTimeListByRestaurantId')
    return get({ restaurantId })
  },
  getRestaurantWeekdayTime: (props) => {
    const get = fireFunctions.httpsCallable('restaurantWeekdayTime')
    return get(props)
  },
  addMember: (user) => {
    const add = fireFunctions.httpsCallable('addMember')
    return add(user)
  },
  addFavCollection: (props) =>
    fireFunctions.httpsCallable('addFavCollection')(props),
  addFav: (props) => fireFunctions.httpsCallable('addFav')(props),
  getFav: (props) => fireFunctions.httpsCallable('getFav')(props),
  delFavCollection: (props) =>
    fireFunctions.httpsCallable('delFavCollection')(props),
  delFav: (props) => fireFunctions.httpsCallable('delFav')(props),
}

const backendFunctions = Object.keys(backendFunctionsTemp).reduce(
  (pre, cur) => {
    return {
      ...pre,
      [cur]: (...args: any[]) =>
        errorHandler(backendFunctionsTemp[cur], ...args),
    }
  },
  {} as FireFunctions
)

export default backendFunctions
