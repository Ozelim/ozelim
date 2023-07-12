import { Accordion } from '@mantine/core'
import React from 'react'

export const TeachingProgram = () => {
  return (
    <div className='w-full'>
      <div className="container">
        <div className="w-full lg:grid grid-cols-[30%_auto]">
          <h1 className='heading'>Lorem, ipsum.</h1>
          <Accordion
            variant='separated'
            className='mt-5 lg:mt-0'
          >
            {Array(6).fill(1).map((_, i) => {
              return (
                <Accordion.Item key={i} value={String(i)} className='!bg-white rounded-primary shadow'>
                  <Accordion.Control>
                    <p className='text-lg font-semibold font-head'>
                      Lorem ipsum dolor sit amet consectetur.
                    </p>
                  </Accordion.Control>
                  <Accordion.Panel>
                    <p className='text'>
                      Lorem ipsum dolor sit amet consectetur adipisicing elit. Minus optio quae rem, illo, odit cumque iure pariatur, eum unde quaerat nostrum soluta. In, nostrum commodi.
                    </p>
                  </Accordion.Panel>
                </Accordion.Item>
              )
            })}
          </Accordion>
        </div>
      </div>
    </div>
  )
}
