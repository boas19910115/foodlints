export type RestaurantName = string

export interface Restaurant {
  name: RestaurantName
  openTimeList: string[]
}

export interface OpenTime {
  duration: number
  endTime: string
  restaurantId: string
  restaurantName: RestaurantName
  startTime: string
  weekdayList: number[]
}
