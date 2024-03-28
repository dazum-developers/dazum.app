import { json, type ActionFunctionArgs } from '@remix-run/node'

import type { User } from '@prisma/client'

import { createUserSession } from '~/app/session.server'
import LoginRequestDto from '../contracts/requests/login-request'
import { CerealNotFoundError, InvalidPasswordError, UserNotFoundError } from '../errors/user'
import { loginService } from '../services/auth'

export async function loginController({ request }: ActionFunctionArgs) {
  const formData = await request.formData()
  const email = String(formData.get('email') ?? '')
  const password = String(formData.get('password') ?? '')
  const rdir = String(formData.get('rdir') ?? '')

  const loginRequest = new LoginRequestDto(email, password, rdir)
  const error = loginRequest.validate()

  if (typeof error === 'boolean' && !error) {
    const user: User | null | UserNotFoundError | CerealNotFoundError | InvalidPasswordError =
      await loginService(loginRequest)

    if (
      user instanceof UserNotFoundError ||
      user instanceof CerealNotFoundError ||
      user instanceof InvalidPasswordError
    ) {
      return json({ status: true, ...user }, 400)
    } else if (user) {
      // TODO: Navigate user based on user role.
      return await createUserSession(user, '/dashboard')
    }
  }

  // eslint-disable-next-line @typescript-eslint/no-extra-parens
  return json({ status: true, ...(typeof error !== 'boolean' ? error : { error }) })
}
