export type RestaurantName = string

export interface Restaurant {
  name: RestaurantName
  id: string
  openTimeWeekCalendar: OpenTimeWeekCalendar
}

export interface RestaurantWeekday extends OpenTimeOfDay {
  name: RestaurantName
  id: string
}

export type OpenTimeOfDay = {
  duration: number
  startTime: number
  endTime: number
  isOverNight: boolean
}

export type WeekDayString =
  | 'SUN'
  | 'MON'
  | 'TUE'
  | 'WED'
  | 'THU'
  | 'FRI'
  | 'SAT'

export type OpenTimeWeekCalendar = Record<
  WeekDayString | 'restaurantId' | 'restaurantName',
  OpenTimeOfDay
>
