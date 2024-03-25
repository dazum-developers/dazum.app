import type { JSX } from 'react'

import { Link } from '@remix-run/react'

import FormatMessage from '~/app/components/format-message'
import FormField from '~/app/lib/ui/form-field'

// @ts-expect-error Cannot find module
import AppleIcon from '~/app/assets/icons/apple.svg?react'
// @ts-expect-error Cannot find module
import GoogleIcon from '~/app/assets/icons/google.svg?react'

export default function LoginPage(): JSX.Element {
  return (
    <section className='w-full h-screen flex justify-center items-center bg-white sm:bg-gray-50 lg:p-8'>
      <div className='w-full flex flex-col gap-4 p-4 sm:p-8 bg-white rounded sm:shadow-lg sm:max-w-[600px]'>
        <Link className='flex gap-2 font-bold' to='/'>
          <FormatMessage id='Logo' />
        </Link>

        <h1 className='text-2xl font-bold text-gray-900 dark:text-white'>
          <FormatMessage id='LoginPage.WelcomeBack' />
        </h1>

        <p className='text-sm font-light text-gray-500 dark:text-gray-300'>
          <FormatMessage id='LoginPage.DontHaveAccount' />{' '}
          <Link className='font-medium text-blue-600 hover:underline dark:text-blue-500' to='/sign-up'>
            <FormatMessage id='LoginPage.Signup' />
          </Link>
          .
        </p>

        <form className='flex flex-col gap-6 w-full'>
          <div className='flex flex-col gap-6 sm:flex-row w-full'>
            <FormField
              id='email'
              label='Email'
              placeholder='name@company.com'
              type='email'
            />

            <div className='flex flex-col gap-1 w-full'>
              <FormField
                id='password'
                label='Password'
                placeholder='••••••••'
                type='password'
              />
              <div className='flex items-center justify-between ml-auto'>
                <Link className='text-primary-600 text-sm hover:underline dark:text-primary-500' to='/forgot-password'>
                  <FormatMessage id='LoginPage.ForgotPassword' />
                </Link>
              </div>
            </div>
          </div>

          <button
            className='w-full text-white bg-blue-600 hover:bg-blue-700 outline-none focus:ring-blue-300 font-medium rounded text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800'
            type='submit'
          >
            <FormatMessage id='LoginPage.SignInToYourAccount' />
          </button>

          <div className='flex items-center'>
            <div className='w-full h-0.5 bg-gray-200 dark:bg-gray-700' />
            <div className='px-5 text-center text-gray-500 dark:text-gray-400'>
              <FormatMessage id='Or' />
            </div>
            <div className='w-full h-0.5 bg-gray-200 dark:bg-gray-700' />
          </div>

          <div className='flex flex-col gap-4 w-full'>
            <a
              className='gap-2 w-full inline-flex items-center justify-center py-2.5 px-5 mr-2 mb-2 text-sm font-medium text-gray-700 outline-2 bg-white rounded border border-solid hover:bg-gray-100 hover:text-gray-900'
              href='/'
            >
              <GoogleIcon />
              <FormatMessage id='LoginPage.SignInWithGoogle' />
            </a>
            <a
              className='gap-2 w-full inline-flex items-center justify-center py-2.5 px-5 mr-2 mb-2 text-sm font-medium text-gray-700 outline-2 bg-white rounded border border-solid hover:bg-gray-100 hover:text-gray-900'
              href='/'
            >
              <AppleIcon />
              <FormatMessage id='LoginPage.SignInWithApple' />
            </a>
          </div>
        </form>
      </div>
      <div className='w-full hidden lg:inline-flex'>
        <img alt='illustration' className='mx-auto flex w-full max-w-[560px]' src='./icons/illustration.svg' />
      </div>
    </section>
  )
}
