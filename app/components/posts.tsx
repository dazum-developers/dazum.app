import { Link } from '@remix-run/react'
import type { JSX } from 'react'

import { formatDate } from '~/app/utils/format-date'

export type PostType = {
  id: string
  slug: string
  subtitle: string
  timestamp: number
  title: string
}

export type PostProps = {
  posts: PostType[]
}

export default function Posts({ posts }: PostProps): JSX.Element {
  return (
    <main className='flex flex-col mx-auto max-w-5xl gap-14 px-4'>
      {(posts || [])?.map((post, i) => (
        <Link
          className='flex flex-col items-start md:gap-10 md:flex-row md:items-center hover:text-blue-500 group cursor-pointer'
          key={post.id}
          to={`/blog/${post.slug}`}>
          <p className='font-mono min-w-fit text-zinc-700 group-hover:text-blue-500'>{formatDate(post.timestamp)}</p>

          <div className='flex flex-col'>
            <h2 className='font-recoleta text-xl text-black group-hover:text-blue-500'>{post.title}</h2>
            <p className='font-normal font-sans text-sm text-zinc-500 group-hover:text-blue-500'>{post.subtitle}</p>
          </div>
        </Link>
      ))}
    </main>
  )
}
