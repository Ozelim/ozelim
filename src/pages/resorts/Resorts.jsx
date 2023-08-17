import { clsx } from '@mantine/core'
import { ResortCard } from 'entities/resort'
import React from 'react'
import {  Link, useSearchParams } from 'react-router-dom'
import { pb } from 'shared/api'
import { useUtils } from 'shared/hooks'
import { BomjPlaza } from 'widgets/BomjPlaza'

async function getResortsByRegion (region, page) {
  return (await pb.collection('resorts').getList(page, 20, {
    filter: `(region = '${region}') && (status = 'bomj')`
  })).items
}

export const Resorts = () => {

  const [searchParams] = useSearchParams()

  const {regions, record} = useUtils()

  const [resorts, setResorts] = React.useState([])

  React.useEffect(() => {
    getResortsByRegion(searchParams.get('region'), searchParams.get('page'))
    .then(res => {
      console.log(res, 'res');
      setResorts(res)
    })
  }, [searchParams.get('region')])

  return (
    <div className='w-full'>
      <div className="container">
        <div className="w-full">
          <div className="grid grid-cols-[350px_auto] gap-4">
            <ul className='flex flex-col bg-white shadow-md p-4 rounded-primary'>
              {regions?.map((region, i) => {
                return (
                  <Link to={`/resorts/?region=${region}&page=1`} key={i}>
                    <li className={clsx('p-2 font-head cursor-pointer transition-all duration-200', {
                      'text-primary-500': searchParams.get('region') === region
                    })}>
                        {region}
                    </li>
                  </Link>
                )
              })}
            </ul>
            <div>
              <div className='flex text-lg'>
                <h1>{searchParams.get('region')}</h1>
              </div>
              {resorts.length === 0 && (
                <div className='flex justify-center items-center h-full'>Не найдено курортов в этой области</div>
              )}
              {resorts && (
                <div className="grid grid-cols-1 gap-4 mt-4">
                  {resorts.map((resort, i) => {
                    return (
                      <BomjPlaza resort={resort} key={i}/>
                      // <ResortCard resort={resort} key={i} />
                    )
                  })}
                </div>
              )}
            </div>

          </div>
        </div>
      </div>
    </div>
  )
}