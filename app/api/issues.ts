import { octokit } from './client'

export const IssuesAPI = {
  get: () =>
    octokit.request('GET /repos/{owner}/{repo}/issues', {
      owner: 'MarcosNASA',
      repo: 'is-sexism-over.tech',
      state: 'closed',
      labels: 'testimonial',
      sort: 'created',
      direction: 'desc',
      headers: {
        'X-GitHub-Api-Version': '2022-11-28',
      },
    }),
}
