import { type MetaFunction, defer } from '@remix-run/cloudflare'
import { Await, useLoaderData } from '@remix-run/react'
import { Suspense } from 'react'

import { Experience } from '~/features/experience/domain'
import { ExperienceTestimonials } from '../features/experience/components/ExperienceTestimonials'
import { Functional } from '~/lib/Functional'
import { Countdown } from '~/features/countdown/components/Countdown'
import { IssuesAPI } from '~/api/issues'

import ogImage from '~/../public/images/og.webp'

export const meta: MetaFunction = () => {
  return [
    { title: 'Is sexism over in tech?' },
    {
      name: 'description',
      content:
        "Share your own and browse others' experiences with sexism in the tech industry",
    },

    { name: 'og:url', content: 'https://is-sexism-over.tech' },
    { name: 'og:image', content: ogImage },
    { name: 'og:title', content: 'Is sexism over in tech?' },
    {
      name: 'og:description',
      content:
        "Share your own and browse others' experiences with sexism in the tech industry",
    },
    { name: 'og:type', content: 'website' },

    { name: 'twitter:card', content: 'summary_large_image' },
    { name: 'twitter:domain', content: 'is-sexism-over.tech' },
    { name: 'twitter:url', content: 'https://is-sexism-over.tech' },
    { name: 'twitter:image', content: ogImage },
    { name: 'twitter:title', content: 'Is sexism over in tech?' },
    {
      name: 'twitter:description',
      content:
        "Share your own and browse others' experiences with sexism in the tech industry",
    },
    { name: 'twitter:site', content: '@MarcosNASAG' },
    { name: 'twitter:creator', content: '@MarcosNASAG' },
  ]
}

export const loader = async () => {
  return defer({
    experiences: IssuesAPI.get()
      .then(Functional.pluck('data'))
      .then(Functional.map(Experience.fromIssue)),
  })
}

export default function Index() {
  const { experiences } = useLoaderData<typeof loader>()

  return (
    <>
      <header className="px-12 py-12 md:py-20 flex flex-col justify-center items-center gap-4">
        <h1 className="text-5xl md:text-7xl font-bold font-yeseva text-clip">
          Is sexism over in tech?
        </h1>

        <p className="text-2xl text-zinc-400">
          Share your own and browse others&apos; experiences with sexism in the
          tech industry
        </p>
      </header>

      <main className="px-12 flex-1 h-full">
        <Suspense fallback={<Countdown.Skeleton />}>
          <Await resolve={experiences}>
            {(experiences) => <Countdown lastExperience={experiences.at(0)} />}
          </Await>
        </Suspense>
      </main>

      <Suspense
        fallback={
          <>
            <section className="carousel w-[calc(100dvw_-_((100dvw_-_100%)_/_2)_-_8px)] md:w-[calc(100dvw_-_((100dvw_-_100%)_/_2)_-_32px)] min-h-[100dvh] max-h-[100dvh] h-[100dvh] pl-2 py-2 md:pl-12 md:py-8">
              <ExperienceTestimonials.Skeletons
                className="pr-2 md:pr-12"
                experiences={Array.from({ length: 10 }, (_, i) => ({
                  id: i,
                }))}
              />
            </section>
          </>
        }
      >
        <Await resolve={experiences}>
          {(experiences) => (
            <>
              {experiences.length > 0 && (
                <section className="carousel w-[calc(100dvw_-_((100dvw_-_100%)_/_2)_-_8px)] md:w-[calc(100dvw_-_((100dvw_-_100%)_/_2)_-_32px)] min-h-[100dvh] max-h-[100dvh] h-[100dvh] pl-2 py-2 md:pl-12 md:py-8">
                  <ExperienceTestimonials
                    className="pr-2 md:pr-12"
                    experiences={experiences}
                  />
                </section>
              )}
            </>
          )}
        </Await>
      </Suspense>
    </>
  )
}
