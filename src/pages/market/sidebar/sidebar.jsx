import React from 'react'
import { Accordion, Button } from '@mantine/core'
import { useSearchParams } from 'react-router-dom'

export const Sidebar = () => {

  const [params, setParams] = useSearchParams()

  return (
    <div>
      <div className='flex flex-col gap-4 border shadow-md'>
      {Array(10).fill(1).map((q, i) => {
        return (
          <div className='p-3 border-t-2'>
            <button>
              Lorem, ipsum.
            </button>
            <ul className='ml-2 space-y-2 mt-2'>
              {Array(5).fill(1).map((q, i) => {
                return (
                  <li>
                    <button className='text-sm'>
                      Lorem, ipsum dolor.
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
