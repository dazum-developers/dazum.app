import { DError } from '../enums/errors'

export interface BaseError {
  message: string
  statusCode: DError
}

export class UserNotFoundError implements BaseError {
  public message: string = 'User with this email does not exist.'

  public statusCode: DError = DError.USER_NOT_EXIST
}

export class CerealNotFoundError implements BaseError {
  public message: string = 'Invalid user credentials.'

  public statusCode: DError = DError.INVALID_CEREAL
}

export class InvalidPasswordError implements BaseError {
  public message: string = 'Password does not match.'

  public statusCode: DError = DError.PASSWORD_MISSMATCH
}
