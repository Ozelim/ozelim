import React from 'react'
import { getImageUrl } from 'shared/lib'

export const TourOperators = ({ images, text }) => {

  return (
    <div className="w-full">
      <div className="container">
        <div className="grid md:grid-cols-2 lg:grid-cols-3 mt-4 gap-4">
          {Array(3)
            .fill(1)
            .map((img, i) => {
              return (
                <div className='flex justify-center items-center h-60 max-w-sm mx-auto object-cover w-full text-3xl flex-col'>
                  <img
                    src={getImageUrl(images, images?.[i + 2])}
                    alt=""
                    className='rounded-primary aspect-video'
                    
                  />
                  <p className='text-lg mt-3'>{text?.[`h${i + 1}`]}</p>
                </div>
              )
            })}
        </div>
      </div>
    </div>
  )
}
