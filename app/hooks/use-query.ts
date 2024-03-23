import { useContext, useEffect, useMemo, useState } from 'react';

import NetworkContext from '~/app/context/network'
import queryString from '~/app/lib/utils/query-string'
import cacheMap from '~/app/application/dtos/data-access/cache'

import type { Auth, INetworkProvider, Response } from '~/app/application/dtos/data-access/network'
import type { Query, QueryResult } from '~/app/application/dtos/data-access/query'

export default function useQuery<Data extends Response, Error extends Response>(
  key: string,
  option: Partial<Query<Data, Error>> = {},
): QueryResult<Data, Error> {
  const context = useContext<Partial<INetworkProvider>>(NetworkContext)
  
  const [data, setData] = useState<Data>()
  const [error, setError] = useState<Error>()
  const [isError, setIsError] = useState<boolean>(false)
  const [loading, setLoading] = useState<boolean>(true)
  
  const url = useMemo<string>(() => `${context.baseUrl}${key}${queryString(option.queryParams)}`, [context.baseUrl, key, option.queryParams])
  const fetchConfig = useMemo<{ headers: HeadersInit, method: string }>(() => ({
    method: 'GET',
    headers: {
      ...context.headers,
      ...option?.auth?.accessToken ? { AuthenticationToken: option.auth.accessToken } : {},
    },
  }), [context.headers, option.auth?.accessToken])
  
  function responseHandler(res: Data | Error, cache: boolean = true): void {
    if (context.errors && context.errors?.[res.statusCode]) {
      setError(res as Error)
      setData(undefined)
      setLoading(false)
    } else {
      setData(res as Data)
      setLoading(false)
    }

    if (cache) {
      cacheMap.set({ url, fetchConfig }, JSON.stringify(res))
    }
  }
  
  async function runFetch(): Promise<void> {
    let res: Data | Error
    try {
      res = await (await fetch(url, fetchConfig)).json()

      if (context.unAuthCode && context.unAuthCode === res.statusCode) {
        const auth: Auth | undefined = await context.onAuthFailed?.()
        res = await (
          await fetch(url, {
            ...fetchConfig,
            headers: {
              ...fetchConfig.headers,
              ...auth?.accessToken ? { AuthenticationToken: auth.accessToken } : {},
            },
          })
        ).json()
        responseHandler(res)
      } else {
        responseHandler(res)
      }
    } catch (err) {
      setIsError(true)
      setLoading(false)
      setData(undefined)
      setError(err as Error)
    }
  }
  
  async function refetch(): Promise<void> {
    setLoading(true)
    setIsError(false)
    setData(undefined)
    await runFetch()
  }
  
  async function run(): Promise<void> {
    const res: Data | Error = cacheMap.get({ fetchConfig, url })
    
    if (res) {
      responseHandler(res, false)
    } else if (key !== '' && key !== null && key !== undefined) {
      await refetch()
    }
  }
  
  useEffect(() => {
    (async (): Promise<void> => await run())()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [key, option.notifyOnChangeProps, option.queryParams])
  
  return { data, error, isError, loading, refetch }
}
