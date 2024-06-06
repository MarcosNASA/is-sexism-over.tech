import { Anchor } from '~/features/ui/components/Anchor'

export default function About() {
  return (
    <div className="pb-12 flex flex-col gap-8">
      <header className="px-12 py-12 md:py-20 flex flex-col justify-center items-center gap-4">
        <h1 className="text-5xl md:text-7xl font-bold font-yeseva text-clip">
          About
        </h1>

        <p className="text-2xl text-zinc-400">How this project was born</p>
      </header>

      <main className="flex-1 h-full px-12 flex flex-col gap-6">
        <p className="text-xl leading-10 font-outfit">
          Very briefly: I had recently been talking to a friend of mine about
          some of her experiences with sexism in the tech industry. A few days
          later, a different friend was building a side-project live on Twitch
          and he added a testimonials section to the site titled `What devs
          say`, and I automatically thought `Likely something sexist`.
        </p>

        <p className="text-xl leading-10 font-outfit">
          I&apos;m a strong defender of the idea that communication flows better
          when the right channels for those communications exist. I figured out
          there would be a lot of voices who would want to speak if given the
          space, so this is a space.
        </p>

        <p className="text-xl leading-10 font-outfit">
          I&apos;ll build a system to share these experiences from within the
          site to allow for anonimity; in the meantime, I&apos;m using a custom
          label on Github issues. Feel free to
          <> </>
          <Anchor href="https://twitter.com/MarcosNASAG">
            reach out to me on Twitter
          </Anchor>
          <> </>
          and I&apos;ll share it for you if you prefer so. Otherwise,{' '}
          <Anchor href="https://github.com/MarcosNASA/is-sexism-over.tech/issues/new">
            share your own experience
          </Anchor>
          .
        </p>
      </main>
    </div>
  )
}
