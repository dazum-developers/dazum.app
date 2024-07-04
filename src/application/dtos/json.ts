/* eslint @typescript-eslint/indent:0 */

export interface Json {
  [key: string]:
    | string
    | string[]
    | boolean
    | boolean[]
    | number
    | number[]
    | Json
}
