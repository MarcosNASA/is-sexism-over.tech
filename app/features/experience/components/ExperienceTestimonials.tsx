import { ExperienceTestimonial } from '~/features/experience/components/ExperienceTestimonial'
import { Showcase } from '~/features/ui/components/Showcase'
import { Experience } from '~/features/experience/domain'
import { Styles } from '~/features/ui/domain'

export const ExperienceTestimonials = ({
  experiences,
  className,
}: {
  experiences: Experience[]
  className?: string
}) => (
  <Showcase className={Styles.cn('relative', 'h-full py-4', className)}>
    <div className={Styles.cn('h-full w-full flex gap-2')}>
      {experiences.map((experience) => (
        <Showcase.Item
          key={experience.id}
          className={({ isShowcased }) =>
            Styles.cn(
              isShowcased && 'flex-[1_0_auto]',
              !isShowcased && 'flex-[0_1_auto]',
            )
          }
        >
          {({ isShowcased, handleShowcase }) => (
            <button
              onClick={handleShowcase}
              className={Styles.cn(
                'text-start',
                'h-full',
                isShowcased && 'w-[800px] min-w-[100%] max-w-[100dvw]',
                !isShowcased && 'w-[120px] scale-[1] hover:bg-zinc-700 reflect',
                'p-10 rounded-xl bg-zinc-800',
                '[transition:width_0.5s,transform_0.3s_1s,background_0.2s] ease-in-out',
                'motion-reduce:transition-none',
              )}
              aria-label={`Expand experience titled ${experience.heading} written by ${experience.author.login} on ${new Date(
                experience.createdAt,
              ).toLocaleDateString('en-US', {
                year: 'numeric',
                month: 'long',
                day: 'numeric',
              })}`}
            >
              <div
                className={Styles.cn(
                  'w-full h-full',
                  isShowcased && 'opacity-100',
                  !isShowcased && 'opacity-0',
                  'transition-opacity delay-500 duration-500 ease-in-out',
                )}
              >
                {isShowcased && (
                  <ExperienceTestimonial
                    experience={experience}
                    className={Styles.cn('w-full')}
                  />
                )}
              </div>
            </button>
          )}
        </Showcase.Item>
      ))}
    </div>
  </Showcase>
)

const ExperienceTestimonialSkeletons = ({
  className,
  experiences,
}: {
  experiences: { id: number }[]
  className?: string
}) => (
  <Showcase
    className={Styles.cn('relative', 'items-3d', 'h-full py-4', className)}
  >
    <div className="h-full w-full flex gap-2">
      {experiences.map((experience) => (
        <Showcase.Item
          key={experience.id}
          className={({ isShowcased }) =>
            Styles.cn(
              isShowcased && 'flex-[1_0_auto]',
              !isShowcased && 'flex-[0_1_auto]',
            )
          }
        >
          {({ isShowcased, handleShowcase }) => (
            <button
              onClick={handleShowcase}
              className={Styles.cn(
                'text-start',
                'h-full',
                isShowcased && 'w-[800px] min-w-[100%] max-w-[100dvw]',
                !isShowcased && 'w-[120px] scale-[1] hover:bg-zinc-700 reflect',
                'p-10 rounded-xl bg-zinc-800',
                '[transition:width_0.5s,transform_0.3s_1s,background_0.2s] ease-in-out',
                'motion-reduce:transition-none',
              )}
            >
              <div
                className={Styles.cn(
                  'w-full h-full',
                  isShowcased && 'opacity-100',
                  !isShowcased && 'opacity-0',
                  'transition-opacity delay-500 duration-500 ease-in-out',
                )}
              >
                {isShowcased && (
                  <ExperienceTestimonial.Skeleton
                    className={Styles.cn('w-full')}
                  />
                )}
              </div>
            </button>
          )}
        </Showcase.Item>
      ))}
    </div>
  </Showcase>
)

ExperienceTestimonials.Skeletons = ExperienceTestimonialSkeletons
