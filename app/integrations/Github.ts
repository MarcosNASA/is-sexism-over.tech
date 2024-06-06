import { octokit } from '~/api/client'

export type GithubIssue = Awaited<
  ReturnType<typeof octokit.request<'GET /repos/{owner}/{repo}/issues'>>
>['data'][number]
