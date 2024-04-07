import type { JSX } from 'react'

import FadeInUp from './animations/fade-in-up'

export default function HeroSection(): JSX.Element {
  return (
    <section className='text-gray-800 py-20 px-[5%] relative overflow-hidden flex flex-col justify-center items-center'>
      <div className='max-w-[520px] w-full mx-auto  z-10'>
        <FadeInUp easing='easeIn'>
          <h1 className='text-6xl font-recoleta text-center'>Our cutting-edge software solutions</h1>
        </FadeInUp>
      </div>

      <div className='bg-white mx-auto mt-12  z-10'>
        <FadeInUp easing='easeIn' delayOrder={200}>
          <img
            alt=''
            className='image'
            height='768'
            loading='lazy'
            sizes='(max-width: 767px) 100vw, 86vw'
            width='1156'
          />
        </FadeInUp>
      </div>

      <div className='absolute top-0 left-0 right-0 flex justify-center items-start bottom-auto opacity-100 z-0'>
        <img
          alt=''
          className='inline-block'
          loading='lazy'
          sizes='(max-width: 991px) 100vw, 1474px'
          src='/images/hero.png'
        />
      </div>
    </section>
  )
}
