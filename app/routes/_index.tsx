// eslint-disable-next-line filenames/match-regex
import type { MetaFunction } from '@remix-run/node'
import type { JSX } from 'react'

export const meta: MetaFunction = () => {
  return [{ title: 'Dazum App' }, { name: 'description', content: 'Automate your development process at ease.' }]
}

export default function Index(): JSX.Element {
  return (
    <div style={{ fontFamily: 'system-ui, sans-serif', lineHeight: '1.8' }}>
      <h1 className='text-4xl'>Welcome to Remix</h1>
      <ul>
        <li>
          <a href='https://remix.run/tutorials/blog' rel='noreferrer' target='_blank'>
            15m Quickstart Blog Tutorial
          </a>
        </li>
        <li>
          <a href='https://remix.run/tutorials/jokes' rel='noreferrer' target='_blank'>
            Deep Dive Jokes App Tutorial
          </a>
        </li>
        <li>
          <a href='https://remix.run/docs' rel='noreferrer' target='_blank'>
            Remix Docs
          </a>
        </li>
      </ul>
    </div>
  )
}
