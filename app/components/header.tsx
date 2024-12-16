import { Link } from '@remix-run/react'
import type { JSX } from 'react'

import FormatMessage from './format-message'

export default function Header(): JSX.Element {
  return (
    <header className='absolute inset-x-0 top-0 z-50'>
      <nav aria-label='Global' className='flex items-center justify-between p-6 max-w-[1100px] mx-auto lg:px-8'>
        <div className='flex lg:flex-1'>
          <Link className='-m-1.5 p-1.5' to='/'>
            <span className='sr-only'>
              <FormatMessage id='Logo' />
            </span>
            <img alt='Logo' className='h-10 w-auto' height='64px' src='/dazum-logo.svg' width='64px' />
          </Link>
        </div>
        <div className='hidden lg:flex lg:gap-x-12'>
          <Link className='text-sm font-semibold leading-6 text-gray-900' to='/'>
            <FormatMessage id='Logo' />
          </Link>
        </div>
      </nav>
    </header>
  )
}
