// eslint-disable-next-line filenames/match-regex
import type { JSX } from 'react'

import Footer from '../components/footer'
import Header from '../components/header'
import HeroSection from '../components/hero-section'

export default function Index(): JSX.Element {
  return (
    <div className='bg-[#fafbfd]'>
      <Header />
      <HeroSection />
      <Footer />
    </div>
  )
}
