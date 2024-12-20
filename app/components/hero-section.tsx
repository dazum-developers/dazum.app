import type { JSX } from 'react'

import FormatMessage from './format-message'

export default function HeroSection(): JSX.Element {
  return (
    <header className='relative isolate xs:pt-16 px-6 md:pt-28 lg:px-8'>
      <div className='mx-auto max-w-2xl'>
        <div className='mx-auto max-w-fit flex flex-col gap-8'>
          <h1 className='font-recoleta text-[2rem] md:text-[3.55rem] font-semibold'>
            <FormatMessage id='Logo' />
          </h1>
        </div>
      </div>
    </header>
  )
}
