import type { JSX } from 'react'

import FormatMessage from './format-message'

export default function Footer(): JSX.Element {
  return (
    <div className='py-20 px-6 overflow-hidden min-w-full max-w-20 mx-auto sm:py-24 lg:px-8'>
      <p className='text-gray-500 text-xs text-center mt-10'>
        © {new Date().getFullYear()} <FormatMessage id='Logo' /> • <FormatMessage id='Rights' />
      </p>
    </div>
  )
}
