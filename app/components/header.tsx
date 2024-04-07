import { Link } from '@remix-run/react'
import type { JSX } from 'react'

import FormatMessage from './format-message'

export default function Header(): JSX.Element {
  return (
    <header className='w-full py-4 px-[5%] bg-white flex justify-between w-nav'>
      <div className='w-full max-w-[1156px] flex gap-6 mx-auto justify-between items-center'>
        <div className='flex justify-start items-center'>
          <Link className='font-recoleta text-2xl' to='/'>
            <FormatMessage id='Logo' />
          </Link>
        </div>

        <div className='flex justify-end items-center gap-2'>
          <div className='flex justify-start gap-2 items-center'>
            <a
              href='/login'
              className='inline-block transition-all text-sm py-1.5 px-4 font-inter text-center bg-transparent rounded-full border border-solid border-[#e4e5e7] hover:bg-[#e4e5e7]'>
              Login
            </a>
            <a
              href='/contact'
              className='inline-block transition-all text-sm py-1.5 px-4 font-inter text-center bg-transparent rounded-full bg-[#d8fa52] hidden'>
              Let’s Talk
            </a>
          </div>
        </div>
      </div>
    </header>
  )
}
