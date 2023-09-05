import React from 'react'
import { usePageData } from 'shared/hooks'

export const Results = () => {

  const {text, headings} = usePageData('stats')

  return (
    <div className='w-full pt-10'>
      <div className="container">
        <h1 className='heading'>{headings?.[1]}</h1>
        <div className='grid grid-cols-1 md:grid-cols-3 gap-4 mt-6'>
          <div>
            <h2 className='md:text-2xl lg:text-4xl text-primary-500 border-b-4 border-black pb-2 md:pb-4 font-bold'>
              {text?.[1]}
            </h2>
            <p className='mt-2 md:mt-4 text text-xl'>
              {text?.[4]}
            </p>
          </div>
          <div>
            <h2 className='md:text-2xl lg:text-4xl text-primary-500 border-b-4 border-black pb-2 md:pb-4 font-bold'>
              {text?.[2]}
            </h2>
            <p className='mt-2 md:mt-4 text text-xl'>
              {text?.[5]}
            </p>
          </div>
          <div>
            <h2 className='md:text-2xl lg:text-4xl text-primary-500 border-b-4 border-black pb-2 md:pb-4 font-bold'>
              {text?.[3]}
            </h2>
            <p className='mt-2 md:mt-4 text text-xl'>
              {text?.[6]}
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
