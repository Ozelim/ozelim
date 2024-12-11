import React from 'react'
import { Product } from './product'
import { pb } from 'shared/api'

async function getAllProducts () {
  return await pb.collection('products').getFullList()
}

export const Catalog = () => {

  const [products, setProducts] = React.useState([])

  React.useEffect(() => {
    getAllProducts()
    .then(res => {
      setProducts(res)
    })
  }, [])

  return (
    <div className='grid grid-cols-6 gap-4'>
      {products?.map((q, i) => {
        return (
          <Product key={i} product={q} />
        )
      })}
    </div>
  )
}
