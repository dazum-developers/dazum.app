import type { Auth, Response } from './network'

export interface Mutate {
  auth: Auth
  headers: HeadersInit
  method: 'DELETE' | 'PATCH' | 'POST' | 'UPDATE'
  onError: (error: Response) => void
  onSuccess: (data: Response) => void
}
