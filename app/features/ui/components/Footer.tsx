import { Link } from '@remix-run/react'
import { Anchor } from './Anchor'
import { GithubIcon } from './icons/GithubIcon'
import { Styles } from '../domain'

export const Footer = () => (
  <footer className="flex justify-center items-center text-zinc-400">
    <div className="w-full flex flex-col justify-center items-center gap-2 md:gap-4">
      <div className="w-full flex justify-center items-center">
        <p className="text-zinc-400">
          Created with{' '}
          <span aria-label="love" className="heart">
            ♥︎
          </span>{' '}
          by{' '}
          <Anchor
            href="https://twitter.com/MarcosNASAG"
            className="font-yeseva"
          >
            Marcos S
          </Anchor>
          .
        </p>
      </div>

      <nav className="flex gap-2">
        <Link
          to="/"
          className={Styles.cn(
            'text-blue-300 hover:text-blue-400 visited:text-pink-300 hover:visited:text-pink-400 underline',
            'transition-colors duration-500 ease-in-out',
          )}
        >
          Is sexism over in tech?
        </Link>

        <Link
          to="/about"
          className={Styles.cn(
            'text-blue-300 hover:text-blue-400 visited:text-pink-300 hover:visited:text-pink-400 underline',
            'transition-colors duration-500 ease-in-out',
          )}
        >
          About the project
        </Link>
      </nav>

      <div>
        <Anchor
          href="https://github.com/MarcosNASA/is-sexism-over.tech"
          aria-label="Github repository"
        >
          <GithubIcon />
        </Anchor>
      </div>
    </div>
  </footer>
)
