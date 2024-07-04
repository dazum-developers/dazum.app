import type { Auth, Response } from './network'
import type { Json } from '../json'

export interface Query<Data extends Response, Error extends Response> {
  auth: Auth
  notifyOnChangeProps: string[]
  queryParams: Json
  refetchOnMount: boolean // defaults to true
  retry: number
  transformResponse: (res: Data | Error) => Data | Error
}

export interface QueryResult<Data extends Response, Error extends Response> {
  data: Data | undefined
  error: Error | undefined
  isError: boolean
  loading: boolean
  refetch: () => Promise<void>
}
