import { useMemo } from 'react'
import type { JSX, PropsWithChildren } from 'react'

import NetworkContext from '~/app/context/network'
import type { INetworkProvider } from '~/app/application/dtos/data-access/network'

export function NetworkProvider(props: PropsWithChildren<Partial<INetworkProvider>>): JSX.Element {
  const baseUrl: string | undefined = props.baseUrl

  const context: Partial<INetworkProvider> = useMemo((): Partial<INetworkProvider> => ({ baseUrl }), [baseUrl])

  return <NetworkContext.Provider value={context}>{props.children}</NetworkContext.Provider>
}
