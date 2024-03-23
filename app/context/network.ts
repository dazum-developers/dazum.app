import { createContext } from 'react'

import type { INetworkProvider } from '~/app/application/dtos/data-access/network'

const NetworkContext = createContext<Partial<INetworkProvider>>({
  baseUrl: undefined,
})

export default NetworkContext
