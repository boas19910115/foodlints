import { Restaurant } from './restaurant.type'

export interface Favorite {
  note: string
  retaurant: Restaurant
  createdTime: Date
}

export interface FavoriteCollection {
  name: string
  note: string
  list: Favorite[]
}

export interface User {
  name: string | null | undefined
  email: string | null | undefined
  photoURL: string | null | undefined
  favoriteCollections: FavoriteCollection[]
}
