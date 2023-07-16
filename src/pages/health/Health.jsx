import React from 'react'
import { HealthCard } from 'entities/healthCard'
import { Heading } from 'shared/ui'


const array = [
  {flow: 'left'},
  {flow: 'right'},
  {flow: 'left'},
  {flow: 'right'},
  {flow: 'left'},
  {flow: 'right'},
  {flow: 'left'},
  {flow: 'right'},
  {flow: 'left'},
  {flow: 'right'},
]

export const Health = () => {
  return (
    <div className='w-full'>
      <div className="container">
        
        <Heading title={'Lorem ipsum dolor sit.'}/>
        <div className="grid grid-cols-1 gap-6">
          {/* {array.map((val, i) => {
            return <HealthCard card={val} key={i}/>
          })} */}
        </div>
      </div>
    </div>
  )
}
