/* eslint @typescript-eslint/indent: 0 */

import { type NextRequest, NextResponse } from 'next/server'
import type { User } from '@prisma/client'

import { createUserSession } from '@/server/session'
import LoginRequestDto from '../contracts/requests/login-request'
import {
  CerealNotFoundError,
  InvalidPasswordError,
  UserNotFoundError,
} from '../errors/user'
import { loginService } from '../services/auth'

export async function loginController(request: NextRequest) {
  const formData = await request.formData()
  const email = String(formData.get('email') ?? '')
  const password = String(formData.get('password') ?? '')
  const rdir = String(formData.get('rdir') ?? '')

  const loginRequest = new LoginRequestDto(email, password, rdir)
  const error = loginRequest.validate()

  if (typeof error === 'boolean' && !error) {
    const user:
      | User
      | null
      | UserNotFoundError
      | CerealNotFoundError
      | InvalidPasswordError = await loginService(loginRequest)

    if (
      user instanceof UserNotFoundError ||
      user instanceof CerealNotFoundError ||
      user instanceof InvalidPasswordError
    ) {
      return NextResponse.json({ status: true, ...user }, { status: 400 })
    } else if (user) {
      // TODO: Navigate user based on user role.
      return await createUserSession(user, '/1234/dashboard')
    }
  }

  return NextResponse.json({
    status: true,
    // eslint-disable-next-line @typescript-eslint/no-extra-parens
    ...(typeof error !== 'boolean' ? error : { error }),
  })
}
