import { DError } from '~/app/application/enums/errors'
import type { AppRequest } from './request'

import { validatePassword } from '~/app/lib/utils/validations/auth'

export interface LoginRequest extends AppRequest {
  email: string
  password: string
  rdir: string | null
}

export default class LoginRequestDto implements LoginRequest {
  public email: string

  public password: string

  /**
   * url to re-direct after successfull login
   */
  public rdir: string | null

  public constructor(email: string, password: string, rdir: string | null) {
    this.email = email
    this.password = password
    this.rdir = rdir
  }

  public validate(): { message: string; statusCode: DError } | boolean {
    if (!this.email) {
      return { message: 'Email is a required field.', statusCode: DError.EMAIL_REQUIRED }
    }

    if (!this.password) {
      return { message: 'Password is a required field.', statusCode: DError.PASSWORD_REQUIRED }
    }

    if (this.password && !validatePassword(this.password)) {
      return { message: 'Password is invalid.', statusCode: DError.INVALID_PASSWORD }
    }

    return false
  }
}
