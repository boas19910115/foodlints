import { RestaurantName } from './restaurant.type'

export type Fav = {
  restaurantName: RestaurantName
  restaurantId: string
}

export interface FavCollection {
  id: string
  name: string
  collaborators?: string[]
  list: Fav[]
  owner: string
}
