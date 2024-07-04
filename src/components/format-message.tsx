import { type JSX } from 'react'

import en from '@/translations/en'

export type Json = { [key: string]: string }

export interface FormatMessageProps {
  id: string
  value?: string | number | boolean | Json
}

export default function FormatMessage(
  props: FormatMessageProps,
): JSX.Element | string {
  const { id, value } = props

  let message: string = (en as Json)[id]
  if (typeof value === 'object') {
    for (const [key, val] of Object.entries(value)) {
      message = message.replaceAll(`{{${key}}}`, val?.toString() ?? '')
    }
  } else {
    message = message.replaceAll(/\{\{\w+\}\}/g, value?.toString() ?? '')
  }

  return message ?? ''
}
