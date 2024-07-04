import type { Json } from '@/application/dtos/json'

export default function qs(query: Json | undefined): string {
  if (!query) return ''

  const result: string[] = Object.entries(query).reduce(
    (a: string[], [k, v]) => {
      if (v && v !== '') {
        a.push(`${k}=${v}`)
      }

      return a
    },
    [],
  )

  return result.join('&')
}
