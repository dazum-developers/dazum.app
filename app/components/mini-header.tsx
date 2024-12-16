import type { JSX } from 'react'

import { Link } from '@remix-run/react'

import Dazum from '~/app/assets/images/dazum.svg?react'

export function MiniHeader(): JSX.Element {
  return (
    <header className='max-h-16 px-16 py-4'>
      <Link to='/' title='Head back to Dazum 😎'>
        <Dazum width='80px' height='45px' />
      </Link>
    </header>
  )
}
