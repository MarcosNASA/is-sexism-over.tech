type Duration =
  | 'ms'
  | 'second'
  | 'minute'
  | 'hour'
  | 'day'
  | 'week'
  | 'month'
  | 'year'

const DURATION_TO_MILLISECONDS_MULTIPLIER = {
  ms: 1,
  second: 1000,
  minute: 60 * 1000,
  hour: 60 * 60 * 1000,
  day: 24 * 60 * 60 * 1000,
  week: 7 * 24 * 60 * 60 * 1000,
  month: 30 * 24 * 60 * 60 * 1000,
  year: 365 * 24 * 60 * 60 * 1000,
}
export const DateDomain = {
  utc: (date?: string) => {
    const _date = date ? new Date(date) : new Date()
    return Date.UTC(
      _date.getFullYear(),
      _date.getMonth(),
      _date.getDate(),
      _date.getHours(),
      _date.getMinutes(),
      _date.getSeconds(),
    )
  },
  toMiliseconds: (time: number, duration: Duration) =>
    time * DURATION_TO_MILLISECONDS_MULTIPLIER[duration],
  toSeconds: (time: number, duration: Duration) =>
    (time * DURATION_TO_MILLISECONDS_MULTIPLIER[duration]) / 1000,
  toMinutes: (time: number, duration: Duration) =>
    (time * DURATION_TO_MILLISECONDS_MULTIPLIER[duration]) / 1000 / 60,
  toHours: (time: number, duration: Duration) =>
    (time * DURATION_TO_MILLISECONDS_MULTIPLIER[duration]) / 1000 / 60 / 60,
  toDays: (time: number, duration: Duration) =>
    (time * DURATION_TO_MILLISECONDS_MULTIPLIER[duration]) /
    1000 /
    60 /
    60 /
    24,
  toCountdown: (miliseconds: number) => {
    const days = Math.floor(miliseconds / DateDomain.toMiliseconds(1, 'day'))
    const hours = Math.floor(
      (miliseconds - DateDomain.toMiliseconds(days, 'day')) /
        DateDomain.toMiliseconds(1, 'hour'),
    )
    const minutes = Math.floor(
      (miliseconds -
        DateDomain.toMiliseconds(days, 'day') -
        DateDomain.toMiliseconds(hours, 'hour')) /
        DateDomain.toMiliseconds(1, 'minute'),
    )
    const seconds = Math.floor(
      (miliseconds -
        DateDomain.toMiliseconds(days, 'day') -
        DateDomain.toMiliseconds(hours, 'hour') -
        DateDomain.toMiliseconds(minutes, 'minute')) /
        DateDomain.toMiliseconds(1, 'second'),
    )
    return {
      days,
      hours,
      minutes,
      seconds,
    }
  },
}
