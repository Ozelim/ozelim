import React from 'react'
import { ResortSlider } from './ui/ResortSlider'
import { ResortDetails } from './ui/ResortDetails'
import { pb } from 'shared/api'
import { useParams } from 'react-router-dom'
import { Chip } from '@mantine/core'

async function getResortById (id) {
  return await pb.collection('resorts').getOne(id)
}

export const Resort = () => {

  const { id } = useParams()

  const [resort, setResort] = React.useState({})

  React.useEffect(() => {
    getResortById(id)
    .then(res => {
      setResort(res)
    })
  }, [])

  return (
    <div className='w-full'>
      <div className="container">
        <div className='relative rounded-primary overflow-hidden space-y-2 pb-4'>
          <h1 className=" text-4xl mb-2">{resort?.title}</h1>
          <p>{resort?.region}</p>
          <div className='grid grid-cols-1 md:grid-cols-[60%_auto] border-gray-100 border-solid border-2 w-full rounded-primary'>
            <ResortSlider 
              resort={resort}

            />
            <ResortDetails
              resort={resort}
            />
          </div>
        </div>
      </div>
      <div className='w-full'>
        <div className="container">
          <div className="w-full">
            <div className="flex gap-2">
              {resort?.tags?.map((tag, i) => {
                return (
                  <Chip checked>
                    {tag}
                  </Chip>
                )
              })}
            </div>
          </div> 
        </div>
      </div>
    </div>
  )
}
