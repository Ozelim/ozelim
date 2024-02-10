import { Accordion, LoadingOverlay, Text, clsx } from '@mantine/core'
import { ResortCard } from 'entities/resort'
import { CoursesResorts } from 'pages/courses/CoursesResorts'
import React from 'react'
import {  Link, useNavigate, useSearchParams } from 'react-router-dom'
import { pb } from 'shared/api'
import { useUtils } from 'shared/hooks'
import { BomjPlaza } from 'widgets/BomjPlaza'

async function getResortsByRegion (region) {
  return await pb.collection('resorts').getFullList({
    filter: `(region = '${region}') && (status = 'bomj')`
  })
}

export const Resorts = () => {

  const [searchParams] = useSearchParams()
  const navigate = useNavigate()

  const [loading, setLoading] = React.useState(false)

  const {regions} = useUtils()

  const [resorts, setResorts] = React.useState([])

  async function getResorts () {
    setLoading(true)
    await getResortsByRegion(searchParams.get('region'))
    .then(res => {
      setResorts(res)
      setLoading(false)
    })
  }

  React.useEffect(() => {
    getResorts()
  }, [searchParams.get('region')])

  function handleRegionClick (region) {
    navigate(`/resorts/?region=${region}&page=1`)
  }

  return (
    <div className='w-full'>
      <div className="container">
        <div className="w-full">
          <div className="grid lg:grid-cols-[325px_auto]">
            <Accordion 
              variant='separated'
              className='border'
            >
              {regions?.map((region, i) => {
                return (
                  <Accordion.Item value={region} key={i}>
                    <Accordion.Control onClick={() => handleRegionClick(region)}>
                      <Text lineClamp={1}>
                        <span className={clsx('p-1 font-head cursor-pointer transition-all duration-200', {
                          'text-primary-500': searchParams.get('region') === region
                        })}>
                            {region}
                        </span>
                      </Text>
                    </Accordion.Control>
                    <Accordion.Panel className='relative'>
                    <LoadingOverlay visible={loading}/>
                    {resorts.length === 0 && (
                      <div className='flex justify-center items-center h-full'>Не найдено санаториев в этой области</div>
                    )}
                      {resorts.length !== 0 && (
                        <div className="grid grid-cols-1 gap-4 mt-4">
                          {resorts.map((resort, i) => {
                            return (
                              <BomjPlaza resort={resort} key={i}/>
                              // <ResortCard resort={resort} key={i} />
                            )
                          })}

                        </div>
                      )}
                    </Accordion.Panel>
                  </Accordion.Item>
                )
              })}

            </Accordion>
            {/* <ul className='flex flex-col bg-white shadow-md p-4 rounded-primary mx-auto max-w-md lg:max-w-full'>
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
            </ul> */}
            <div>
              <CoursesResorts/>
            </div>

          </div>
        </div>
      </div>
    </div>
  )
}