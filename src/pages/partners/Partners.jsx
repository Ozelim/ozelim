import { PartnersCard } from 'entities/partnerCard'
import React from 'react'
import { useSearchParams } from 'react-router-dom'

export const Partners = () => {
  let [searchParams, setSearchParams] = useSearchParams()

  console.log(searchParams.get('id'))

  return (
    <div className="w-full">
      <div className="container">
        <div className="grid grid-cols-3 gap-6">
          {Array(9)
            .fill(1)
            .map((_, i) => {
              return <PartnersCard key={i} />
            })}
        </div>
      </div>
    </div>
  )
}
