import { createContext } from 'react'

import type { INetworkProvider } from '@/application/dtos/data-access/network'

const NetworkContext = createContext<Partial<INetworkProvider>>({
  baseUrl: undefined,
})

export default NetworkContext
