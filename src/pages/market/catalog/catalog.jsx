import React from 'react'
import { pb } from 'shared/api'
import { Product } from '../product'
import { useProductsStore } from './producsStore'
import { LoadingOverlay, Pagination } from '@mantine/core'

export const Catalog = () => {

  const {products, productsLoading, getAllProducts, getProductsByCategory, getProductsBySubCategory} = useProductsStore()

  React.useEffect(() => {
    getAllProducts()
  }, [])

  return (
    <div className='px-4 mb-4 relative'>
      <LoadingOverlay visible={productsLoading}/>

      <div className='grid grid-cols-6 gap-4'>
        {products?.items?.map((q, i) => {
          return (
            <div className="mx-auto" key={i}>
              <Product product={q} />
            </div>
          )
        })}
      </div>
      <div className='flex justify-center mt-4'>
        <Pagination
          total={products?.totalPages}
          value={products?.page}
        />
      </div>
    </div>
  )
}
