import React from 'react'
import { useSearchParams } from 'react-router-dom'

export const Resorts = () => {

  const [searchParams] = useSearchParams()

  console.log(searchParams.get('city'));

  return (
    <div>Resorts</div>
  )
}