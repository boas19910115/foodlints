import * as lux from 'luxon'

const today = lux.DateTime.fromJSDate(new Date()).startOf('day')

export function convertDateTimeToTimeTxt(minutes: number | null | undefined) {
  if (minutes) {
    return today.plus({ minutes }).toFormat('hh:mm a')
  }
  return null
}
