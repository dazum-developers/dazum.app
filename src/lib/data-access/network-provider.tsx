import type { JSX, PropsWithChildren } from 'react'
import { useMemo } from 'react'

import type { INetworkProvider } from '@/application/dtos/data-access/network'
import NetworkContext from '@/context/network'

export function NetworkProvider(
  props: PropsWithChildren<Partial<INetworkProvider>>,
): JSX.Element {
  const baseUrl: string | undefined = props.baseUrl

  const context: Partial<INetworkProvider> = useMemo(
    (): Partial<INetworkProvider> => ({ baseUrl }),
    [baseUrl],
  )

  return (
    <NetworkContext.Provider value={context}>
      {props.children}
    </NetworkContext.Provider>
  )
}
