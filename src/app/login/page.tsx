import type { JSX } from 'react'

export default function LoginPage(): JSX.Element {
  return (
    <form
      action='/api/login'
      className='flex flex-col gap-2 max-w-96'
      method='POST'
    >
      <label htmlFor='email'>Email Address</label>
      <input
        id='email'
        name='email'
        placeholder='Email'
        required
        type='email'
      />
      <label htmlFor='password'>Your Password</label>
      <input
        id='password'
        name='password'
        placeholder='Password'
        required
        type='password'
      />

      <input type='submit' />
    </form>
  )
}
