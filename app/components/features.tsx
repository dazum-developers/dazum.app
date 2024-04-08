import type { JSX } from 'react'

import FadeInUp from './animations/fade-in-up'
import FormatMessage from './format-message'

const features = [
  {
    description:
      'Lorem ipsum, dolor sit amet consectetur adipisicing elit. Maiores impedit perferendis suscipit eaque, iste dolor cupiditate blanditiis ratione.',
    name: 'Push to deploy.',
  },
  {
    description: 'Anim aute id magna aliqua ad ad non deserunt sunt. Qui irure qui lorem cupidatat commodo.',
    name: 'SSL certificates.',
  },
  {
    description: 'Ac tincidunt sapien vehicula erat auctor pellentesque rhoncus. Et magna sit morbi lobortis.',
    name: 'Database backups.',
  },
]

export default function Features(): JSX.Element {
  return (
    <div className='overflow-hidden bg-white py-24 sm:py-32'>
      <div className='mx-auto max-w-7xl px-6 lg:px-8'>
        <FadeInUp>
          <div className='mx-auto grid max-w-2xl grid-cols-1 gap-x-8 gap-y-16 sm:gap-y-20 lg:mx-0 lg:max-w-none lg:grid-cols-2'>
            <div className='lg:pr-8 lg:pt-4'>
              <div className='lg:max-w-lg'>
                <h2 className='text-base font-semibold leading-7 text-indigo-600'>
                  <FormatMessage id='LandingPage.Features.SubHeading' />
                </h2>
                <p className='mt-2 text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl'>
                  <FormatMessage id='LandingPage.Features.Heading' />
                </p>
                <p className='mt-6 text-lg leading-8 text-gray-600'>
                  <FormatMessage id='LandingPage.Features.Description' />
                </p>
                <dl className='mt-10 max-w-xl space-y-8 text-base leading-7 text-gray-600 lg:max-w-none'>
                  {/* eslint-disable-next-line @typescript-eslint/no-extra-parens */}
                  {features.map((feature: { description: string; name: string }) => (
                    <div className='relative pl-9' key={feature.name}>
                      <dt className='inline font-semibold text-gray-900'>{feature.name}</dt>{' '}
                      <dd className='inline'>{feature.description}</dd>
                    </div>
                  ))}
                </dl>
              </div>
            </div>
            <img
              alt='Product screenshot'
              className='w-[48rem] max-w-none rounded-xl shadow-xl ring-1 ring-gray-400/10 sm:w-[57rem] md:-ml-4 lg:-ml-0'
              height={1442}
              src='/images/project.png'
              width={2432}
            />
          </div>
        </FadeInUp>
      </div>
    </div>
  )
}
