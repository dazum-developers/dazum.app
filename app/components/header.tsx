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
            <img alt='Logo' className='h-8 w-auto' height='44px' src='/images/logo.png' width='44px' />
          </Link>
        </div>
        {/* <div className='hidden lg:flex lg:gap-x-12'>
            <a key={item.name} href={item.href} className='text-sm font-semibold leading-6 text-gray-900'>{item.name}</a>
          </div> */}
        <Link
          className='inline-block transition-all text-sm py-1.5 px-6 font-inter text-center bg-transparent rounded-full border border-solid border-[#e4e5e7] hover:bg-[#e4e5e7]'
          to='/login'>
          <FormatMessage id='Login' />
        </Link>
      </nav>
    </header>
  )
}
