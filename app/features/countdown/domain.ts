import { DateDomain } from '../date/domain'

const NUMBER_OF_DAYS_WITHOUT_EXPERIENCES_FOR_SEXISM_CONSIDERED_TO_BE_OVER = 15

export const CONSTANTS = {
  NUMBER_OF_DAYS_WITHOUT_EXPERIENCES_FOR_SEXISM_CONSIDERED_TO_BE_OVER,
}

export const Countdown = {
  CONSTANTS,
  deadline: (date: string) => {
    return (
      DateDomain.utc(date) +
      DateDomain.toMiliseconds(
        NUMBER_OF_DAYS_WITHOUT_EXPERIENCES_FOR_SEXISM_CONSIDERED_TO_BE_OVER,
        'day',
      )
    )
  },
  isOver: (date: string) => {
    return Countdown.timeLeft(date) <= 0
  },
  timeLeft: (date: string) => {
    const today = DateDomain.utc()
    return Math.max(0, Countdown.deadline(date) - today)
  },
  countdown: (date: string) => DateDomain.toCountdown(Countdown.timeLeft(date)),
}
