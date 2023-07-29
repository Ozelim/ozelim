import { ResortCard } from 'entities/resort'
import React from 'react'
import { useLocation, useSearchParams } from 'react-router-dom'
import { pb } from 'shared/api'

async function getResortsByRegion (region, page) {
  return (await pb.collection('resorts').getList(page, 20, {
    filter: `region = '${region}'`
  })).items
}

export const Resorts = () => {

  const [searchParams] = useSearchParams()

  const [resorts, setResorts] = React.useState([])

  React.useEffect(() => {
    getResortsByRegion(searchParams.get('region'), searchParams.get('page'))
    .then(res => {
      setResorts(res)
    })
  }, [searchParams.get('region')])

  return (
    <div className='w-full'>
      <div className="container">
        <div className="grid grid-cols-4 gap-4">
          {resorts.map((resort, i) => {
            return (
              <ResortCard resort={resort} key={i} />
            )
          })}
        </div>
      </div>
    </div>
  )
}