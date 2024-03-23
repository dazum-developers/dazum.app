import { type JSX } from 'react'

import en from '~/app/translations/en'

export type Json = { [key: string]: string }

export interface FormatMessageProps {
  id: string
  value?: string | number | boolean
}

export default function FormatMessage(props: FormatMessageProps): JSX.Element | string {
  const { id, value } = props

  let message: string = (en as Json)[id]
  // eslint-disable-next-line regexp/strict
  message = message.replaceAll(/\{\{\w+}}/g, value?.toString() ?? '')

  return message ?? ''
}
