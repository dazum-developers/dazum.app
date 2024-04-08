/* eslint-disable  @typescript-eslint/indent */
import type { JSX, PropsWithChildren } from 'react'

import { motion, type EasingFunction } from 'framer-motion'
import { useContext, useEffect, useMemo, useState } from 'react'

import { IntersectionContext } from '~/app/context/intersection-observer'

export default function FadeInUp({
  children,
  delayOrder,
  easing = 'linear',
  yOffset = 24,
}: Readonly<
  PropsWithChildren<
    Partial<{
      delayOrder: number
      easing:
        | number[]
        | 'linear'
        | 'easeIn'
        | 'easeOut'
        | 'easeInOut'
        | 'circIn'
        | 'circOut'
        | 'circInOut'
        | 'backIn'
        | 'backOut'
        | 'backInOut'
        | 'anticipate'
        | EasingFunction
      yOffset: number
    }>
  >
>): JSX.Element {
  const { inView } = useContext(IntersectionContext)
  const [delay, setDelay] = useState<number>(0.25)

  const offset = 0.4

  useEffect(() => {
    if (delayOrder) return setDelay(delayOrder * offset)
  }, [delayOrder, offset])

  const transition = useMemo(
    () => ({
      duration: 0.6,
      delay,
      ease: easing,
    }),
    [delay, easing],
  )

  const variants = {
    hidden: { y: yOffset, opacity: 0, transition },
    show: {
      y: 0,
      x: 0,
      opacity: 1,
      transition,
    },
  }

  return (
    <motion.div animate={inView ? 'show' : 'hidden'} exit='hidden' initial='hidden' variants={variants}>
      {children}
    </motion.div>
  )
}
