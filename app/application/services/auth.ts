import type { Cereal, User } from '@prisma/client'
import bcrypt from 'bcryptjs'

import { prisma } from '~/app/db.server'
import { CerealNotFoundError, InvalidPasswordError, UserNotFoundError } from '../errors/user'

import type { Json } from '~/app/components/format-message'
import type LoginRequestDto from '../contracts/requests/login-request'

async function getUserByEmail(email: string): Promise<User | null> {
  return await prisma.user.findUnique({ where: { email } })
}

async function getUserCerealById(userId: string): Promise<Cereal | null> {
  return await prisma.cereal.findUnique({ where: { userId } })
}

export async function loginService(
  payload: LoginRequestDto,
): Promise<User | null | UserNotFoundError | CerealNotFoundError | InvalidPasswordError> {
  const { email, password } = payload

  async function getUser(params: Readonly<{ email: string; password: string }>) {
    const userResult = await getUserByEmail(params.email)

    if (userResult?.id) {
      return { ...params, userResult }
    } else {
      throw new UserNotFoundError()
    }
  }

  async function getCereal(params: Readonly<{ email: string; password: string; userResult: User | null }>) {
    const cerealResult: Cereal | null = await getUserCerealById(params.userResult?.id as string)

    if (cerealResult?.id) {
      return { ...params, cerealResult }
    } else {
      throw new CerealNotFoundError()
    }
  }

  async function verifyCredential(
    params: Readonly<{ cerealResult: Cereal | null; email: string; password: string; userResult: User | null }>,
  ) {
    const cereal: Cereal | null = params.cerealResult

    if (cereal?.key) {
      let decodePayload: string | Json = Buffer.from(cereal?.key, 'base64').toString()
      decodePayload = JSON.parse(decodePayload)
      const result = bcrypt.compareSync(params.password, (decodePayload as Json).key)

      if (result) {
        return { user: params.userResult }
      } else {
        throw new InvalidPasswordError()
      }
    } else {
      throw new InvalidPasswordError()
    }
  }

  try {
    const user = await getUser({ email, password })
    const cereal = await getCereal(user)
    const creds = await verifyCredential(cereal)

    return creds.user
  } catch (error: unknown) {
    return error as UserNotFoundError | CerealNotFoundError | InvalidPasswordError
  }
}
