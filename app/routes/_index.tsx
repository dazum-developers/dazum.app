// eslint-disable-next-line filenames/match-regex
import type { JSX } from 'react'

import Features from '../components/features'
import Footer from '../components/footer'
import Header from '../components/header'
import HeroSection from '../components/hero-section'

export default function Index(): JSX.Element {
  return (
    <div className='bg-white'>
      <Header />
      <HeroSection />
      <Features />
      <Footer />
    </div>
  )
}
