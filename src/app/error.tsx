'use client'

import { notFound } from 'next/navigation'
import InternalServerError from './errors/500'
import ForbiddenError from './errors/403'

const error = ({ error, reset }: { error: Error; reset: () => void }) => {
  if (error.message.includes('500')) {
    return InternalServerError()
  }
  if (error.message.includes('403')) {
    return ForbiddenError()
  }

  return notFound()
}

export default error
