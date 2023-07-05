import React from 'react'
import { PartnersCard } from 'entities/partnerCard'

export const OurPartners = () => {
  return (
    <div className='w-full'>
      <div className="container">
        <div className="w-full">
          <h1 className="heading">Lorem, ipsum.</h1>
          <p className="text mt-3 md:mt-6 text-lg">Lorem ipsum dolor sit amet consectetur, adipisicing elit. Eveniet, iste.</p>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 mt-5 md:mt-10">
            {Array(4).fill(1).map((_, i) => {
              return <PartnersCard key={i} />
            })}
          </div>
        </div>
      </div>
    </div>
  )
}
