import React from 'react'
import { ResortSlider } from './ui/ResortSlider'
import { ResortDetails } from './ui/ResortDetails'
import { pb } from 'shared/api'
import { useParams } from 'react-router-dom'
import { Chip } from '@mantine/core'


async function getResortById (id) {
  if (!id) return {}
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
    <div className="w-full">
      <div className="container">
        <div className="relative rounded-primary overflow-hidden space-y-2 pb-4">
          {/* <h1 className=" text-4xl mb-2">{resort?.title}</h1> */}
          <p>{resort?.region}</p>
          <div className="grid grid-cols-1 lg:grid-cols-[60%_auto] gap-6 border-gray-100 border-solid border-2 w-full rounded-primary">
            <ResortSlider resort={resort} />
            <ResortDetails resort={resort} />
          </div>
        </div>
      </div>
      <div className="w-full">
        <div className="container">
          <div className="w-full">
            <h1 className='my-4 text-3xl font-bold'>
              {resort?.inst}
            </h1>
            <div className="grid lg:grid-cols-[750px_auto] gap-2">
              <div
                className="default-styles"
                dangerouslySetInnerHTML={{ __html: resort?.description }}
              />
              {/* <div className='flex gap-2'>
                {resort?.tags?.map((tag, i) => {
                  return <Chip checked key={i}>{tag}</Chip>
                })}
              </div> */}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
