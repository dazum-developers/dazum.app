import type { User } from '@prisma/client'
import type { TypedResponse } from '@remix-run/node'
import { createCookieSessionStorage, redirect } from '@remix-run/node'

// eslint-disable-next-line n/no-process-env
const sessionSecret = process.env.SESSION_SECRET
if (!sessionSecret) {
  throw new Error('SESSION_SCRET must be set.')
}

export const storage = createCookieSessionStorage({
  cookie: {
    name: 'token',
    // eslint-disable-next-line n/no-process-env
    secure: process.env.NODE_ENV === 'production',
    secrets: [sessionSecret],
    sameSite: 'lax',
    path: '/',
    maxAge: 60 * 60 * 24 * 30, // 30 days
    httpOnly: true,
  },
})

export function getUserSession(request: Request) {
  return storage.getSession(request.headers.get('Cookie'))
}

export async function logout(request: Request) {
  const session = await getUserSession(request)
  return redirect('/login', {
    status: 200,
    headers: {
      'Set-Cookie': await storage.destroySession(session),
    },
  })
}

export async function createUserSession(user: User, path: string): Promise<TypedResponse<never>> {
  const session = await storage.getSession()
  session.set('id', user.id)
  session.set('fullname', user.fullname)
  session.set('email', user.email)
  session.set('emailVerified', user.emailVerified)
  session.set('designation', user.designation)
  return redirect(path, {
    headers: {
      'Set-Cookie': await storage.commitSession(session),
    },
  })
}
