import { Link } from '@remix-run/react'
import type { JSX } from 'react'

import FormatMessage from './format-message'

export default function Footer(): JSX.Element {
  return (
    <footer className='pt-[88px] px-[5%] pb-12 relative'>
      <div className='w-full max-w-[1156px] mx-auto relative'>
        <div className='mt-[144px] flex justify-between items-center gap-10'>
          <p className='font-inter text-xs text-gray-500'>
            © {new Date().getFullYear()}&nbsp;
            <Link className='text-gray-900' to='/'>
              <FormatMessage id='Logo' />
            </Link>
          </p>
          <div className='flex justify-between items-center gap-10'>
            <Link className='text-gray-500 text-xs transition-colors duration-300 hover:text-gray-900' to='/privacy'>
              <FormatMessage id='Privacy' />
            </Link>
            <Link className='text-gray-500 text-xs transition-colors duration-300 hover:text-gray-900' to='/terms'>
              <FormatMessage id='Terms' />
            </Link>
            <Link className='text-gray-500 text-xs transition-colors duration-300 hover:text-gray-900' to='/cookies'>
              <FormatMessage id='Cookies' />
            </Link>
          </div>
        </div>
      </div>

      <div className='absolute top-0 left-0 right-0 flex justify-center items-start bottom-auto opacity-100 z-0'>
        <img
          alt=''
          className='inline-block'
          loading='lazy'
          sizes='(max-width: 991px) 100vw, 1474px'
          src='/images/footer.png'
        />
      </div>
    </footer>
  )
}
