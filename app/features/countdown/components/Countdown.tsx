import React from 'react'
import { type Experience } from '~/features/experience/domain'
import { Countdown as CountdownDomain } from '~/features/countdown/domain'
import { Text } from '~/features/text/domain'
import { Styles } from '~/features/ui/domain'
import { Anchor } from '~/features/ui/components/Anchor'

export const Countdown = ({
  lastExperience,
}: {
  lastExperience?: Experience
}) => {
  const [countdown, setCountdown] = React.useState(() =>
    lastExperience
      ? CountdownDomain.countdown(lastExperience.createdAt)
      : { days: 0, hours: 0, minutes: 0, seconds: 0 },
  )

  const isOver = lastExperience
    ? CountdownDomain.isOver(lastExperience.createdAt)
    : true

  React.useEffect(() => {
    if (!lastExperience) return
    const interval = setInterval(() => {
      setCountdown(CountdownDomain.countdown(lastExperience.createdAt))
    }, 1000)
    return () => clearInterval(interval)
  }, [lastExperience])

  if (isOver) {
    return (
      <div className="flex flex-col items-start md:items-center justify-center gap-1 lg:gap-4">
        <div
          className={Styles.cn(
            'relative',
            'flex flex-col gap-0',
            'text-start md:text-center text-4xl md:text-9xl font-yeseva font-bold text-transparent',
            'bg-gradient-to-b from-pink-300 via-pink-300 via-66% to-zinc-100 bg-clip-text',
          )}
        >
          <span>Sexism is</span>
          <> </>
          <div
            className={Styles.cn(
              'absolute top-[50%] left-[50%] -translate-x-1/2 -translate-y-1/2 z-10',
              'rotate-[30deg]',
            )}
            data-not
          >
            <span
              className={Styles.cn('text-5xl md:text-[100px] text-pink-500')}
            >
              not
            </span>
          </div>
          <> </>
          <span>over!</span>
        </div>

        <div className={Styles.cn('text-2xl lg:text-2xl text-zinc-400')}>
          <Anchor href="https://github.com/MarcosNASA/is-sexism-over.tech/issues/new">
            Share your experience
          </Anchor>{' '}
          to reset the countdown
        </div>
      </div>
    )
  }

  return (
    <div className="flex flex-col justify-center sm:items-center gap-6">
      <div className="flex flex-col justify-center items-center gap-4">
        <div className="w-full flex sm:justify-center items-center flex-wrap gap-4 tabular-nums">
          <div className="flex flex-col justify-center items-center gap-x-2">
            <span className="text-2xl lg:text-5xl font-bold">
              {String(countdown.days).padStart(2, '0')}{' '}
            </span>
            <span className="text-3xl font-semibold text-pink-300 font-yeseva">
              {Text.pluralize(countdown.days, { singular: 'day' })}
            </span>
          </div>
          <div className="flex flex-col justify-center items-center gap-x-2">
            <span className="text-2xl lg:text-5xl font-bold">
              {String(countdown.hours).padStart(2, '0')}{' '}
            </span>
            <span className="text-3xl font-semibold text-pink-300 font-yeseva">
              {Text.pluralize(countdown.hours, { singular: 'hour' })}
            </span>
          </div>
          <div className="hidden md:flex flex-col justify-center items-center gap-x-2">
            <span className="text-2xl lg:text-5xl font-bold">
              {String(countdown.minutes).padStart(2, '0')}{' '}
            </span>
            <span className="text-3xl font-semibold text-pink-300 font-yeseva">
              {Text.pluralize(countdown.minutes, { singular: 'minute' })}
            </span>
          </div>
          <div className="hidden md:flex flex-col justify-center items-center gap-x-2">
            <span className="text-2xl lg:text-5xl font-bold">
              {String(countdown.seconds).padStart(2, '0')}{' '}
            </span>
            <span className="text-3xl font-semibold text-pink-300 font-yeseva">
              {Text.pluralize(countdown.seconds, {
                singular: 'second ',
                plural: 'seconds',
              })}
            </span>
          </div>
        </div>

        <span className="w-full sm:w-auto text-3xl lg:text-4xl font-yeseva font-bold">
          left for sexism to be over
        </span>
      </div>

      <div className="text-2xl text-zinc-400">
        <Anchor href="https://github.com/MarcosNASA/is-sexism-over.tech/issues/new">
          Share your experience
        </Anchor>{' '}
        to reset the countdown
      </div>
    </div>
  )
}

const CountdownSkeleton = () => {
  return (
    <div
      className={Styles.cn(
        'flex flex-col justify-center items-center gap-6',
        'animate-pulse',
      )}
    >
      <div className="flex flex-col justify-center items-center gap-2">
        <div className="w-full flex xs:justify-center items-center flex-wrap gap-4">
          <div className="flex flex-col justify-center items-center gap-2">
            <span className="h-12 lg:h-15 bg-gray-200 rounded-full dark:bg-gray-700 w-32" />
            <span className="h-15 lg:h-15 bg-gray-200 rounded-full dark:bg-gray-700 w-32" />
          </div>
          <div className="flex flex-col justify-center items-center gap-2">
            <span className="h-12 lg:h-15 bg-gray-200 rounded-full dark:bg-gray-700 w-32" />
            <span className="h-15 lg:h-15 bg-gray-200 rounded-full dark:bg-gray-700 w-32" />
          </div>
          <div className="hidden md:flex flex-col justify-center items-center gap-2">
            <span className="h-12 lg:h-15 bg-gray-200 rounded-full dark:bg-gray-700 w-32" />
            <span className="h-15 lg:h-15 bg-gray-200 rounded-full dark:bg-gray-700 w-32" />
          </div>
          <div className="hidden md:flex flex-col justify-center items-center gap-2">
            <span className="h-12 lg:h-15 bg-gray-200 rounded-full dark:bg-gray-700 w-32" />
            <span className="h-15 lg:h-15 bg-gray-200 rounded-full dark:bg-gray-700 w-32" />
          </div>
        </div>

        <span className="h-12 lg:h-15 bg-gray-200 rounded-full dark:bg-gray-700 w-full" />
      </div>

      <div className="text-2xl text-zinc-400">
        <Anchor href="https://github.com/MarcosNASA/is-sexism-over.tech/issues/new">
          Share your experience
        </Anchor>{' '}
        to reset the countdown
      </div>
    </div>
  )
}

Countdown.Skeleton = CountdownSkeleton
