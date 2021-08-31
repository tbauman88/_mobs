import { DateTime } from "luxon"

export const convertTimeDiff = (startTime: string, endTime: string) => {
  const start = DateTime.fromISO(startTime)
  const end = DateTime.fromISO(endTime)
  const diffInMinutes = end.diff(start, 'minutes')
  const { minutes } = diffInMinutes.toObject()
  return `${minutes} minutes`
}
