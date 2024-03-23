export interface Auth {
  accessToken: string | undefined
  expiryAt: number
  refreshToken: string | undefined
}

export interface NetworkConfig {
  auth: Auth
  errors: string[]
  headers: HeadersInit
  onAuthFailed: () => Promise<Auth>
  unAuthCode: number
}

export interface INetworkProvider extends Partial<NetworkConfig> {
  baseUrl: string | undefined
}

export interface Response {
  status: boolean
  statusCode: number
}
