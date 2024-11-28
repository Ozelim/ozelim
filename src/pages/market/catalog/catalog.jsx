import React from 'react'
import { Product } from './product'

export const Catalog = () => {
  return (
    <div className='grid grid-cols-3 gap-4'>
      {Array(10).fill(1).map((q, i) => {
        return (
          <Product key={i}/>
        )
      })}
    </div>
  )
}
