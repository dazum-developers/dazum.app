import { Inter } from 'next/font/google'
import localFont from 'next/font/local'

export const recoleta = localFont({
  display: 'swap',
  fallback: ['sans-serif'],
  preload: true,
  src: './Recoleta-Regular.woff2',
  weight: '400',
})

export const inter = Inter({
  display: 'swap',
  fallback: ['sans-serif'],
  preload: true,
  style: ['normal'],
  subsets: ['latin'],
  weight: ['400', '700'],
})
