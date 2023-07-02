import { clsx } from '@mantine/core'
import React from 'react'
import { useLocation } from 'react-router-dom'

export const Heading = ({title, className}) => {

  return (
    <h1 className={clsx('text-xl md:text-3xl font-head text-center font-medium mb-10', className)}>{title}</h1>
  )
}
