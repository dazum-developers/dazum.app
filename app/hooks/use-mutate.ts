import { useCallback, useContext, useState } from 'react'

import NetworkContext from '~/app/context/network'

import type { Mutate } from '~/app/application/dtos/data-access/mutate'
import type { Auth, INetworkProvider, Response } from '~/app/application/dtos/data-access/network'
import type { Json } from '~/app/application/dtos/json'

export default function useMutate(option: Partial<Mutate>) {
  const context: Partial<INetworkProvider> = useContext(NetworkContext)

  const [loading, setLoading] = useState<boolean>(false)

  const mutate = useCallback(
    (key: string, mutateOption: Json): void => {
      // eslint-disable-next-line @typescript-eslint/no-extra-semi
      ;(async (): Promise<void> => {
        const url = `${context.baseUrl}${key}`
        const config = {
          method: option.method ?? 'POST',
          headers: {
            ...context.headers,
            // eslint-disable-next-line @typescript-eslint/no-extra-parens
            ...(option.auth?.accessToken ? { AuthenticationToken: option.auth?.accessToken } : {}),
          },
          body: JSON.stringify(mutateOption.body),
        }

        setLoading(true)

        try {
          let res = await (await fetch(url, config)).json()

          if (context.unAuthCode === res.statusCode) {
            const auth: Auth | undefined = await context.onAuthFailed?.()

            res = await (
              await fetch(url, {
                ...config,
                headers: {
                  ...config.headers,
                  // eslint-disable-next-line @typescript-eslint/no-extra-parens
                  ...(auth?.accessToken ? { AuthenticationToken: auth.accessToken } : {}),
                },
              })
            ).json()
            option.onSuccess?.(res)
            setLoading(false)
          } else {
            option.onSuccess?.(res)
            setLoading(false)
          }
        } catch (error: unknown) {
          // @ts-expect-error message does not exist of type `unknown`
          // eslint-disable-next-line no-console
          console.log('Error in mutate call: ', error?.message)
          option.onError?.(error as Response)
          setLoading(false)
        }
      })()
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [option.auth, option.method],
  )

  return { loading, mutate }
}
