import React from 'react'
import { PriceList } from 'modules/PriceList'
import { CourseUsefulFor } from 'pages/courses/ui/CourseUsefulFor'
import { pb } from 'shared/api'
import { usePageData } from 'shared/hooks'

async function getPrices () {
  return await pb.collection('prices').getFullList({expand: 'prices'})
}

export const Price = () => {

  const {text, headings} = usePageData('price')

  const [prices, setPrices] = React.useState([])

  React.useEffect(() => {
    getPrices()
    .then(res => {
      setPrices(res)
    })
  }, [])

  return (
    <div>
      <div className='space-y-16'>
        {prices?.map((price) => {
          return (
            <div>
              <CourseUsefulFor price={price} />
              <PriceList list={price?.expand?.prices} />
            </div>
          )
        })}
      </div>
      {/* <div className='mt-10 lg:mt-20'>
        <CourseUsefulFor type='new' />
        <PriceList type='new' />
      </div> */}

    <div className="container mt-6">
      <div>
        <h3 className='text-2xl text-primary-600 font-bold'>{headings?.q1}</h3>
        <ul className='mt-4'>
          <li className='flex gap-4'>
            <div className="bg-primary-500 w-4 h-4 rounded-full mt-1 flex-shrink-0" />
            <span className='text-lg'>
              {text?.q1}
            </span>
          </li>
          <li className='flex gap-4'>
            <div className="bg-primary-500 w-4 h-4 rounded-full mt-1 flex-shrink-0" />
            <span className='text-lg'>
              {text?.q2}
            </span>
          </li>
          <li className='flex gap-4'>
            <div className="bg-primary-500 w-4 h-4 rounded-full mt-1 flex-shrink-0" />
            <span className='text-lg'>
              {text?.q3}
            </span>
          </li>
          <li className='flex gap-4'>
            <div className="bg-primary-500 w-4 h-4 rounded-full mt-1 flex-shrink-0" />
            <span className='text-lg'>
              {text?.q4}
            </span>
          </li>
        </ul>
      </div>
    </div>
    </div>
  )
}
