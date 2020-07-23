export type RestaurantName = string

export interface Restaurant {
  id: string
  name: RestaurantName
  openTimeList: OpenTime[]
}

export interface OpenTime {
  duration: number
  endTime: string
  restaurantId: string
  restaurantName: RestaurantName
  startTime: string
  weekdayList: number[]
}
