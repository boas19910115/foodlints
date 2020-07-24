import { Restaurant } from './restaurant.type'
import { FavCollection } from './favorite.type'

export interface User {
  name: string | null | undefined
  email: string | null | undefined
  photoURL: string | null | undefined
  favoriteCollections: FavCollection[]
}
