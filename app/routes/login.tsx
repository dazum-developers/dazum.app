import { type JSX } from 'react'

import type { ActionFunctionArgs, LoaderFunctionArgs } from '@remix-run/node'
import { Form, Link, json, redirect, useActionData } from '@remix-run/react'

import FormatMessage from '~/app/components/format-message'
import FormField from '~/app/lib/ui/form-field'

import type { ResponseDto } from '~/app/application/contracts/response/response'
import { DError } from '~/app/application/enums/errors'
import { loginController } from '../application/controller/login'

// @ts-expect-error Cannot find module
import AppleIcon from '~/app/assets/icons/apple.svg?react'
// @ts-expect-error Cannot find module
import GoogleIcon from '~/app/assets/icons/google.svg?react'
import { getUserSession } from '../session.server'

export async function loader({ request }: LoaderFunctionArgs) {
  const payload = await getUserSession(request)

  if (payload.data?.id) {
    return redirect('/dashboard')
  }

  return json(payload?.data, 200)
}

export async function action(props: ActionFunctionArgs) {
  return await loginController(props)
}

export default function LoginPage(): JSX.Element {
  const data = useActionData<ResponseDto>()

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

        <Form action='/login' className='flex flex-col gap-6 w-full' method='post'>
          <div className='flex flex-col gap-6 sm:flex-row w-full'>
            <FormField
              error={data?.statusCode === DError.EMAIL_REQUIRED}
              errorMessage={data?.message}
              id='email'
              label='Email'
              name='email'
              placeholder='name@company.com'
              required
              type='email'
            />

            <div className='flex flex-col gap-1 w-full'>
              <FormField
                error={data?.statusCode === DError.INVALID_PASSWORD || data?.statusCode === DError.PASSWORD_REQUIRED}
                errorMessage={data?.message}
                id='password'
                label='Password'
                name='password'
                placeholder='••••••••'
                required
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
            type='submit'>
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
              href='/'>
              <GoogleIcon />
              <FormatMessage id='LoginPage.SignInWithGoogle' />
            </a>
            <a
              className='gap-2 w-full inline-flex items-center justify-center py-2.5 px-5 mr-2 mb-2 text-sm font-medium text-gray-700 outline-2 bg-white rounded border border-solid hover:bg-gray-100 hover:text-gray-900'
              href='/'>
              <AppleIcon />
              <FormatMessage id='LoginPage.SignInWithApple' />
            </a>
          </div>
        </Form>
      </div>
      <div className='w-full hidden lg:inline-flex'>
        <img alt='illustration' className='mx-auto flex w-full max-w-[560px]' src='./icons/illustration.svg' />
      </div>
    </section>
  )
}
