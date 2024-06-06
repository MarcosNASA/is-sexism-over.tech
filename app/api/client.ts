import { Octokit } from '@octokit/core'
import * as process from 'node:process'

export const client = (url: string, options: RequestInit) => {
  return fetch(url, options)
    .then((response) => {
      if (!response.ok) {
        throw new Error(response.statusText, { cause: response })
      }
      return response.json()
    })
    .catch((error: Error) => {
      if (process.env.NODE_ENV !== 'production') console.error(error)
      return Promise.reject(error)
    })
}

export const octokit = new Octokit({
  auth: process.env.GITHUB_TOKEN,
})
