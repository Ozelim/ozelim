import React from 'react'

export const WhyOurCourse = () => {
  return (
    <div className='w-full'>
      <div className="container">
        <div className="w-full">
          <h1 className='heading'>Lorem ipsum dolor sit amet:</h1>
          <div className="grid grid-cols-3 gap-x-8 gap-y-6 mt-10">
            {Array(6).fill(1).map((_, i) => {
              return (
                <div key={i} className='p-6 rounded-primary shadow-md'>
                  <h4 className='text-3xl font-semibold font-head'>
                    Lorem, ipsum.
                  </h4>
                  <p className='text mt-4'>
                    Lorem ipsum dolor sit, amet consectetur adipisicing elit. Nostrum corrupti doloremque officia nam ea, reprehenderit nihil ipsum perferendis eius quidem! Ut nobis perferendis saepe vitae.
                  </p>
                </div>
              )
            })}
          </div>
        </div>
      </div>
    </div>
  )
}
