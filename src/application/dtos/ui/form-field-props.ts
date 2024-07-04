import type { ComponentProps } from 'react'

export interface FormFieldProps extends ComponentProps<'input'> {
  error?: boolean
  errorMessage?: string
  id: string
  label: string
}
