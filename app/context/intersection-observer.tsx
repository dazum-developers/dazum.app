import type { PropsWithChildren } from 'react'
import { createContext, memo, useEffect, useRef, useState } from 'react'

import useIntersection from '~/app/hooks/use-intersection'

export const IntersectionContext = createContext({ inView: true })

const IntersectionObserver = memo(
  ({
    children,
    reset = false, // if value set to true - observed element will reappear every time it shows up on the screen
  }: Readonly<PropsWithChildren<{ reset: boolean }>>) => {
    const [inView, setInView] = useState(false)
    const intersectionRef = useRef(null)
    const intersection = useIntersection(intersectionRef, {
      threshold: 0,
    })

    useEffect(() => {
      const inViewNow = intersection && intersection.intersectionRatio > 0
      if (inViewNow) {
        return setInView(inViewNow)
      } else if (reset) {
        return setInView(false)
      }
    }, [intersection, reset])

    return (
      // eslint-disable-next-line react/jsx-no-constructed-context-values
      <IntersectionContext.Provider value={{ inView }}>
        <div ref={intersectionRef}>{children}</div>
      </IntersectionContext.Provider>
    )
  },
)

IntersectionObserver.displayName = 'IntersectionObserver'
