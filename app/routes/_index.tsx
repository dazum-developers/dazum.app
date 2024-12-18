import type { MetaFunction } from '@remix-run/react'
import type { LinksFunction } from '@remix-run/react/dist/routeModules'
import type { JSX } from 'react'

import { json, useLoaderData } from '@remix-run/react'

import Footer from '~/app/components/footer'
import HeroSection from '~/app/components/hero-section'
import Posts, { type PostType } from '~/app/components/posts'

export function loader() {
  return json([
    {
      id: 1734200837963,
      slug: 'critical-rendering-path-explained',
      subtitle: 'Comprehensive Performance Optimization Guide for Modern Web Development',
      timestamp: 1734200837963,
      title: 'Critical Rendering Path Explained: Techniques to Accelerate Page Load Speeds',
    },
  ])
}

export const links: LinksFunction = () => [
  { rel: 'canonical', href: 'https://dazum.app' },
  { rel: 'icon', type: 'image/x-icon', href: 'https://dazum.app/images/logo.png' },
]

export const meta: MetaFunction = ({ data }) => {
  const posts: PostType[] = data as any

  return [
    {
      'script:ld+json': {
        '@context': 'https://schema.org',
        '@type': 'WebSite',
        name: 'Dazum App',
      },
    },
    {
      'script:ld+json': {
        '@context': 'https://schema.org',
        '@type': 'WebPage',
        name: 'Dazum App',
        description:
          'A software engineering blog sharing insights, tutorials, and expert knowledge from a seasoned developer',
        mainEntity: {
          '@type': 'ItemList',
          itemListElement: (posts || [])?.map((post) => ({
            '@type': 'BlogPosting',
            headline: post.title,
            description: post.subtitle,
            author: {
              '@type': 'Person',
              name: 'Tanmay Mazumdar',
            },
            datePublished: new Date(post.timestamp),
            url: `https://dazum.app/blog/${post?.slug}`,
          })),
        },
        publisher: {
          '@type': 'Organization',
          name: 'Dazum App',
          logo: {
            '@type': 'ImageObject',
            url: 'https://example.com/logo.png',
          },
        },
      },
    },
    { title: 'Dazum App — A Seasoned Developer, and Designer' },
    {
      name: 'description',
      content:
        'A software engineering blog sharing insights, tutorials, and expert knowledge from a seasoned developer',
    },
    { httpEquiv: 'X-UA-Compatible', content: 'IE=edge' },
    { name: 'google-site-verification', content: 'JCyMPGKDINbqfWt6Xv3kZI78qr7e95YC2k8YRbSt_PY' },
    {
      name: 'keywords',
      content: 'dazum, software engineering, programming, web development, technology, coding tips, software design',
    },
    { name: 'image', content: 'https://dazum.app/images/logo.png' },
    { property: 'og:locale', content: 'en-US' },
    { property: 'og:type', content: 'Website' },
    { property: 'og:site_name', content: 'Dazum App' },
    { property: 'og:title', content: 'Dazum App — Developer, Designer' },
    {
      property: 'og:description',
      content:
        'A software engineering blog sharing insights, tutorials, and expert knowledge from a seasoned developer',
    },
    { property: 'og:url', content: 'https://dazum.app' },
    { property: 'og:image', content: 'https://dazum.app/images/logo.png' },
    { property: 'og:image:width', content: '130' },
    { property: 'og:image:height', content: '130' },
    { property: 'og:image:type', content: 'image/png' },
    { name: 'twitter:card', content: 'summary_large_image' },
    { name: 'twitter:title', content: 'Dazum App — Developer, Designer' },
    {
      name: 'twitter:description',
      content:
        'A software engineering blog sharing insights, tutorials, and expert knowledge from a seasoned developer',
    },
    { name: 'twitter:image', content: 'https://dazum.app/images/logo.png' },
    { name: 'googlebot', content: 'index, follow' },
    { name: 'robots', content: 'index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1' },
    { name: 'theme-color', content: '#FFFEFD' },
    { name: 'author', content: 'Tanmay Mazumdar' },
    { name: 'copyright', content: '© 2024 Dazum App' },
  ]
}

export default function Index(): JSX.Element {
  const posts: PostType[] = useLoaderData()

  return (
    <>
      <HeroSection />
      <Posts posts={posts} />
      <Footer />
    </>
  )
}
