import { fireFunctions } from './init'
import { User } from 'types/user.type'

async function errorHandler(func: Function, ...args: any[]) {
  try {
    const res = await func(...args)
    return res
  } catch (error) {
    return { data: null }
  }
}

interface FireFunctions extends Record<string, any> {
  getAllRestaurantNames: firebase.functions.HttpsCallable
  getRestaurant: (
    where: string,
    is: string
  ) => Promise<firebase.functions.HttpsCallableResult>
  addMember: (user: User) => Promise<firebase.functions.HttpsCallableResult>
  getOpenTimeListByRestaurantId: (
    restaurantId: string
  ) => Promise<firebase.functions.HttpsCallableResult>
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
  addMember: (user) => {
    const add = fireFunctions.httpsCallable('addMember')
    return add(user)
  },
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
