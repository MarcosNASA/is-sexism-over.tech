import { GithubIssue } from '../../integrations/Github'

type Reaction = {
  '+1': number
  '-1': number
  laugh: number
  confused: number
  heart: number
  hooray: number
  eyes: number
  rocket: number
}

type User = GithubIssue['user']

export type Experience = {
  id: number
  heading: string
  description: string
  url: string
  reactions: Reaction
  author: NonNullable<User>
  createdAt: string
}

const DEFAULT_REACTION = {
  '+1': 0,
  '-1': 0,
  laugh: 0,
  confused: 0,
  heart: 0,
  hooray: 0,
  eyes: 0,
  rocket: 0,
} as const satisfies Reaction

const fromIssue = (issue: GithubIssue) => ({
  id: issue.id,
  heading: issue.title,
  description: issue.body ?? '',
  url: issue.html_url,
  createdAt: issue.created_at,
  reactions: issue.reactions ?? DEFAULT_REACTION,
  author: issue.user!,
})

export const Experience = {
  fromIssue,
  authoredBy: ({ author }: Pick<Experience, 'author'>) =>
    author.login === 'MarcosNASA'
      ? 'Anonymous (through Marcos S.)'
      : author.login,
}
