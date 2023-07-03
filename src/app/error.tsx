'use client'

import { notFound } from 'next/navigation'
import InternalServerError from './errors/500'
import ForbiddenError from './errors/403'

export interface IErrorHandler {
  error: Error
  reset: () => void
}

const error = ({ error }: IErrorHandler) => {
  if (error.message.includes('500')) {
    return InternalServerError()
  }
  if (error.message.includes('403')) {
    return ForbiddenError()
  }

  return notFound()
}

export default error
