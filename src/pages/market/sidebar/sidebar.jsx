import React from 'react'
import { Accordion, Button, clsx } from '@mantine/core'
import { useSearchParams } from 'react-router-dom'
import { pb } from 'shared/api'
import { useCategoriesStore } from '../categoriesStore'
import { useProductsStore } from '../catalog/producsStore'

export const Sidebar = () => {

  const [params, setParams] = useSearchParams()

  const {categories} = useCategoriesStore()

  const {getProductsByCategory, getProductsBySubCategory} = useProductsStore()

  function handleCategory (q) {
    setParams({cat: q})
    getProductsByCategory(null, q)
  }

  function handleSubCategory (q, w) {
    setParams({
      cat: q,
      sub: w,
    })
    getProductsBySubCategory(null, w)
  }

  return (
    <div className='sticky top-0 left-0 h-[61vh] overflow-y-scroll'>
      {/* <p className='text-lg ml-3 uppercase py-4'>
        все Категории
      </p> */}
      <div className='flex flex-col'>
        {categories?.map((q, i) => {
          return (
            <div className='p-3 ' key={i}>
              <button 
                onClick={() => handleCategory(q?.label)}
                className={clsx('text-sm', {
                  'text-pink-600': params?.get('cat') === q?.label
                })}
              >
                {q?.label}
              </button>
              <ul className='ml-3 space-y-3 mt-3'>
                {q?.subs?.map((w, i) => {
                  return (
                    <li key={i}>
                      <button 
                        className={clsx('text-sm', {  
                          'text-pink-600': params?.get('sub') === w?.label
                        })} 
                        onClick={() => handleSubCategory(q?.label, w?.label)}
                      >
                        {w?.label}
                      </button>
                    </li>
                  ) 
                })}
              </ul>
            </div>
          )
        })}
      </div>
    </div>
  )
}
