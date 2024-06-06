import Markdown from 'react-markdown'
import { Card } from '../../ui/components/Card'
import { Experience as Experience } from '~/features/experience/domain'
import { Styles } from '~/features/ui/domain'
import { Anchor } from '~/features/ui/components/Anchor'

export const ExperienceTestimonial = ({
  experience,
  className,
}: {
  experience: Experience
  className?: string
}) => (
  <Card
    className={Styles.cn('flex flex-col gap-4', 'overflow-hidden', className)}
  >
    <div className="sticky top-0 bg-zinc-800">
      <div
        className={Styles.cn(
          'relative',
          'pb-2',
          "after:content-[''] after:absolute after:-bottom-[40px] after:h-[40px] after:w-full after:bg-gradient-to-b after:from-zinc-800 after:to-transparent",
        )}
      >
        <h2
          className={Styles.cn(
            'text-5xl font-yeseva font-bold',
            'line-clamp-3 lg:line-clamp-none',
            'z-10',
          )}
          title={experience.heading}
        >
          {experience.heading}
        </h2>
      </div>
    </div>

    <div className="h-full overflow-y-auto">
      <div className="text-xl leading-10 font-outfit">
        <time className="text-zinc-400">
          {new Date(experience.createdAt).toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'long',
            day: 'numeric',
          })}
        </time>
        {' by '}
        <Anchor
          href={experience.author.html_url}
          rel="noopener noreferrer author"
        >
          <div
            className={Styles.cn('inline-flex items-center gap-2 flex-wrap')}
          >
            <span>{Experience.authoredBy(experience)}</span>
            <div className="h-[24px] w-[24px] rounded-full overflow-hidden">
              <img
                src={experience.author.avatar_url}
                alt={`${Experience.authoredBy(experience)}'s GitHub avatar`}
                className="object-cover"
              />
            </div>
          </div>
        </Anchor>
      </div>

      <Markdown className="markdown text-xl leading-10 font-outfit whitespace-pre-wrap">
        {experience.description}
      </Markdown>
    </div>
  </Card>
)

const ExperienceTestimonialSkeleton = ({
  className,
}: {
  className?: string
}) => {
  return (
    <Card
      className={Styles.cn('flex flex-col gap-4', 'overflow-hidden', className)}
    >
      <div role="status" className="sticky top-0 bg-zinc-800 animate-pulse">
        <div className="w-full flex items-center gap-2">
          <div className="h-12 bg-gray-200 rounded-full dark:bg-gray-700 w-32" />
          <div className="h-12 bg-gray-300 rounded-full dark:bg-gray-600 w-24" />
          <div className="h-12 bg-gray-300 rounded-full dark:bg-gray-600 w-full" />
        </div>
      </div>

      <div className="h-full w-full overflow-y-auto">
        <div className="w-full h-full flex flex-col gap-4">
          {Array.from({ length: 10 }).map((_, i) => (
            <div key={i} className="flex flex-col gap-2">
              <div className="flex items-center w-full max-w-[480px] gap-2">
                <div className="h-4 bg-gray-200 rounded-full dark:bg-gray-700 w-full" />
                <div className="h-4 bg-gray-300 rounded-full dark:bg-gray-600 w-full" />
                <div className="h-4 bg-gray-300 rounded-full dark:bg-gray-600 w-24" />
              </div>
              <div className="flex items-center w-full max-w-[400px] gap-2">
                <div className="h-4 bg-gray-300 rounded-full dark:bg-gray-600 w-full" />
                <div className="h-4 bg-gray-200 rounded-full dark:bg-gray-700 w-80" />
                <div className="h-4 bg-gray-300 rounded-full dark:bg-gray-600 w-full" />
              </div>
              <div className="flex items-center w-full max-w-[480px] gap-2">
                <div className="h-4 bg-gray-200 rounded-full dark:bg-gray-700 w-full" />
                <div className="h-4 bg-gray-300 rounded-full dark:bg-gray-600 w-full" />
                <div className="h-4 bg-gray-300 rounded-full dark:bg-gray-600 w-24" />
              </div>
              <div className="flex items-center w-full max-w-[440px] gap-2">
                <div className="h-4 bg-gray-300 rounded-full dark:bg-gray-600 w-32" />
                <div className="h-4 bg-gray-300 rounded-full dark:bg-gray-600 w-24" />
                <div className="h-4 bg-gray-200 rounded-full dark:bg-gray-700 w-full" />
              </div>
              <div className="flex items-center w-full max-w-[360px] gap-2">
                <div className="h-4 bg-gray-300 rounded-full dark:bg-gray-600 w-full" />
                <div className="h-4 bg-gray-200 rounded-full dark:bg-gray-700 w-80" />
                <div className="h-4 bg-gray-300 rounded-full dark:bg-gray-600 w-full" />
              </div>
            </div>
          ))}
        </div>
      </div>
      <span className="sr-only">Loading...</span>
    </Card>
  )
}

ExperienceTestimonial.Skeleton = ExperienceTestimonialSkeleton
