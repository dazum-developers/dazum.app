import { useLocation } from '@remix-run/react'
import { useEffect } from 'react'

import { IStaticMethods } from 'preline/preline'

declare global {
  interface Window {
    HSStaticMethods: IStaticMethods
  }
}

export default function PrelineScript() {
  const location = useLocation()

  useEffect(() => {
    import('preline/preline')
  }, [])

  useEffect(() => {
    setTimeout(() => {
      console.log(window.HSStaticMethods)
      window.HSStaticMethods.autoInit()
    }, 100)
  }, [location.pathname])

  return null
}
