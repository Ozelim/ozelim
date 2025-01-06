import React from 'react'
import { Accordion, Button } from '@mantine/core'
import { useSearchParams } from 'react-router-dom'
import { pb } from 'shared/api'
import { useCategoriesStore } from '../categoriesStore'

export const Sidebar = () => {

  const [params, setParams] = useSearchParams()

  const {categories} = useCategoriesStore()

  return (
    <div>
      <div className='border border-r-0'>
        <p className='text-lg ml-3 uppercase py-4'>
          Категории
        </p>
        <div className='flex flex-col'>
          {categories?.map((q, i) => {
            return (
              <div className='p-3 border-t' key={i}>
                <button>
                  {q?.label}
                </button>
                <ul className='ml-3 space-y-3 mt-3'>
                  {q?.subs?.map((q, i) => {
                    return (
                      <li key={i}>
                        <button className='text-sm'>
                          {q?.label}
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
    </div>
  )
}
