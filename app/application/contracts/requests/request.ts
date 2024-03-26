import type { DError } from '~/app/application/enums/errors'

export interface AppRequest {
  validate: () => { message: string; statusCode: DError } | boolean
}

export default class RequestDto implements AppRequest {
  public validate(): { message: string; statusCode: DError } | boolean {
    return false
  }
}
