import type { ComponentProps, JSX, LegacyRef } from 'react'
import { forwardRef } from 'react'
import { clsx } from 'clsx'

function InputComp(
  props: Readonly<ComponentProps<'input'>>,
  ref: LegacyRef<HTMLInputElement> | undefined,
): JSX.Element {
  return (
    <input
      {...props}
      className={clsx(
        'text-sm text-gray-900 p-2.5 bg-gray-50 border border-solid border-gray-300 rounded-lg w-full block',
        props.className,
      )}
      ref={ref}
    />
  )
}

const Input = forwardRef(InputComp)
Input.displayName = 'Input'

export default Input
