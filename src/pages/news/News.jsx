import React from 'react'
import { NewsCard } from 'entities/newsCard'

export const News = () => {
  return (
    <div className='w-full'>
      <div className="container">
        <div className="grid grid-cols-1 gap-6">
          {Array(6).fill(1).map((_, i) => {
            return <NewsCard key={i}/>
          })}
        </div>
      </div>
    </div>
  )
}
