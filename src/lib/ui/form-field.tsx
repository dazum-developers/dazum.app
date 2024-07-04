import { clsx } from 'clsx'
import type { JSX, LegacyRef } from 'react'
import { forwardRef, memo } from 'react'

import Input from './input'

import type { FormFieldProps } from '@/application/dtos/ui/form-field-props'

function FormFieldComp(
  props: Readonly<FormFieldProps>,
  ref: LegacyRef<HTMLInputElement> | undefined,
): JSX.Element {
  const { error, errorMessage, id, label, ...rest } = props

  return (
    <div className='flex flex-col gap-1 w-full'>
      <label htmlFor={id}>{label}</label>
      <Input
        {...rest}
        className={clsx(error ? 'border-red-500 bg-red-100' : '')}
        id={id}
        // @ts-expect-error TypeA is not assignable to TypeB
        ref={ref}
      />
      {error ? <p className='text-red-500 text-xs'>{errorMessage}</p> : null}
    </div>
  )
}

const FormField = memo(forwardRef(FormFieldComp))
FormField.displayName = 'FormField'

export default FormField
