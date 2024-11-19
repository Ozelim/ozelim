import { Accordion } from '@mantine/core'
import React from 'react'

export const Accord = ({data}) => {
  return (
    <Accordion
      variant='separated'
      className='my-10'
      defaultValue='0'
    >
    {data?.map((q, i) => {
      return (
        <Accordion.Item value={`${i}`} key={i + 1}>
          <Accordion.Control className='!text-xl !font-bold '>{i + 1}. 
            <span className='text-primary-500'>{q?.name}</span>
          </Accordion.Control>
          <Accordion.Panel>
            <div dangerouslySetInnerHTML={{__html: q?.desc ?? <></>}} className="accordion-body" />
          </Accordion.Panel>
        </Accordion.Item>
      )})}
    </Accordion>
  )
}
